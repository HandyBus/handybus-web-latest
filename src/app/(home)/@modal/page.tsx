'use client';

import ModalPortal from '@/components/modals/ModalPortal';
// import OneDayModal from './components/OneDayModal';
// import couponEventImage from './images/coupon-event.png';
import argentModalImage from './images/argent-modal2.png';
import ArgentModal from './components/ArgentModal';

const Page = () => {
  const showEmergencyModal =
    process.env.NEXT_PUBLIC_ENABLE_EMERGENCY_MODAL === 'true';
  return (
    <ModalPortal>
      {/* {showEmergencyModal ? (
        <ArgentModal image={argentModalImage} />
      ) : (
        <OneDayModal image={couponEventImage} href="/demand-reward-coupon" />
      )} */}
      {showEmergencyModal && <ArgentModal image={argentModalImage} />}
    </ModalPortal>
  );
};

export default Page;
