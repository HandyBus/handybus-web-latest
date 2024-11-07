'use client';

import Header from '@/components/header/Header';

import PromotionBanner from './components/PromotionBanner';
import Overviews from './components/Overviews';
import OnDemanding from './components/OnDemanding';
import OnReservation from './components/OnReservation';
import PromotionReviews from './components/PromotionReviews';

const Home = () => {
  return (
    <>
      <Header />
      <main className="w-full flex-grow pb-12">
        <PromotionBanner />
        <OnReservation />
        <OnDemanding />
        <Overviews />
        <PromotionReviews />
      </main>
    </>
  );
};

export default Home;
