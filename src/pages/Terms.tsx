import Layout from '@/components/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Terms & Conditions
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in animation-delay-100">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background section-padding">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                1. Rental Agreement
              </h2>
              <p>
                By renting a vehicle from Tassie Car Rentals, you agree to abide by these terms and conditions. 
                The rental agreement is between you (the Renter) and Tassie Car Rentals Pty Ltd (the Company).
              </p>
              <p>
                You must be at least 21 years of age and hold a valid driver's license for the class of vehicle 
                being rented. Additional driver requirements may apply for certain vehicle categories.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-100">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. Vehicle Use
              </h2>
              <p>
                The vehicle may only be driven by authorized drivers listed on the rental agreement. 
                The vehicle must not be used:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>For any illegal purpose</li>
                <li>While under the influence of alcohol or drugs</li>
                <li>To carry passengers for hire</li>
                <li>To push or tow another vehicle</li>
                <li>In any motor sport or race</li>
                <li>On unsealed roads (unless an SUV/4WD is rented)</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-200">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Insurance & Liability
              </h2>
              <p>
                Basic Collision Damage Waiver (CDW) is included with all rentals. This limits your liability 
                in the event of an accident, subject to the excess amount stated in your rental agreement.
              </p>
              <p className="mt-4">
                You are liable for all traffic fines, tolls, and parking infringements incurred during the 
                rental period. An administration fee may apply for processing such matters.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-300">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Fuel Policy
              </h2>
              <p>
                Vehicles are provided with a full tank of fuel and must be returned with a full tank. 
                If returned with less fuel, you will be charged the refueling cost plus a service fee.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-400">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Cancellation Policy
              </h2>
              <p>
                Free cancellation is available up to 24 hours before your scheduled pickup time. 
                Cancellations made within 24 hours of pickup may incur a fee equivalent to one day's rental.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft animate-fade-in animation-delay-500">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <p className="mt-4">
                Email: legal@tassiecars.com.au<br />
                Phone: 1300 123 456<br />
                Address: 123 Murray Street, Hobart TAS 7000
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
