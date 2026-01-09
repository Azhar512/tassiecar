import { Shield, Clock, Eye, MapPin, Star } from 'lucide-react';

const signals = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Comprehensive coverage included',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Help whenever you need it',
  },
  {
    icon: Eye,
    title: 'No Hidden Fees',
    description: 'Transparent pricing always',
  },
  {
    icon: MapPin,
    title: 'Australian Owned',
    description: 'Local Tasmanian business',
  },
];

const TrustSignals = () => {
  return (
    <section className="bg-background section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {signals.map((signal, index) => (
            <div
              key={signal.title}
              className="text-center p-6 rounded-2xl hover-lift bg-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <signal.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {signal.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {signal.description}
              </p>
            </div>
          ))}
        </div>

        {/* Rating Bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
            ))}
          </div>
          <p className="text-foreground font-medium">
            Rated <span className="text-secondary font-bold">4.9/5</span> by over 2,000 happy customers
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
