import { motion } from 'framer-motion';
import { MessageSquarePlus, Users, MapPin, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageSquarePlus,
    title: 'Create Request',
    description: 'Submit a help request with your location and urgency level. One-click SOS for emergencies.',
    color: 'bg-primary',
  },
  {
    icon: Users,
    title: 'Smart Matching',
    description: 'Our AI matches you with nearby verified volunteers based on skills, distance, and availability.',
    color: 'bg-accent',
  },
  {
    icon: MapPin,
    title: 'Real-time Tracking',
    description: 'Track your request status in real-time. Get notified when help is on the way.',
    color: 'bg-urgent',
  },
  {
    icon: CheckCircle,
    title: 'Help Delivered',
    description: 'Receive assistance and rate your experience. Build community trust together.',
    color: 'bg-success',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            How It <span className="text-gradient-hero">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting help or volunteering is simple. Our platform connects you in seconds.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center mb-4`}>
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-navy rounded-full flex items-center justify-center text-navy-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2 font-display">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
