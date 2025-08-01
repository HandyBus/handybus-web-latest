'use client';

import ModalPortal from '@/components/modals/ModalPortal';
import OneDayModal from './components/OneDayModal';
import couponEventImage from './images/coupon-event.png';

const Page = () => {
  return (
    <ModalPortal>
      <OneDayModal image={couponEventImage} href="/demand-reward-coupon" />
    </ModalPortal>
  );
};

export default Page;
