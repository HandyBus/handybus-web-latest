'use client';

import ModalPortal from '@/components/modals/ModalPortal';
import argentModalImage from './images/argent-modal2.png';
import ArgentModal from './components/ArgentModal';
import OneDayModal from './components/OneDayModal';
import OasisHandyPartyImage from './images/oasis-handyparty-modal.png';

const OASIS_HANDYPARTY_MODAL_URL =
  'https://www.handybus.co.kr/announcements/633200611310965713';

const Page = () => {
  const showEmergencyModal =
    process.env.NEXT_PUBLIC_ENABLE_EMERGENCY_MODAL === 'true';
  return (
    <ModalPortal>
      {showEmergencyModal && <ArgentModal image={argentModalImage} />}
      <OneDayModal
        image={OasisHandyPartyImage}
        href={OASIS_HANDYPARTY_MODAL_URL}
      />
      {/* <EventPromotionModal
        image={EventPromotionModalImage}
        href={EVENT_PROMOTION_MODAL_URL}
      /> */}
    </ModalPortal>
  );
};

export default Page;
