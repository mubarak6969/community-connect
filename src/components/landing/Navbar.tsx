import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useAuth();

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    switch (profile.role) {
      case 'admin':
        return '/admin';
      case 'volunteer':
        return '/volunteer';
      default:
        return '/dashboard';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">HelpExchange</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link to={getDashboardLink()}>
                <Button variant="hero">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button variant="hero">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
              <Link to="/#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link to="/#about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {user ? (
                  <Link to={getDashboardLink()}>
                    <Button variant="hero" className="w-full">Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="w-full">Log In</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="hero" className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
