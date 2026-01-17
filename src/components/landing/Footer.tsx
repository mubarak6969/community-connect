import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">HelpExchange</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Connecting communities in times of need. Our platform enables rapid disaster response 
              through verified volunteer matching.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/register" className="hover:text-foreground transition-colors">Get Started</Link></li>
              <li><Link to="/register?role=volunteer" className="hover:text-foreground transition-colors">Become a Volunteer</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HelpExchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
