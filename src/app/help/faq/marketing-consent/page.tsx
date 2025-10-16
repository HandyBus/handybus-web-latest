import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마케팅 활용 동의 약관',
  description: '핸디버스 마케팅 활용 동의 약관을 확인하세요',
};

const Page = () => {
  return (
    <>
      <main>
        <Header />
        <TitledSection>
          <PolicyViewer type="마케팅활용동의" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default Page;
