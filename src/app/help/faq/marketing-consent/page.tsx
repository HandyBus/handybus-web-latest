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
          마케팅 활용 동의
        </h1>
        <TitledSection>
          <PolicyViewer type="마케팅활용동의" />
        </TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default Page;
