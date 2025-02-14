import TopSection from './components/TopSection';
import AboutService from './components/AboutService';
import AboutMerit from './components/AboutMerit';
import AsboutStats from './components/AboutStats';
import { Metadata } from 'next';
import Header from '@/components/header/Header';

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
        <AsboutStats />
      </main>
    </>
  );
};

export default AboutPage;
