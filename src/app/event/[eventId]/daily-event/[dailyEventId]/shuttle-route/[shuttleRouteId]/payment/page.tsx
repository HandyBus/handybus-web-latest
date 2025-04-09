import Header from '@/components/header/Header';
import EventInfoSection from './components/sections/EventInfoSection';
import ShuttleRouteInfoSection from './components/sections/ShuttleRouteInfoSection';
import ClientInfoSection from './components/sections/ClientInfoSection';
import HandySection from './components/sections/HandySection';
import CouponSection from './components/sections/CouponSection';
import PriceSection from './components/sections/PriceSection';
import BottomBar from './components/BottomBar';
import PaymentSection from './components/sections/PaymentSection';

interface Props {
  params: {
    eventId: string;
    dailyEventId: string;
    shuttleRouteId: string;
  };
}
const Page = ({ params }: Props) => {
  console.log(params);
  return (
    <>
      <Header />
      <main className="pb-100">
        <EventInfoSection />
        <ShuttleRouteInfoSection />
        <ClientInfoSection />
        <HandySection />
        <CouponSection />
        <PriceSection />
        <PaymentSection />
        <BottomBar />
      </main>
    </>
  );
};

export default Page;
