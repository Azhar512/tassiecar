import Layout from '@/components/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Privacy Policy
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
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                make a booking, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Driver's license information</li>
                <li>Payment information</li>
                <li>Booking history and preferences</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-100">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Process and manage your bookings</li>
                <li>Communicate with you about your rental</li>
                <li>Improve our services and customer experience</li>
                <li>Send promotional offers (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-200">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                3. Information Sharing
              </h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Service providers who assist with our operations</li>
                <li>Insurance companies for claims processing</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-300">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft mb-8 animate-fade-in animation-delay-400">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                5. Your Rights
              </h2>
              <p>
                Under Australian privacy law, you have the right to:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-soft animate-fade-in animation-delay-500">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                6. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact our Privacy Officer at:
              </p>
              <p className="mt-4">
                Email: privacy@tassiecars.com.au<br />
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

export default Privacy;
