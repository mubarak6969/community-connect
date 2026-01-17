import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, AlertTriangle, MapPin, Clock, LogOut, User, Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { HelpRequest, HELP_TYPE_ICONS, URGENCY_COLORS, STATUS_COLORS } from '@/lib/types';

export default function Dashboard() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('requester_id', user?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setRequests(data as unknown as HelpRequest[]);
    }
    setLoadingRequests(false);
  };

  const handleSOS = async () => {
    if (!user) return;
    
    const { error } = await supabase.from('requests').insert({
      requester_id: user.id,
      help_type: 'rescue',
      urgency: 'critical',
      title: 'SOS - Emergency Help Needed!',
      description: 'Urgent help required immediately!',
      latitude: 0,
      longitude: 0,
      is_sos: true,
    });

    if (!error) {
      fetchRequests();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-xl">HelpExchange</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium hidden sm:block">{profile?.full_name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome & SOS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Welcome, {profile?.full_name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Manage your help requests</p>
          </div>
          <div className="flex gap-3">
            <Button variant="urgent" onClick={handleSOS} className="gap-2">
              <AlertTriangle className="w-5 h-5" />
              SOS Emergency
            </Button>
            <Link to="/create-request">
              <Button variant="hero" className="gap-2">
                <Plus className="w-5 h-5" />
                New Request
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Requests', value: requests.length, color: 'text-primary' },
            { label: 'Active', value: requests.filter(r => r.status === 'open' || r.status === 'in_progress').length, color: 'text-urgent' },
            { label: 'Matched', value: requests.filter(r => r.status === 'matched').length, color: 'text-warning' },
            { label: 'Completed', value: requests.filter(r => r.status === 'completed').length, color: 'text-success' },
          ].map((stat, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingRequests ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No requests yet</p>
                <Link to="/create-request">
                  <Button variant="hero" className="mt-4">Create Your First Request</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-xl hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{HELP_TYPE_ICONS[request.help_type]}</div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {request.title}
                          {request.is_sos && <Badge variant="destructive">SOS</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.address || 'Location pending'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(request.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={URGENCY_COLORS[request.urgency]}>{request.urgency}</Badge>
                      <Badge className={STATUS_COLORS[request.status]}>{request.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
