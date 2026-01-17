import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  MapPin, 
  Bell, 
  BarChart3, 
  Users, 
  Clock, 
  BadgeCheck 
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'SOS One-Click Emergency',
    description: 'Send critical help requests instantly with one tap. Priority matching for life-threatening situations.',
  },
  {
    icon: Shield,
    title: 'Verified Volunteers',
    description: 'All volunteers are verified with ID, background checks, and NGO affiliations for maximum trust.',
  },
  {
    icon: MapPin,
    title: 'Hyperlocal Matching',
    description: 'AI-powered matching finds the closest available volunteers within your specified radius.',
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Instant alerts for match updates, status changes, and volunteer responses.',
  },
  {
    icon: BarChart3,
    title: 'Admin Analytics',
    description: 'Comprehensive dashboards for administrators to monitor and optimize response times.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Build trusted networks of helpers in your area. Rate and review volunteers.',
  },
  {
    icon: Clock,
    title: 'Status Tracking',
    description: 'Track every request from creation to completion with full transparency.',
  },
  {
    icon: BadgeCheck,
    title: 'Trust Badges',
    description: 'Earn verification badges for consistent, quality help. Build your reputation.',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Powerful <span className="text-gradient-hero">Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for rapid disaster response and community coordination.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
