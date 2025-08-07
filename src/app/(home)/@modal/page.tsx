'use client';

import ModalPortal from '@/components/modals/ModalPortal';
// import OneDayModal from './components/OneDayModal';
// import couponEventImage from './images/coupon-event.png';
import ArgentModal from './components/ArgentModal';
import argentEventImage from './images/argent-modal2.png';

const Page = () => {
  return (
    <ModalPortal>
      {/* <OneDayModal image={couponEventImage} href="/demand-reward-coupon" /> */}
      <ArgentModal image={argentEventImage} />
    </ModalPortal>
  );
};

export default Page;
