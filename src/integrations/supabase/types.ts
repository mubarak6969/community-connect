export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      matches: {
        Row: {
          accepted_at: string | null
          completed_at: string | null
          created_at: string | null
          distance_km: number | null
          id: string
          notes: string | null
          request_id: string
          score: number | null
          status: Database["public"]["Enums"]["match_status"] | null
          volunteer_id: string
        }
        Insert: {
          accepted_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          distance_km?: number | null
          id?: string
          notes?: string | null
          request_id: string
          score?: number | null
          status?: Database["public"]["Enums"]["match_status"] | null
          volunteer_id: string
        }
        Update: {
          accepted_at?: string | null
          completed_at?: string | null
          created_at?: string | null
          distance_km?: number | null
          id?: string
          notes?: string | null
          request_id?: string
          score?: number | null
          status?: Database["public"]["Enums"]["match_status"] | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      requests: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          help_type: Database["public"]["Enums"]["help_type"]
          id: string
          is_sos: boolean | null
          latitude: number
          longitude: number
          people_affected: number | null
          requester_id: string
          required_by: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          title: string
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          help_type: Database["public"]["Enums"]["help_type"]
          id?: string
          is_sos?: boolean | null
          latitude: number
          longitude: number
          people_affected?: number | null
          requester_id: string
          required_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          title: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          help_type?: Database["public"]["Enums"]["help_type"]
          id?: string
          is_sos?: boolean | null
          latitude?: number
          longitude?: number
          people_affected?: number | null
          requester_id?: string
          required_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          title?: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: []
      }
      status_logs: {
        Row: {
          changed_by: string
          created_at: string | null
          id: string
          new_status: Database["public"]["Enums"]["request_status"]
          notes: string | null
          old_status: Database["public"]["Enums"]["request_status"] | null
          request_id: string
        }
        Insert: {
          changed_by: string
          created_at?: string | null
          id?: string
          new_status: Database["public"]["Enums"]["request_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["request_status"] | null
          request_id: string
        }
        Update: {
          changed_by?: string
          created_at?: string | null
          id?: string
          new_status?: Database["public"]["Enums"]["request_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["request_status"] | null
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_logs_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "requests"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_badges: {
        Row: {
          badge_type: Database["public"]["Enums"]["badge_type"]
          document_url: string | null
          expires_at: string | null
          id: string
          verified_at: string | null
          verified_by: string | null
          volunteer_id: string
        }
        Insert: {
          badge_type: Database["public"]["Enums"]["badge_type"]
          document_url?: string | null
          expires_at?: string | null
          id?: string
          verified_at?: string | null
          verified_by?: string | null
          volunteer_id: string
        }
        Update: {
          badge_type?: Database["public"]["Enums"]["badge_type"]
          document_url?: string | null
          expires_at?: string | null
          id?: string
          verified_at?: string | null
          verified_by?: string | null
          volunteer_id?: string
        }
        Relationships: []
      }
      volunteer_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          id: string
          max_distance_km: number | null
          rating: number | null
          skills: string[] | null
          status: Database["public"]["Enums"]["volunteer_status"] | null
          total_helps: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          id?: string
          max_distance_km?: number | null
          rating?: number | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["volunteer_status"] | null
          total_helps?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          id?: string
          max_distance_km?: number | null
          rating?: number | null
          skills?: string[] | null
          status?: Database["public"]["Enums"]["volunteer_status"] | null
          total_helps?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      badge_type:
        | "id_verified"
        | "ngo_verified"
        | "government_verified"
        | "trusted_helper"
      help_type:
        | "food"
        | "shelter"
        | "blood"
        | "transport"
        | "medical"
        | "rescue"
        | "other"
      match_status: "pending" | "accepted" | "rejected" | "completed"
      request_status:
        | "open"
        | "matched"
        | "in_progress"
        | "completed"
        | "cancelled"
      urgency_level: "low" | "medium" | "high" | "critical"
      user_role: "requester" | "volunteer" | "admin"
      volunteer_status: "available" | "busy" | "offline"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      badge_type: [
        "id_verified",
        "ngo_verified",
        "government_verified",
        "trusted_helper",
      ],
      help_type: [
        "food",
        "shelter",
        "blood",
        "transport",
        "medical",
        "rescue",
        "other",
      ],
      match_status: ["pending", "accepted", "rejected", "completed"],
      request_status: [
        "open",
        "matched",
        "in_progress",
        "completed",
        "cancelled",
      ],
      urgency_level: ["low", "medium", "high", "critical"],
      user_role: ["requester", "volunteer", "admin"],
      volunteer_status: ["available", "busy", "offline"],
    },
  },
} as const
