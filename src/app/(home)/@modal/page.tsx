'use client';

import ModalPortal from '@/components/modals/ModalPortal';
// import OneDayModal from './components/OneDayModal';
// import couponEventImage from './images/coupon-event.png';
import argentModalImage from './images/argent-modal2.png';
import ArgentModal from './components/ArgentModal';
import EventPromotionModalImage from './images/event-promotion-modal-image-muse.png';
import EventPromotionModal from './components/EventPromotionModal';

const EVENT_PROMOTION_MODAL_URL =
  'https://www.instagram.com/p/DPDTVn0k_dM/?utm_source=ig_web_copy_link&igsh=ZG12czFlOHVzaWIw';

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
      <EventPromotionModal
        image={EventPromotionModalImage}
        href={EVENT_PROMOTION_MODAL_URL}
      />
    </ModalPortal>
  );
};

export default Page;
