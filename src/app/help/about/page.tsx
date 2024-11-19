import AppBar from '@/components/app-bar/AppBar';

import TopSection from './components/TopSection';
import AboutService from './components/AboutService';
import AboutMerit from './components/AboutMerit';
import AsboutStats from './components/AboutStats';

const AboutPage = () => {
  return (
    <>
      <AppBar>핸디버스 소개</AppBar>
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
