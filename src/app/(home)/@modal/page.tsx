'use client';

import ModalPortal from '@/components/modals/ModalPortal';
// import OneDayModal from './components/OneDayModal';
// import couponEventImage from './images/coupon-event.png';
import argentModalImage from './images/argent-modal2.png';
import ArgentModal from './components/ArgentModal';

const Page = () => {
  return (
    <ModalPortal>
      {/* <OneDayModal image={couponEventImage} href="/demand-reward-coupon" /> */}
      <ArgentModal image={argentModalImage} href="/demand-reward-coupon" />
    </ModalPortal>
  );
};

export default Page;
