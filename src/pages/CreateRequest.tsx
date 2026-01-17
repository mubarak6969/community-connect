import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { HelpType, UrgencyLevel, HELP_TYPE_ICONS } from '@/lib/types';

export default function CreateRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    help_type: 'food' as HelpType,
    urgency: 'medium' as UrgencyLevel,
    address: '',
    people_affected: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('requests').insert({
        requester_id: user.id,
        ...formData,
        latitude: 0,
        longitude: 0,
      });

      if (error) throw error;

      toast({ title: 'Request created!', description: 'Volunteers will be matched soon.' });
      navigate('/dashboard');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const helpTypes: { value: HelpType; label: string }[] = [
    { value: 'food', label: 'Food & Water' },
    { value: 'shelter', label: 'Shelter' },
    { value: 'blood', label: 'Blood Donation' },
    { value: 'transport', label: 'Transport' },
    { value: 'medical', label: 'Medical Help' },
    { value: 'rescue', label: 'Rescue' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-display">Create Help Request</CardTitle>
                <CardDescription>Describe what kind of help you need</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Help Type</Label>
                  <Select value={formData.help_type} onValueChange={(v) => setFormData({ ...formData, help_type: v as HelpType })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {helpTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {HELP_TYPE_ICONS[type.value]} {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Urgency</Label>
                  <Select value={formData.urgency} onValueChange={(v) => setFormData({ ...formData, urgency: v as UrgencyLevel })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of your need"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Details</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about your situation..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Location</Label>
                  <Input
                    id="address"
                    placeholder="Your address or landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="people">People Affected</Label>
                  <Input
                    id="people"
                    type="number"
                    min="1"
                    value={formData.people_affected}
                    onChange={(e) => setFormData({ ...formData, people_affected: parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                {loading ? 'Creating...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
