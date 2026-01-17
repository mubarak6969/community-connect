export type UserRole = 'requester' | 'volunteer' | 'admin';
export type HelpType = 'food' | 'shelter' | 'blood' | 'transport' | 'medical' | 'rescue' | 'other';
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';
export type RequestStatus = 'open' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
export type VolunteerStatus = 'available' | 'busy' | 'offline';
export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'completed';
export type BadgeType = 'id_verified' | 'ngo_verified' | 'government_verified' | 'trusted_helper';

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface VolunteerProfile {
  id: string;
  user_id: string;
  skills: string[];
  max_distance_km: number;
  status: VolunteerStatus;
  total_helps: number;
  rating: number;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface HelpRequest {
  id: string;
  requester_id: string;
  help_type: HelpType;
  urgency: UrgencyLevel;
  title: string;
  description?: string;
  latitude: number;
  longitude: number;
  address?: string;
  status: RequestStatus;
  required_by?: string;
  people_affected: number;
  is_sos: boolean;
  created_at: string;
  updated_at: string;
  requester?: Profile;
}

export interface Match {
  id: string;
  request_id: string;
  volunteer_id: string;
  score: number;
  status: MatchStatus;
  distance_km?: number;
  accepted_at?: string;
  completed_at?: string;
  notes?: string;
  created_at: string;
  request?: HelpRequest;
  volunteer?: Profile;
}

export interface StatusLog {
  id: string;
  request_id: string;
  old_status?: RequestStatus;
  new_status: RequestStatus;
  changed_by: string;
  notes?: string;
  created_at: string;
}

export interface VerificationBadge {
  id: string;
  volunteer_id: string;
  badge_type: BadgeType;
  verified_by?: string;
  verified_at: string;
  expires_at?: string;
  document_url?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

export const HELP_TYPE_ICONS: Record<HelpType, string> = {
  food: '🍽️',
  shelter: '🏠',
  blood: '🩸',
  transport: '🚗',
  medical: '🏥',
  rescue: '🚨',
  other: '📋'
};

export const URGENCY_COLORS: Record<UrgencyLevel, string> = {
  low: 'bg-info text-info-foreground',
  medium: 'bg-warning text-warning-foreground',
  high: 'bg-urgent text-urgent-foreground',
  critical: 'bg-critical text-critical-foreground'
};

export const STATUS_COLORS: Record<RequestStatus, string> = {
  open: 'bg-info text-info-foreground',
  matched: 'bg-warning text-warning-foreground',
  in_progress: 'bg-urgent text-urgent-foreground',
  completed: 'bg-success text-success-foreground',
  cancelled: 'bg-muted text-muted-foreground'
};
