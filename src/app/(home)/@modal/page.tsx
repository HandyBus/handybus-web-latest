'use client';

import ModalPortal from '@/components/modals/ModalPortal';
import argentModalImage from './images/argent-modal.png';
import ArgentModal from './components/ArgentModal';
import { useRouter } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
import OneDayModal from './components/OneDayModal';
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
import { getInvitePaybackEventUrl } from '@/utils/promotion.util';

// import AppLaunchEventImage from './images/app-launch-event.png';
import InvitePaybackEventImage from './images/invite-payback-event.png';
import { useReferralTracking } from '@/hooks/analytics/useReferralTracking';

const Page = () => {
  const router = useRouter();
  const showEmergencyModal =
    process.env.NEXT_PUBLIC_ENABLE_EMERGENCY_MODAL === 'true';

  const { isApp, appVersion, platform } = useEnvironment();

  // const handleAppLaunchEventOpen = () => {
  //   router.push('/app-launch-event');
  // };
  // const showAppLaunchEventModal = !isApp;

  const { trackIgnoreInvitePaybackEvent } = useReferralTracking({});

  const handleInvitePaybackEventOpen = () => {
    router.push(getInvitePaybackEventUrl());
  };

  const handleModalClose = () => {
    trackIgnoreInvitePaybackEvent('modal');
  };

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
  }, [isApp]);

  // NOTE: 과거 버전에 Custom User Agent를 추가하지 않아서 WebView 객체로 앱 환경 감지
  // window.ReactNativeWebView: React Native WebView 객체 존재 여부 (User Agent와 무관)
  // appVersion === null: Custom User Agent가 없는 과거 버전 앱
  const isAppFromWebView =
    typeof window !== 'undefined' &&
    typeof window.ReactNativeWebView !== 'undefined';
  const showUpdateAppModal = isAppFromWebView && appVersion === null;
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
        {/* {showAppLaunchEventModal && (
          <OneDayModal
            image={AppLaunchEventImage}
            handleClick={handleAppLaunchEventOpen}
          />
        )} */}
        <OneDayModal
          image={InvitePaybackEventImage}
          handleClick={handleInvitePaybackEventOpen}
          variant="transparent"
          closeForTodayText="오늘은 그만 보기"
          onClose={handleModalClose}
        />
      </ModalPortal>
      <AppLaunchEventCouponDownloadModal
        isOpen={isAppLaunchEventCouponDownloadModalOpen}
        closeModal={closeAppLaunchEventCouponDownloadModal}
      />
    </>
  );
};

export default Page;
