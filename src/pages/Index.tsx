import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import TrustSignals from '@/components/home/TrustSignals';
import PromotionsSection from '@/components/home/PromotionsSection';
import FleetPreview from '@/components/home/FleetPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import HowItWorks from '@/components/home/HowItWorks';
import CtaSection from '@/components/home/CtaSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustSignals />
      <PromotionsSection />
      <FleetPreview />
      <WhyChooseUs />
      <HowItWorks />
      <CtaSection />
    </Layout>
  );
};

export default Index;
