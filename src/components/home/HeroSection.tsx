import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Car, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-car.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    returnDate: '',
    vehicleType: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/vehicles');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Premium car on Tasmanian coastal road"
          className="w-full h-full object-cover object-center"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Explore Tasmania
            <span className="block text-secondary mt-2">With Confidence</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Affordable, reliable car rentals across Tasmania's most stunning destinations.
          </p>
        </div>

        {/* Booking Form */}
        <div className="glass-dark rounded-2xl p-6 md:p-8 max-w-5xl mx-auto animate-slide-up animation-delay-300">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Pickup Location */}
              <div className="lg:col-span-1">
                <label className="block text-primary-foreground/70 text-sm font-medium mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="input-glass pl-10 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-foreground">Select location</option>
                    <option value="hobart" className="text-foreground">Hobart</option>
                    <option value="launceston" className="text-foreground">Launceston</option>
                    <option value="devonport" className="text-foreground">Devonport</option>
                    <option value="hobart-airport" className="text-foreground">Hobart Airport</option>
                    <option value="launceston-airport" className="text-foreground">Launceston Airport</option>
                  </select>
                </div>
              </div>

              {/* Drop-off Location */}
              <div className="lg:col-span-1">
                <label className="block text-primary-foreground/70 text-sm font-medium mb-2">
                  Drop-off Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <select
                    value={formData.dropoffLocation}
                    onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                    className="input-glass pl-10 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-foreground">Same as pickup</option>
                    <option value="hobart" className="text-foreground">Hobart</option>
                    <option value="launceston" className="text-foreground">Launceston</option>
                    <option value="devonport" className="text-foreground">Devonport</option>
                    <option value="hobart-airport" className="text-foreground">Hobart Airport</option>
                    <option value="launceston-airport" className="text-foreground">Launceston Airport</option>
                  </select>
                </div>
              </div>

              {/* Pickup Date */}
              <div className="lg:col-span-1">
                <label className="block text-primary-foreground/70 text-sm font-medium mb-2">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="input-glass pl-10"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div className="lg:col-span-1">
                <label className="block text-primary-foreground/70 text-sm font-medium mb-2">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="input-glass pl-10"
                  />
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="lg:col-span-1">
                <label className="block text-primary-foreground/70 text-sm font-medium mb-2">
                  Vehicle Type
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="input-glass pl-10 appearance-none cursor-pointer"
                  >
                    <option value="" className="text-foreground">Any type</option>
                    <option value="economy" className="text-foreground">Economy</option>
                    <option value="suv" className="text-foreground">SUV</option>
                    <option value="luxury" className="text-foreground">Luxury</option>
                    <option value="electric" className="text-foreground">Electric</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button type="submit" variant="hero" size="xl" className="w-full md:w-auto min-w-[200px]">
                <Search className="w-5 h-5 mr-2" />
                Search Vehicles
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
