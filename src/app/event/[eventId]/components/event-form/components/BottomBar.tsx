'use client';

import Button from '@/components/buttons/button/Button';
import NotificationIcon from '../../../icons/notification.svg';
import TriangleIcon from '../../../icons/triangle.svg';
import { EventEnabledStatus, EventPhase } from '@/utils/event.util';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { createLoginRedirectPath } from '@/hooks/useAuthRouter';
import { useRouter } from 'next/navigation';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import useAppShare from '@/hooks/webview/useAppShare';

interface Props {
  eventName: string;
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
  onClick: () => void;
}

const BottomBar = ({ eventName, phase, enabledStatus, onClick }: Props) => {
  const router = useRouter();
  const { markAsIntentionalNavigation } = useReservationTrackingGlobal();

  const handleClick = () => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      const currentUrl = window.location.pathname + window.location.search;
      const redirectUrl = createLoginRedirectPath(currentUrl);
      markAsIntentionalNavigation();
      router.push(redirectUrl);
      return;
    }
    onClick();
  };

  const share = useAppShare();
  const handleShare = () => {
    share({
      title: `${eventName} 셔틀`,
      message: `${eventName}까지 편리하게 이동하기!`,
      url: window.location.href,
    });
  };

  const isDemandDisabled = phase === 'demand' && enabledStatus === 'disabled';

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
        <Button
          variant="secondary"
          size="medium"
          type="button"
          onClick={handleShare}
        >
          공유하기
        </Button>
        <Button
          variant={isDemandDisabled ? 'tertiary' : 'primary'}
          size="large"
          type="button"
          onClick={handleClick}
          disabled={enabledStatus === 'disabled'}
        >
          {BUTTON_TEXT[phase][enabledStatus]}
        </Button>
        {phase === 'demand' && enabledStatus === 'enabled' && (
          <NotificationBubble />
        )}
      </div>
    </>
  );
};

export default BottomBar;

const NotificationBubble = () => {
  return (
    <div className="absolute -top-[3px] left-1/2 flex -translate-x-68 -translate-y-full items-center gap-[2px] whitespace-nowrap break-keep rounded-full bg-basic-black px-8 py-[6px] text-12 font-600 text-basic-white">
      <NotificationIcon />
      <span>지금 참여하고 셔틀 오픈 알림을 받으세요!</span>
      <TriangleIcon className="absolute bottom-[2px] left-1/2 -translate-x-1/2 translate-y-full" />
    </div>
  );
};

const BUTTON_TEXT = {
  reservation: { enabled: '예약 가능한 셔틀 보기', disabled: '예약 마감' },
  demand: {
    enabled: '수요조사 참여하기',
    disabled: '인원 부족으로 열리지 않았어요',
  },
};
