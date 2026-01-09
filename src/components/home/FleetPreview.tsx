import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Fuel, ArrowRight } from 'lucide-react';
import carEconomy from '@/assets/car-economy.jpg';
import carSuv from '@/assets/car-suv.jpg';
import carLuxury from '@/assets/car-luxury.jpg';
import carElectric from '@/assets/car-electric.jpg';

const vehicles = [
  {
    id: 'economy',
    name: 'Economy',
    image: carEconomy,
    price: 45,
    passengers: 4,
    luggage: 2,
    fuel: 'Petrol',
    description: 'Perfect for city driving and budget-conscious travelers',
  },
  {
    id: 'suv',
    name: 'SUV',
    image: carSuv,
    price: 85,
    passengers: 7,
    luggage: 4,
    fuel: 'Diesel',
    description: 'Ideal for families and adventure seekers',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    image: carLuxury,
    price: 150,
    passengers: 4,
    luggage: 3,
    fuel: 'Petrol',
    description: 'Travel in style with premium comfort',
  },
  {
    id: 'electric',
    name: 'Electric',
    image: carElectric,
    price: 95,
    passengers: 5,
    luggage: 3,
    fuel: 'Electric',
    description: 'Eco-friendly driving for the conscious traveler',
  },
];

const FleetPreview = () => {
  return (
    <section className="bg-muted section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Our Premium Fleet
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in animation-delay-100">
            From compact economy cars to spacious SUVs, find the perfect vehicle for your Tasmanian adventure.
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="card-premium group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold">
                  ${vehicle.price}/day
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {vehicle.description}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {vehicle.passengers}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    {vehicle.luggage}
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {vehicle.fuel}
                  </div>
                </div>

                <Button variant="heroOutline" className="w-full" asChild>
                  <Link to={`/vehicles/${vehicle.id}`}>
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" asChild>
            <Link to="/vehicles">
              View All Vehicles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FleetPreview;
