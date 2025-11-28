'use client';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';

const MarketingConsent = () => {
  return (
    <>
      <Header />
      <main>
        <TitledSection>
          <PolicyViewer type="마케팅활용동의" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default MarketingConsent;
