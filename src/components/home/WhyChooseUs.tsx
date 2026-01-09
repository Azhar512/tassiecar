import { MapPin, DollarSign, Wrench, Clock } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Local Expertise',
    description: 'Born and bred Tasmanians who know every hidden gem and scenic route across the island.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No surprises at checkout. What you see is what you pay — always.',
  },
  {
    icon: Wrench,
    title: 'Well-Maintained Fleet',
    description: 'Every vehicle is professionally serviced and thoroughly inspected before each rental.',
  },
  {
    icon: Clock,
    title: 'Flexible Options',
    description: 'Multiple pickup and drop-off locations with extended hours to suit your schedule.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-background section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in">
              Why Choose
              <span className="text-secondary block mt-2">Tassie Car Rentals?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 animate-fade-in animation-delay-100">
              We're not just another car rental company. We're passionate Tasmanians dedicated to helping you discover the beauty of our island in comfort and style.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 animate-fade-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-right">
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl text-center">
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-primary-foreground/70">Years Experience</div>
            </div>
            <div className="bg-secondary text-secondary-foreground p-8 rounded-2xl text-center mt-8">
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-secondary-foreground/80">Premium Vehicles</div>
            </div>
            <div className="bg-muted p-8 rounded-2xl text-center -mt-4">
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">15K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl text-center mt-4">
              <div className="font-display text-4xl md:text-5xl font-bold mb-2">5</div>
              <div className="text-primary-foreground/70">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
