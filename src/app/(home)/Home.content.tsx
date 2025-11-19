'use client';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import NavBar from '@/components/nav-bar/NavBar';
import HelpSection from './components/help/HelpSection';
import EventSection from './components/event/EventSection';
import BannerSection from './components/banner/BannerSection';
import AnnouncementSection from './components/announcement/AnnouncementSection';
import GreetingSection from './components/greeting/GreetingSection';
import ModalSection from './components/modal/ModalSection';

const Home = () => {
  return (
    <>
      <Header />
      <main className="w-full grow">
        <EventSection />
        <BannerSection />
        <HelpSection />
        <AnnouncementSection />
        <GreetingSection />
        <ModalSection />
      </main>
      <Footer />
      <NavBar />
    </>
  );
};

export default Home;
