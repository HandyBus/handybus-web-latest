'use client';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';

const TermsOfService = () => {
  return (
    <>
      <Header />
      <main>
        <TitledSection>
          <PolicyViewer type="서비스이용약관" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
