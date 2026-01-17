-- Create enum types for the platform
CREATE TYPE user_role AS ENUM ('requester', 'volunteer', 'admin');
CREATE TYPE help_type AS ENUM ('food', 'shelter', 'blood', 'transport', 'medical', 'rescue', 'other');
CREATE TYPE urgency_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE request_status AS ENUM ('open', 'matched', 'in_progress', 'completed', 'cancelled');
CREATE TYPE volunteer_status AS ENUM ('available', 'busy', 'offline');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected', 'completed');
CREATE TYPE badge_type AS ENUM ('id_verified', 'ngo_verified', 'government_verified', 'trusted_helper');

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role NOT NULL DEFAULT 'requester',
  avatar_url TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Volunteer profiles with additional details
CREATE TABLE public.volunteer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  skills TEXT[] DEFAULT '{}',
  max_distance_km DOUBLE PRECISION DEFAULT 10,
  status volunteer_status DEFAULT 'offline',
  total_helps INTEGER DEFAULT 0,
  rating DOUBLE PRECISION DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Help requests table
CREATE TABLE public.requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL,
  help_type help_type NOT NULL,
  urgency urgency_level NOT NULL DEFAULT 'medium',
  title TEXT NOT NULL,
  description TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  address TEXT,
  status request_status DEFAULT 'open',
  required_by TIMESTAMP WITH TIME ZONE,
  people_affected INTEGER DEFAULT 1,
  is_sos BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Matches between requests and volunteers
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  volunteer_id UUID NOT NULL,
  score DOUBLE PRECISION DEFAULT 0,
  status match_status DEFAULT 'pending',
  distance_km DOUBLE PRECISION,
  accepted_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Status logs for tracking request history
CREATE TABLE public.status_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.requests(id) ON DELETE CASCADE,
  old_status request_status,
  new_status request_status NOT NULL,
  changed_by UUID NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Verification badges for volunteers
CREATE TABLE public.verification_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  volunteer_id UUID NOT NULL,
  badge_type badge_type NOT NULL,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  document_url TEXT,
  UNIQUE(volunteer_id, badge_type)
);

-- Notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.status_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Volunteer profiles policies
CREATE POLICY "Anyone can view volunteer profiles" ON public.volunteer_profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own volunteer profile" ON public.volunteer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own volunteer profile" ON public.volunteer_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Requests policies
CREATE POLICY "Anyone can view open requests" ON public.requests FOR SELECT USING (true);
CREATE POLICY "Users can create requests" ON public.requests FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Requesters can update own requests" ON public.requests FOR UPDATE USING (auth.uid() = requester_id);

-- Matches policies
CREATE POLICY "Users can view relevant matches" ON public.matches FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.requests WHERE id = request_id AND requester_id = auth.uid())
  OR volunteer_id = auth.uid()
);
CREATE POLICY "System can create matches" ON public.matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Volunteers can update their matches" ON public.matches FOR UPDATE USING (volunteer_id = auth.uid());

-- Status logs policies
CREATE POLICY "Anyone can view status logs" ON public.status_logs FOR SELECT USING (true);
CREATE POLICY "Users can create status logs" ON public.status_logs FOR INSERT WITH CHECK (auth.uid() = changed_by);

-- Verification badges policies
CREATE POLICY "Anyone can view badges" ON public.verification_badges FOR SELECT USING (true);
CREATE POLICY "Admins can manage badges" ON public.verification_badges FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can create notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_volunteer_profiles_updated_at BEFORE UPDATE ON public.volunteer_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_requests_updated_at BEFORE UPDATE ON public.requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;