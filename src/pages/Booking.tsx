import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Car, Check, ChevronRight, Navigation, Baby, Shield, Wifi, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { Vehicle } from '@/lib/db';
import { differenceInDays, parseISO } from 'date-fns';
import { LocationSelect } from '@/components/ui/LocationSelect';
import { DateTimePicker, TimePicker } from '@/components/ui/DateTimePicker';

const extras = [
  { id: 'gps', name: 'GPS Navigation', price: 10, icon: Navigation },
  { id: 'child-seat', name: 'Child Seat', price: 15, icon: Baby },
  { id: 'insurance', name: 'Premium Insurance', price: 25, icon: Shield },
  { id: 'wifi', name: 'Mobile WiFi Hotspot', price: 12, icon: Wifi },
];

const Booking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [sameReturnLocation, setSameReturnLocation] = useState(true);

  const [formData, setFormData] = useState({
    pickupLocation: searchParams.get('pickupLocation') || '',
    dropoffLocation: searchParams.get('dropoffLocation') || '',
    pickupDate: null as Date | null,
    pickupTime: null as Date | null,
    returnDate: null as Date | null,
    returnTime: null as Date | null,
    vehicleId: searchParams.get('vehicleId') || '',
    selectedExtras: [] as string[],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await api.vehicles.list();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
        toast({
          title: "Error",
          description: "Failed to load vehicles.",
          variant: "destructive",
        });
      } finally {
        setLoadingVehicles(false);
      }
    };

    fetchVehicles();
  }, [toast]);

  const toggleExtra = (extraId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedExtras: prev.selectedExtras.includes(extraId)
        ? prev.selectedExtras.filter((id) => id !== extraId)
        : [...prev.selectedExtras, extraId],
    }));
  };

  const getSelectedVehicle = () => {
    return vehicles.find(v => v.id === formData.vehicleId);
  }

  const calculateTotal = () => {
    const vehicle = getSelectedVehicle();
    const basePrice = vehicle ? vehicle.price : 0;

    let days = 1;
    if (formData.pickupDate && formData.returnDate) {
      const diffTime = Math.abs(formData.returnDate.getTime() - formData.pickupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days = diffDays > 0 ? diffDays : 1;
    }

    const extrasTotal = formData.selectedExtras.reduce((sum, extraId) => {
      const extra = extras.find((e) => e.id === extraId);
      return sum + (extra ? extra.price * days : 0);
    }, 0);

    return basePrice * days + extrasTotal;
  };

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const diffTime = Math.abs(formData.returnDate.getTime() - formData.pickupDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const vehicle = getSelectedVehicle();
      if (!vehicle) throw new Error("No vehicle selected");

      const bookingData = {
        vehicleId: formData.vehicleId,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: sameReturnLocation ? formData.pickupLocation : formData.dropoffLocation,
        pickupDate: formData.pickupDate?.toISOString() || '',
        pickupTime: formData.pickupTime?.toLocaleTimeString() || '',
        returnDate: formData.returnDate?.toISOString() || '',
        returnTime: formData.returnTime?.toLocaleTimeString() || '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        totalPrice: calculateTotal(),
        extras: formData.selectedExtras,
      };

      await api.bookings.create(bookingData);

      toast({
        title: "Booking Submitted!",
        description: "Your reservation has been successfully recorded.",
      });

      setStep(5);
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.pickupLocation || !formData.pickupDate || !formData.pickupTime || !formData.returnDate || !formData.returnTime || !formData.vehicleId) {
        toast({
          title: "Missing Information",
          description: "Please fill in all rental details before continuing.",
          variant: "destructive",
        });
        return;
      }

      if (!sameReturnLocation && !formData.dropoffLocation) {
        toast({
          title: "Missing Information",
          description: "Please select a drop-off location for one-way rental.",
          variant: "destructive",
        });
        return;
      }

      const now = new Date();
      const pickup = new Date(formData.pickupDate);
      pickup.setHours(formData.pickupTime.getHours(), formData.pickupTime.getMinutes());

      const returnDate = new Date(formData.returnDate);
      returnDate.setHours(formData.returnTime.getHours(), formData.returnTime.getMinutes());

      if (pickup < now) {
        toast({
          title: "Invalid Pickup Date",
          description: "Pickup date and time cannot be in the past.",
          variant: "destructive",
        });
        return;
      }

      if (returnDate <= pickup) {
        toast({
          title: "Invalid Return Date",
          description: "Return date and time must be after the pickup date and time.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === 3) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all contact details.",
          variant: "destructive",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }
    }

    setStep(step + 1);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (step === 5) {
    return (
      <Layout>
        <div className="container-custom py-24 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-8">
            <Check className="w-12 h-12 text-secondary" />
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mb-10">
            Thank you, {formData.firstName}! Your reservation for the {getSelectedVehicle()?.name} has been successful. We've sent the details to {formData.email}.
          </p>
          <div className="flex gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/vehicles">View Other Vehicles</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Book Your Rental
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in animation-delay-100">
              Complete your booking in just a few simple steps.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-background py-8 border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {['Details', 'Extras', 'Contact', 'Confirm'].map((label, index) => (
              <div key={label} className="flex items-center gap-2 md:gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${step > index + 1
                    ? 'bg-secondary text-secondary-foreground'
                    : step === index + 1
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`hidden md:block text-sm font-medium ${step >= index + 1 ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                >
                  {label}
                </span>
                {index < 3 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Rental Details */}
                {step === 1 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft animate-fade-in">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Rental Details
                    </h2>
                    <div className="space-y-6">
                      {/* Same Return Location Checkbox */}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="sameLocationBooking"
                          checked={sameReturnLocation}
                          onChange={(e) => {
                            setSameReturnLocation(e.target.checked);
                            if (e.target.checked) {
                              setFormData({ ...formData, dropoffLocation: '' });
                            }
                          }}
                          className="w-5 h-5 rounded border-2 border-border bg-background checked:bg-secondary checked:border-secondary focus:ring-2 focus:ring-secondary cursor-pointer"
                        />
                        <label htmlFor="sameLocationBooking" className="text-foreground text-sm font-medium cursor-pointer">
                          Same return location
                        </label>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Pickup Location *
                          </label>
                          <LocationSelect
                            value={formData.pickupLocation}
                            onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
                            placeholder="Select location"
                            className="input-premium"
                            required
                          />
                        </div>

                        {!sameReturnLocation && (
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Drop-off Location *
                            </label>
                            <LocationSelect
                              value={formData.dropoffLocation}
                              onChange={(value) => setFormData({ ...formData, dropoffLocation: value })}
                              placeholder="Select location"
                              className="input-premium"
                              required
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Pickup Date *
                          </label>
                          <DateTimePicker
                            selected={formData.pickupDate}
                            onChange={(date) => setFormData({ ...formData, pickupDate: date })}
                            minDate={today}
                            placeholder="Select date"
                            className="input-premium"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Pickup Time *
                          </label>
                          <TimePicker
                            selected={formData.pickupTime}
                            onChange={(time) => setFormData({ ...formData, pickupTime: time })}
                            placeholder="Select time"
                            className="input-premium"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Return Date *
                          </label>
                          <DateTimePicker
                            selected={formData.returnDate}
                            onChange={(date) => setFormData({ ...formData, returnDate: date })}
                            minDate={formData.pickupDate || tomorrow}
                            placeholder="Select date"
                            className="input-premium"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Return Time *
                          </label>
                          <TimePicker
                            selected={formData.returnTime}
                            onChange={(time) => setFormData({ ...formData, returnTime: time })}
                            placeholder="Select time"
                            className="input-premium"
                            required
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Vehicle Type *
                        </label>
                        <div className="relative">
                          <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                          <select
                            value={formData.vehicleId}
                            onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                            className="input-premium pl-10"
                            required
                            disabled={loadingVehicles}
                          >
                            <option value="">Select vehicle</option>
                            {vehicles.map(vehicle => (
                              <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.name} ({vehicle.type}) - ${vehicle.price}/day
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Extras */}
                {step === 2 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft animate-fade-in">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Add Extras
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${formData.selectedExtras.includes(extra.id)
                            ? 'border-secondary bg-secondary/5'
                            : 'border-border hover:border-secondary/50'
                            }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.selectedExtras.includes(extra.id)
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-muted text-muted-foreground'
                            }`}>
                            <extra.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold text-foreground">{extra.name}</div>
                            <div className="text-sm text-muted-foreground">${extra.price}/day</div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.selectedExtras.includes(extra.id)
                            ? 'border-secondary bg-secondary'
                            : 'border-muted-foreground'
                            }`}>
                            {formData.selectedExtras.includes(extra.id) && (
                              <Check className="w-4 h-4 text-secondary-foreground" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Contact */}
                {step === 3 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft animate-fade-in">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Contact Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="input-premium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="input-premium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-premium"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="input-premium"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirm */}
                {step === 4 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft animate-fade-in">
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                      Confirm Your Booking
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p><strong className="text-foreground">Pickup:</strong> {formData.pickupLocation || 'Not selected'} on {formData.pickupDate ? formData.pickupDate.toLocaleDateString() : 'Not selected'} at {formData.pickupTime ? formData.pickupTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not selected'}</p>
                      <p><strong className="text-foreground">Return:</strong> {(sameReturnLocation ? formData.pickupLocation : formData.dropoffLocation) || 'Not selected'} on {formData.returnDate ? formData.returnDate.toLocaleDateString() : 'Not selected'} at {formData.returnTime ? formData.returnTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not selected'}</p>
                      <p><strong className="text-foreground">Vehicle:</strong> {getSelectedVehicle()?.name || 'Not selected'}</p>
                      <p><strong className="text-foreground">Extras:</strong> {formData.selectedExtras.length > 0 ? formData.selectedExtras.join(', ') : 'None'}</p>
                      <p><strong className="text-foreground">Contact:</strong> {formData.firstName} {formData.lastName}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(step - 1)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button
                      type="button"
                      variant="hero"
                      size="lg"
                      className="flex-1"
                      onClick={handleNextStep}
                      disabled={loading}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="flex-1"
                      disabled={loading}
                    >
                      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {loading ? 'Confirming...' : 'Confirm Booking'}
                    </Button>
                  )}
                </div>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                  Booking Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicle ({calculateDays()} days)</span>
                    <span className="font-semibold text-foreground">${(getSelectedVehicle()?.price || 0) * calculateDays()}.00</span>
                  </div>
                  {formData.selectedExtras.map((extraId) => {
                    const extra = extras.find((e) => e.id === extraId);
                    return extra ? (
                      <div key={extra.id} className="flex justify-between">
                        <span className="text-muted-foreground">{extra.name} ({calculateDays()} days)</span>
                        <span className="font-semibold text-foreground">${extra.price * calculateDays()}.00</span>
                      </div>
                    ) : null;
                  })}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-semibold text-foreground">Total</span>
                    <span className="font-display text-2xl font-bold text-secondary">
                      ${calculateTotal()}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
