import Header from '@/components/header/Header';
import Image from 'next/image';
import couponEventImage from './images/coupon-event-info.png';
import Footer from '@/components/footer/Footer';

const Page = () => {
  return (
    <main>
      <Header />
      <figure>
        <Image src={couponEventImage} alt="coupon event" />
      </figure>
      <Footer />
    </main>
  );
};

export default Page;
