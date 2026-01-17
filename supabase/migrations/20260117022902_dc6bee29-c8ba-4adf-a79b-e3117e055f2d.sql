-- Fix function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop overly permissive policies and replace with proper ones
DROP POLICY IF EXISTS "System can create matches" ON public.matches;
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

-- Create proper match policy - allow authenticated users to create matches
CREATE POLICY "Authenticated users can create matches" ON public.matches 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create proper notification policy - allow authenticated users to create notifications  
CREATE POLICY "Authenticated users can create notifications" ON public.notifications 
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);