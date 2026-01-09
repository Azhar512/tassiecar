import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, Fuel, Settings, Gauge, ArrowLeft, Check, Calendar, Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { Vehicle } from '@/lib/db';
import { toast } from 'sonner';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      try {
        const data = await api.vehicles.get(id);
        if (data) {
          setVehicle(data);
        } else {
          toast.error('Vehicle not found');
          navigate('/vehicles');
        }
      } catch (error) {
        console.error('Failed to fetch vehicle:', error);
        toast.error('Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen pt-20">
          <Loader2 className="w-10 h-10 animate-spin text-secondary" />
        </div>
      </Layout>
    );
  }

  if (!vehicle) return null;

  // Mock features based on vehicle type for now, or add to DB schema if needed
  const getFeatures = (type: string) => {
    switch (type) {
      case 'Economy':
        return ['Air Conditioning', 'Bluetooth', 'USB Charging', 'Backup Camera', 'Cruise Control'];
      case 'SUV':
        return ['All-Wheel Drive', 'Leather Seats', 'Sunroof', 'Apple CarPlay', 'Lane Assist', 'Heated Seats'];
      case 'Luxury':
        return ['Premium Sound System', 'Navigation', 'Leather Interior', 'Wireless Charging', 'Heads-Up Display', 'Parking Assist'];
      case 'Electric':
        return ['Autopilot', '15" Touchscreen', 'Over-the-Air Updates', 'Premium Audio', 'Glass Roof', 'Supercharger Access'];
      default:
        return ['Air Conditioning', 'Bluetooth', 'Radio'];
    }
  };

  const getEngine = (type: string) => {
    switch (type) {
      case 'Economy': return '1.5L 4-cylinder';
      case 'SUV': return '2.5L 4-cylinder';
      case 'Luxury': return '2.0L Turbo';
      case 'Electric': return 'Electric Motor';
      default: return 'Standard';
    }
  };

  const features = getFeatures(vehicle.type);
  const engine = getEngine(vehicle.type);
  const mileage = 'Unlimited'; // Hardcoded for simplified schema

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-muted pt-28 pb-8">
        <div className="container-custom">
          <Link to="/vehicles" className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-muted pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="animate-fade-in">
              <div className="bg-card rounded-2xl overflow-hidden shadow-medium">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-secondary transition-all"
                  >
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.name} view ${i}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="animate-fade-in-right">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                  {vehicle.type}
                </span>
                <span className="text-muted-foreground text-sm">Available Now</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {vehicle.name}
              </h1>

              <p className="text-muted-foreground text-lg mb-6">
                {vehicle.description}
              </p>

              {/* Price */}
              <div className="bg-card rounded-xl p-6 mb-6 shadow-soft">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-4xl font-bold text-secondary">
                    ${vehicle.price}
                  </span>
                  <span className="text-muted-foreground">/ day</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Includes insurance, roadside assistance, and {mileage.toLowerCase()} kilometers
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-card rounded-xl p-4 text-center shadow-soft">
                  <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{vehicle.passengers}</div>
                  <div className="text-xs text-muted-foreground">Passengers</div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center shadow-soft">
                  <Briefcase className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{vehicle.luggage}</div>
                  <div className="text-xs text-muted-foreground">Luggage</div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center shadow-soft">
                  <Settings className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{vehicle.transmission}</div>
                  <div className="text-xs text-muted-foreground">Transmission</div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center shadow-soft">
                  <Fuel className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{vehicle.fuel}</div>
                  <div className="text-xs text-muted-foreground">Fuel Type</div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center shadow-soft">
                  <Gauge className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-foreground text-sm">{engine}</div>
                  <div className="text-xs text-muted-foreground">Engine</div>
                </div>
                <div className="bg-card rounded-xl p-4 text-center shadow-soft">
                  <Calendar className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold text-foreground">{mileage}</div>
                  <div className="text-xs text-muted-foreground">Mileage</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-display font-semibold text-foreground mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button variant="hero" size="xl" className="w-full" asChild>
                <Link to={`/booking?vehicleId=${id}`}>
                  Book This Vehicle
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VehicleDetails;
