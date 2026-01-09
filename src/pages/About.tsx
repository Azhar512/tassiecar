import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Users, MapPin, Heart, ArrowRight } from 'lucide-react';
import ctaBackground from '@/assets/cta-background.jpg';

const values = [
  {
    icon: Heart,
    title: 'Passion for Tasmania',
    description: 'We live and breathe Tasmania. Our love for this island drives everything we do.',
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'Every customer deserves the best. We go above and beyond to exceed expectations.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We\'re proud to support local businesses and contribute to our community.',
  },
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Our team knows Tasmania inside out and loves sharing hidden gems with visitors.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={ctaBackground}
            alt="Tasmanian landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Your Local Tasmanian
              <span className="block text-secondary mt-2">Car Rental Experts</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 animate-fade-in animation-delay-100">
              For over a decade, we've been helping travelers discover the magic of Tasmania. 
              Born and bred locals, we're passionate about sharing our beautiful island with the world.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Tassie Car Rentals was founded in 2014 by a group of friends who shared a common 
                  frustration: why was it so difficult to rent a quality car in Tasmania at a fair price?
                </p>
                <p>
                  We set out to change that. Starting with just three vehicles and a tiny office in 
                  Hobart, we built our business on a simple promise: exceptional service, transparent 
                  pricing, and cars that are maintained to the highest standards.
                </p>
                <p>
                  Today, we're proud to operate across five locations with a fleet of over 50 premium 
                  vehicles. But we've never forgotten our roots. We're still the same friendly team 
                  that treats every customer like family.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-fade-in-right">
              <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl text-center">
                <div className="font-display text-5xl font-bold mb-2">10+</div>
                <div className="text-secondary-foreground/80">Years of Service</div>
              </div>
              <div className="bg-primary text-primary-foreground p-8 rounded-2xl text-center mt-8">
                <div className="font-display text-5xl font-bold mb-2">50+</div>
                <div className="text-primary-foreground/70">Premium Vehicles</div>
              </div>
              <div className="bg-muted p-8 rounded-2xl text-center -mt-4">
                <div className="font-display text-5xl font-bold text-foreground mb-2">15K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl text-center mt-4">
                <div className="font-display text-5xl font-bold mb-2">4.9</div>
                <div className="text-secondary-foreground/80">Star Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in animation-delay-100">
              These core principles guide everything we do at Tassie Car Rentals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-8 text-center hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto animate-fade-in animation-delay-100">
            Join thousands of happy travelers who've explored Tasmania with us.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/booking">
              Book Your Rental Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
