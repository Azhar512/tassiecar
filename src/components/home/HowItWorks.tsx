import { MousePointer2, Calendar, Car } from 'lucide-react';

const steps = [
  {
    icon: MousePointer2,
    step: '01',
    title: 'Choose Your Car',
    description: 'Browse our diverse fleet and find the perfect vehicle for your journey.',
  },
  {
    icon: Calendar,
    step: '02',
    title: 'Book Online',
    description: 'Select your dates, add extras, and complete your booking in minutes.',
  },
  {
    icon: Car,
    step: '03',
    title: 'Drive Away',
    description: 'Pick up your car at your chosen location and start exploring Tasmania.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-muted section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in animation-delay-100">
            Renting a car has never been easier. Three simple steps to your Tasmanian adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}

              {/* Icon */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-pulse-soft" />
                <div className="absolute inset-4 bg-secondary rounded-full flex items-center justify-center shadow-glow">
                  <item.icon className="w-12 h-12 text-secondary-foreground" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-display font-bold text-sm">
                  {item.step}
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
