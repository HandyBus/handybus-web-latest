import TopSection from './components/TopSection';
import AboutService from './components/AboutService';
import AboutMerit from './components/AboutMerit';
import AboutStats from './components/AboutStats';
import { Metadata } from 'next';
import Header from '@/components/header/Header';
import EndSection from './components/EndSection';
export const metadata: Metadata = {
  title: '소개',
};

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="py-56">
        <TopSection />
        <AboutService />
        <AboutMerit />
        <AboutStats />
        <EndSection />
      </main>
    </>
  );
};

export default AboutPage;
