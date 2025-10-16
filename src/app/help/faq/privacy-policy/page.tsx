import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보 처리 방침',
  description: '핸디버스 개인정보 처리 방침을 확인하세요',
};

const Page = () => {
  return (
    <>
      <main>
        <Header />
        <TitledSection>
          <PolicyViewer type="개인정보처리방침" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default Page;
