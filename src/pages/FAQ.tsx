import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  {
    title: 'Booking & Reservations',
    faqs: [
      {
        question: 'How do I book a car?',
        answer: 'You can book a car through our website by selecting your pickup/drop-off locations and dates, choosing a vehicle, and completing the booking form. Alternatively, call us at 1300 123 456 or visit any of our locations.',
      },
      {
        question: 'Can I modify or cancel my booking?',
        answer: 'Yes, you can modify or cancel your booking up to 24 hours before your pickup time free of charge. Cancellations within 24 hours may incur a fee equal to one day\'s rental.',
      },
      {
        question: 'Do you offer one-way rentals?',
        answer: 'Yes, we offer one-way rentals between all our locations. An additional fee may apply depending on the pickup and drop-off locations.',
      },
    ],
  },
  {
    title: 'Driver Requirements',
    faqs: [
      {
        question: 'What license do I need to rent a car?',
        answer: 'You need a full, valid driver\'s license. International visitors must have an International Driving Permit (IDP) along with their home country license if it\'s not in English.',
      },
      {
        question: 'What is the minimum age to rent?',
        answer: 'The minimum age is 21 years. Drivers under 25 may need to pay a young driver surcharge and may have restrictions on certain vehicle categories.',
      },
      {
        question: 'Can I add additional drivers?',
        answer: 'Yes, you can add additional drivers for $10 per day per driver. All additional drivers must meet our licensing requirements and be present at pickup.',
      },
    ],
  },
  {
    title: 'Insurance & Deposits',
    faqs: [
      {
        question: 'What insurance is included?',
        answer: 'All rentals include basic Collision Damage Waiver (CDW) with an excess. You can reduce or eliminate the excess by purchasing our Premium Insurance package for $25/day.',
      },
      {
        question: 'Do you require a deposit?',
        answer: 'Yes, we require a security deposit of $200-$500 depending on the vehicle category. This is held on your credit card and released within 7-14 business days after return.',
      },
      {
        question: 'What happens if the car is damaged?',
        answer: 'Any damage must be reported immediately. You\'ll be liable for repair costs up to the excess amount stated in your rental agreement, unless you have Premium Insurance.',
      },
    ],
  },
  {
    title: 'Fuel & Mileage',
    faqs: [
      {
        question: 'What is your fuel policy?',
        answer: 'We operate on a full-to-full policy. You receive the car with a full tank and should return it full. If returned with less fuel, you\'ll be charged for refueling plus a service fee.',
      },
      {
        question: 'Is there a mileage limit?',
        answer: 'All our rentals include unlimited kilometers within Tasmania. This means you can explore as much as you want without worrying about extra charges.',
      },
      {
        question: 'Can I take the car on the Spirit of Tasmania ferry?',
        answer: 'Our vehicles are for use within Tasmania only and cannot be taken on the ferry to the mainland without prior written approval.',
      },
    ],
  },
  {
    title: 'Pickup & Return',
    faqs: [
      {
        question: 'Do you offer airport pickup?',
        answer: 'Yes, we have locations at both Hobart and Launceston airports. For flight arrivals, we offer a free shuttle service from the terminal to our airport office.',
      },
      {
        question: 'What happens if I return the car late?',
        answer: 'A grace period of 59 minutes is provided. After that, you\'ll be charged an additional day\'s rental. Please contact us if you expect to be late.',
      },
      {
        question: 'Can I return the car outside of business hours?',
        answer: 'Yes, after-hours returns are available at most locations using our secure key drop box. You must arrange this in advance and follow the after-hours return procedure.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-primary-foreground/70 animate-fade-in animation-delay-100">
              Find answers to common questions about our car rental services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-background section-padding">
        <div className="container-custom max-w-4xl">
          {faqCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="mb-12 animate-fade-in"
              style={{ animationDelay: `${catIndex * 100}ms` }}
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                {category.title}
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${catIndex}-${faqIndex}`}
                    className="bg-card rounded-xl border-none shadow-soft"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                      <span className="font-semibold text-foreground">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Still Have Questions */}
          <div className="bg-muted rounded-2xl p-8 text-center animate-fade-in">
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our friendly team is here to help.
            </p>
            <Button variant="hero" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
