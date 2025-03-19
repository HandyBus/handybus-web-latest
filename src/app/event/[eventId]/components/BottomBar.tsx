'use client';

import Button from '@/components/buttons/button/Button';
import NotificationIcon from '../icons/notification.svg';
import TriangleIcon from '../icons/triangle.svg';

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
      <Button variant="secondary" size="medium" type="button">
        공유하기
      </Button>
      <Button variant="primary" size="large">
        수요조사 참여하기
      </Button>
      <NotificationBubble />
    </div>
  );
};

export default BottomBar;

const NotificationBubble = () => {
  return (
    <div className="absolute -top-[5px] right-[19%] flex -translate-y-full items-center gap-[2px] whitespace-nowrap break-keep rounded-full bg-basic-black px-8 py-[5px] text-10 font-600 text-basic-white">
      <NotificationIcon />
      <span>지금 참여하고 셔틀 오픈 알림을 받으세요!</span>
      <TriangleIcon className="absolute bottom-[2px] left-1/2 -translate-x-1/2 translate-y-full" />
    </div>
  );
};
