'use client';

import ModalPortal from '@/components/modals/ModalPortal';
import argentModalImage from './images/argent-modal.png';
import ArgentModal from './components/ArgentModal';
import AppLaunchEventImage from './images/app-launch-event.png';
import { useRouter } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
import OneDayModal from './components/OneDayModal';
// import EventPromotionModal from './components/EventPromotionModal';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import {
  getAppLaunchEventCouponDownloadModalSeen,
  setAppLaunchEventCouponDownloadModalSeen,
} from '@/utils/localStorage';
import AppLaunchEventCouponDownloadModal from './components/AppLaunchEventCouponDownloadModal';
import { useEffect, useState } from 'react';
import Modal from '@/components/modals/Modal';
import Button from '@/components/buttons/button/Button';
import { handleExternalLink } from '@/utils/externalLink.util';

const Page = () => {
  const router = useRouter();
  const handleAppLaunchEventOpen = () => {
    router.push('/app-launch-event');
  };
  const showEmergencyModal =
    process.env.NEXT_PUBLIC_ENABLE_EMERGENCY_MODAL === 'true';

  const { isApp, appVersion, platform } = useEnvironment();

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
    const isLoggedIn = getIsLoggedIn();

    const showAppLaunchEventCouponDownloadModal =
      isApp && isLoggedIn && !isAppLaunchEventCouponDownloadModalSeen;
    if (showAppLaunchEventCouponDownloadModal) {
      setIsAppLaunchEventCouponDownloadModalOpen(true);
    }
  }, []);

  // NOTE: 과거 버전에 Custom User Agent를 추가하지 않아서 다른 방식으로 조건 처리
  const showUpdateAppModal =
    (platform === 'ios' || platform === 'android') && appVersion === null;
  if (showUpdateAppModal) {
    const updateAppUrl =
      platform === 'ios'
        ? 'https://apps.apple.com/us/app/%ED%95%B8%EB%94%94%EB%B2%84%EC%8A%A4/id6751479950'
        : 'https://play.google.com/store/apps/details?id=com.handybus.app';
    return (
      <Modal
        isOpen={true}
        title="업데이트 필요"
        description="원활한 이용을 위해 핸디버스 앱을 업데이트해주세요."
        closeModal={() => {}}
      >
        <Button
          type="button"
          variant="primary"
          size="large"
          onClick={() => {
            handleExternalLink(updateAppUrl);
          }}
        >
          업데이트 하러 가기
        </Button>
      </Modal>
    );
  }

  return (
    <>
      <ModalPortal>
        {showEmergencyModal && <ArgentModal image={argentModalImage} />}
        {showAppLaunchEventModal && (
          <OneDayModal
            image={AppLaunchEventImage}
            handleClick={handleAppLaunchEventOpen}
          />
        )}
        {/* {showAppLaunchEventModal && (
          <EventPromotionModal
            image={AppLaunchEventImage}
            handleClick={handleAppLaunchEventOpen}
          />
        )} */}
      </ModalPortal>
      <AppLaunchEventCouponDownloadModal
        isOpen={isAppLaunchEventCouponDownloadModalOpen}
        closeModal={closeAppLaunchEventCouponDownloadModal}
      />
    </>
  );
};

export default Page;
