import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-navy-foreground"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-urgent/20 text-urgent mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Every second counts in emergencies</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Be Part of the <span className="text-accent">Solution</span>
            </h2>
            
            <p className="text-xl text-navy-foreground/80 mb-10 max-w-2xl mx-auto">
              Join thousands of volunteers and community members making a difference. 
              Your help could save a life today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Heart className="w-5 h-5" />
                  Start Helping Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-navy-foreground/60">
              <span>✓ Free to use</span>
              <span>✓ No signup fees</span>
              <span>✓ Instant verification</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
