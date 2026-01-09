import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Fuel, ArrowRight, SlidersHorizontal, Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { Vehicle, supabase } from '@/lib/db';
import { toast } from 'sonner';

const vehicleTypes = ['All', 'Economy', 'SUV', 'Luxury', 'Electric'];
const transmissionTypes = ['All', 'Automatic', 'Manual'];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedTransmission, setSelectedTransmission] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await api.vehicles.list();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
        toast.error('Failed to load vehicles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vehicles'
        },
        () => {
          fetchVehicles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesType = selectedType === 'All' || vehicle.type === selectedType;
    const matchesTransmission = selectedTransmission === 'All' || vehicle.transmission === selectedTransmission;
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
    return matchesType && matchesTransmission && matchesPrice;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Our Vehicle Fleet
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in animation-delay-100">
              Find the perfect car for your Tasmanian adventure from our premium selection.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="w-5 h-5 text-secondary" />
                  <h3 className="font-display font-semibold text-foreground">Filters</h3>
                </div>

                {/* Vehicle Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">Vehicle Type</label>
                  <div className="flex flex-wrap gap-2">
                    {vehicleTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedType === type
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-secondary/20'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">Transmission</label>
                  <div className="flex flex-wrap gap-2">
                    {transmissionTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedTransmission(type)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedTransmission === type
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-secondary/20'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}/day
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-secondary"
                  />
                </div>
              </div>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredVehicles.length}</span> vehicles
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-10 h-10 animate-spin text-secondary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle, index) => (
                    <div
                      key={vehicle.id}
                      className="card-premium group animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                          {vehicle.type}
                        </div>
                        <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-bold">
                          ${vehicle.price}/day
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                          {vehicle.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {vehicle.description}
                        </p>

                        {/* Specs */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {vehicle.passengers}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {vehicle.luggage}
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="w-3.5 h-3.5" />
                            {vehicle.fuel}
                          </div>
                          <span>{vehicle.transmission}</span>
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
                  {filteredVehicles.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                      No vehicles found matching your criteria.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Vehicles;
