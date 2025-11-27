'use client';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';

const PrivacyPolicy = () => {
  return (
    <>
      <Header pageName="개인정보 처리 방침" />
      <main>
        <TitledSection>
          <PolicyViewer type="개인정보처리방침" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
