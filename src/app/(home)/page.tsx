'use client';

import Header from '@/components/header/Header';

import PromotionBanner from './components/PromotionBanner';

import Overviews from './components/Overviews';
import OnDemandingSection from './components/OnDemanding';
import OnReservationSection from './components/OnReservation';
import PromotionReviews from './components/PromotionReviews';

const Home = () => {
  return (
    <>
      <Header />
      <main className="w-full flex-grow pb-12">
        <PromotionBanner />
        <OnReservationSection />
        <OnDemandingSection />
        <Overviews />
        <PromotionReviews />
      </main>
    </>
  );
};

export default Home;
