import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Tassie Car Rental"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed">
              Explore Tasmania with confidence. Premium car rentals with exceptional service and unbeatable prices.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Vehicles', 'Locations', 'About Us', 'Contact', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Our Locations</h4>
            <ul className="space-y-3">
              {['Hobart', 'Launceston', 'Devonport', 'Hobart Airport', 'Launceston Airport'].map((location) => (
                <li key={location}>
                  <Link
                    to="/locations"
                    className="text-primary-foreground/70 hover:text-secondary transition-colors flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:1300123456" className="text-primary-foreground/70 hover:text-secondary transition-colors flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  1300 123 456
                </a>
              </li>
              <li>
                <a href="mailto:hello@tassiecars.com.au" className="text-primary-foreground/70 hover:text-secondary transition-colors flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  hello@tassiecars.com.au
                </a>
              </li>
              <li className="text-primary-foreground/70 flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>123 Murray Street<br />Hobart, TAS 7000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 Tassie Car Rentals. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/terms" className="text-primary-foreground/50 hover:text-secondary transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-primary-foreground/50 hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
