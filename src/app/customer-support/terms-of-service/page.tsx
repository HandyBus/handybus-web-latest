import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import TitledSection from '../components/TitledSection';
import { policies } from '@/data/policy';

const Page = () => {
  return (
    <>
      <main>
        <Header />
        <h1 className="px-16 pt-32 text-20 font-700 leading-[140%]">
          서비스 이용 약관
        </h1>
        <TitledSection>{policies['서비스이용약관']}</TitledSection>
      </main>
      <Footer />
    </>
  );
};

export default Page;
