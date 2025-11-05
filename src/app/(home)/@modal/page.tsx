'use client';

import ModalPortal from '@/components/modals/ModalPortal';
import argentModalImage from './images/argent-modal.png';
import ArgentModal from './components/ArgentModal';
import AppLaunchEventImage from './images/app-launch-event.png';
import { useRouter } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
// import OneDayModal from './components/OneDayModal';
import EventPromotionModal from './components/EventPromotionModal';

const Page = () => {
  const router = useRouter();
  const handleAppLaunchEventOpen = () => {
    router.push('/app-launch-event');
  };
  const showEmergencyModal =
    process.env.NEXT_PUBLIC_ENABLE_EMERGENCY_MODAL === 'true';

  const { isApp } = useEnvironment();
  const showAppLaunchEventModal = !isApp;

  return (
    <ModalPortal>
      {showEmergencyModal && <ArgentModal image={argentModalImage} />}
      {/* <OneDayModal
          image={AppLaunchEventImage}
          handleClick={handleAppLaunchEventOpen}
        /> */}
      {showAppLaunchEventModal && (
        <EventPromotionModal
          image={AppLaunchEventImage}
          handleClick={handleAppLaunchEventOpen}
        />
      )}
    </ModalPortal>
  );
};

export default Page;
