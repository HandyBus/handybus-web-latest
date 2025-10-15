import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '서비스 이용 약관',
  description: '핸디버스 서비스 이용 약관을 확인하세요',
};

const Page = () => {
  return (
    <>
      <main>
        <Header />
        <h1 className="sr-only">서비스 이용 약관</h1>
        <TitledSection>
          <PolicyViewer type="서비스이용약관" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default Page;
