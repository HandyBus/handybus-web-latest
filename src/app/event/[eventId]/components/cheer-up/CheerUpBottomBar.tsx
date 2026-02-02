'use client';

import Button from '@/components/buttons/button/Button';
import useAppShare from '@/hooks/webview/useAppShare';
import { useCheerUpButton } from './hooks/useCheerUpButton';

interface Props {
  eventName: string;
}

const CheerUpBottomBar = ({ eventName }: Props) => {
  const { isCheeredUp, handleCheerUpClick } = useCheerUpButton();
  const share = useAppShare();

  const handleShare = () => {
    share({
      title: `${eventName} 셔틀`,
      message: `${eventName}까지 편리하게 이동하기!`,
      url: window.location.href,
    });
  };

  return (
    <div className="fixed-centered-layout bottom-0 z-50 flex gap-8 bg-basic-white px-16 pb-24 pt-8">
      <Button
        variant="secondary"
        size="medium"
        type="button"
        onClick={handleShare}
      >
        공유하기
      </Button>
      <Button
        variant={isCheeredUp ? 'secondary' : 'primary'}
        size="large"
        type="button"
        onClick={handleCheerUpClick}
        disabled={isCheeredUp}
      >
        {isCheeredUp ? '오늘의 응원 완료!' : '응원하기'}
      </Button>
    </div>
  );
};

export default CheerUpBottomBar;
