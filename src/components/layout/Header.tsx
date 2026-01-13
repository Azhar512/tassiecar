import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Car } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Vehicles', path: '/vehicles' },
  { name: 'Locations', path: '/locations' },
  { name: 'Manage Booking', path: '/manage-booking' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  const headerBg = isScrolled || !isHomePage
    ? 'bg-background/95 backdrop-blur-lg shadow-soft'
    : 'bg-transparent';

  const textColor = isScrolled || !isHomePage
    ? 'text-foreground'
    : 'text-primary-foreground';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className={`font-display font-bold text-xl ${textColor}`}>
              Tassie<span className="text-secondary">Cars</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`link-underline font-medium transition-colors ${textColor} hover:text-secondary ${location.pathname === item.path ? 'text-secondary' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button variant="hero" size="lg" asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${textColor}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-lg shadow-medium animate-fade-in">
            <div className="container-custom py-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-foreground font-medium py-3 px-4 rounded-lg hover:bg-muted transition-colors animate-fade-in ${location.pathname === item.path ? 'bg-muted text-secondary' : ''
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-4" asChild>
                <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
