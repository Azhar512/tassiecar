import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Plane, ArrowRight } from 'lucide-react';

const locations = [
  {
    id: 'glenorchy',
    name: 'TASSIE AUTOCARE PTY LTD',
    address: '35-37 Jackson St, Glenorchy TAS 7010',
    phone: '0401 700 033',
    hours: 'Mon-Fri: 8am-6pm, Sat: 9am-4pm, Sun: Closed',
    airport: false,
    description: 'Our primary service center and vehicle pickup point located in Glenorchy.',
  }
];

const Locations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Our Locations
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in animation-delay-100">
              Convenient pickup and drop-off locations across Tasmania.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="bg-card rounded-2xl p-6 shadow-soft hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {location.airport && (
                  <div className="flex items-center gap-2 text-secondary mb-4">
                    <Plane className="w-5 h-5" />
                    <span className="text-sm font-semibold">Airport Location</span>
                  </div>
                )}

                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {location.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {location.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-muted-foreground">{location.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a href={`tel:${location.phone}`} className="text-secondary hover:underline">
                      {location.phone}
                    </a>
                  </div>
                </div>

                <Button variant="heroOutline" className="w-full mt-6" asChild>
                  <Link to={`/booking?pickupLocation=${location.id}`}>
                    Book from here
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-muted section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
              Find Us on the Map
            </h2>
            <p className="text-muted-foreground text-lg animate-fade-in animation-delay-100">
              All our locations are easily accessible with free parking.
            </p>
          </div>

          <div className="bg-card rounded-2xl overflow-hidden shadow-medium h-[400px] animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.610574048888!2d147.2837318!3d-42.83151859999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa6e098483bbed57%3A0xc0788325a740707!2s35-37%20Jackson%20St%2C%20Glenorchy%20TAS%207010%2C%20Australia!5e0!3m2!1sen!2s!4v1706196000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TASSIE AUTOCARE Glenorchy Location"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;
