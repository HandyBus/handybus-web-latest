'use client';

import ModalPortal from '@/components/modals/ModalPortal';
import argentModalImage from './images/argent-modal.png';
import ArgentModal from './components/ArgentModal';
import AppLaunchEventImage from './images/app-launch-event.png';
import { useRouter } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
// import OneDayModal from './components/OneDayModal';
import EventPromotionModal from './components/EventPromotionModal';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import {
  getAppLaunchEventCouponDownloadModalSeen,
  setAppLaunchEventCouponDownloadModalSeen,
} from '@/utils/localStorage';
import AppLaunchEventCouponDownloadModal from './components/AppLaunchEventCouponDownloadModal';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const handleAppLaunchEventOpen = () => {
    router.push('/app-launch-event');
  };
  const showEmergencyModal =
    process.env.NEXT_PUBLIC_ENABLE_EMERGENCY_MODAL === 'true';

  const { isApp } = useEnvironment();
  const isLoggedIn = getIsLoggedIn();

  const showAppLaunchEventModal = !isApp;

  const [
    isAppLaunchEventCouponDownloadModalOpen,
    setIsAppLaunchEventCouponDownloadModalOpen,
  ] = useState(false);

  const closeAppLaunchEventCouponDownloadModal = () => {
    setIsAppLaunchEventCouponDownloadModalOpen(false);
    setAppLaunchEventCouponDownloadModalSeen();
  };

  useEffect(() => {
    const isAppLaunchEventCouponDownloadModalSeen =
      getAppLaunchEventCouponDownloadModalSeen();
    const showAppLaunchEventCouponDownloadModal =
      isApp && isLoggedIn && !isAppLaunchEventCouponDownloadModalSeen;
    if (showAppLaunchEventCouponDownloadModal) {
      setIsAppLaunchEventCouponDownloadModalOpen(true);
    }
  }, []);

  return (
    <>
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
      <AppLaunchEventCouponDownloadModal
        isOpen={isAppLaunchEventCouponDownloadModalOpen}
        closeModal={closeAppLaunchEventCouponDownloadModal}
      />
    </>
  );
};

export default Page;
