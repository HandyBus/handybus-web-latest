import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import TitledSection from '../components/TitledSection';
import PolicyViewer from '@/components/policy/PolicyViewer';

const Page = () => {
  return (
    <>
      <main>
        <Header />
        <h1 className="px-16 pt-32 text-20 font-700 leading-[140%]">
          개인정보 처리 방침
        </h1>
        <TitledSection>
          <PolicyViewer type="개인정보처리방침" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default Page;
