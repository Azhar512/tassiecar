import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ctaBackground from '@/assets/cta-background.jpg';

const CtaSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBackground}
          alt="Tasmanian coastal road"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Ready to Explore Tasmania?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 animate-fade-in animation-delay-100">
            Book your perfect rental today and discover the beauty of Australia's island state.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-200">
            <Button variant="hero" size="xl" asChild>
              <Link to="/booking">
                Book Your Ride Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/vehicles">
                View Our Fleet
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
