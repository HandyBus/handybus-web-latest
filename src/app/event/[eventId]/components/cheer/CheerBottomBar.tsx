'use client';

import Button from '@/components/buttons/button/Button';
import useAppShare from '@/hooks/webview/useAppShare';
import { useCheerButton } from './hooks/useCheerButton';

interface Props {
  eventId: string;
  eventName: string;
}

const CheerBottomBar = ({ eventId, eventName }: Props) => {
  const {
    hasBaseParticipation,
    isAllCompleted,
    canCheerBase,
    canCheerShare,
    hasShared,
    handleCheerClick,
    handleShare: onShareComplete,
    isLoading,
  } = useCheerButton(eventId);

  const share = useAppShare();

  const handleShareClick = () => {
    share({
      title: `${eventName} 셔틀`,
      message: `${eventName}까지 편리하게 이동하기!`,
      url: window.location.href,
    });
    // 공유 완료 상태 업데이트
    onShareComplete();
  };

  // 버튼 텍스트 결정
  const getCheerButtonText = () => {
    if (isLoading) return '응원 중...';
    if (isAllCompleted) return '오늘의 응원 완료!';
    if (hasBaseParticipation && !hasShared) return '공유 후 재응원 가능';
    if (canCheerShare) return '또 응원하기!';
    return '응원하기';
  };

  // 버튼 비활성화 조건
  const isCheerDisabled =
    isLoading ||
    isAllCompleted ||
    (!canCheerBase && !canCheerShare) ||
    (hasBaseParticipation && !hasShared);

  return (
    <div className="fixed-centered-layout bottom-0 z-50 flex gap-8 bg-basic-white px-16 pb-24 pt-8">
      <Button
        variant="secondary"
        size="medium"
        type="button"
        onClick={handleShareClick}
      >
        공유하기
      </Button>
      <Button
        variant={isAllCompleted ? 'secondary' : 'primary'}
        size="large"
        type="button"
        onClick={handleCheerClick}
        disabled={isCheerDisabled}
      >
        {getCheerButtonText()}
      </Button>
    </div>
  );
};

export default CheerBottomBar;
