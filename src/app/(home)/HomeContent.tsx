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
import { EventsViewEntity } from '@/types/event.type';
import { AdminHandleBannerRequestBanners } from '@/types/banner.type';
import { AnnouncementResponseModel } from '@/types/announcement.type';

interface HomeContentProps {
  recommendedEvents: EventsViewEntity[];
  pinnedEvents: EventsViewEntity[];
  bannerImages: AdminHandleBannerRequestBanners[];
  announcements: AnnouncementResponseModel[];
}

const HomeContent = ({
  recommendedEvents,
  pinnedEvents,
  bannerImages,
  announcements,
}: HomeContentProps) => {
  return (
    <>
      <Header />
      <main className="w-full grow">
        <EventSection
          recommendedEvents={recommendedEvents}
          pinnedEvents={pinnedEvents}
        />
        <BannerSection bannerImages={bannerImages} />
        <HelpSection />
        <AnnouncementSection announcements={announcements} />
        <GreetingSection />
        <ModalSection />
      </main>
      <Footer />
      <NavBar />
    </>
  );
};

export default HomeContent;
