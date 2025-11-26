'use client';

import type { ActivityComponentType } from '@stackflow/react';
import MyPage from '@/app/mypage/MyPage.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const MyPageActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <MyPage />
      </div>
    </StackAppScreen>
  );
};

export default MyPageActivity;
