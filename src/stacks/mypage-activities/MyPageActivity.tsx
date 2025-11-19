'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import MyPage from '@/app/mypage/MyPage.content';

const MyPageActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <MyPage />
      </div>
    </AppScreen>
  );
};

export default MyPageActivity;
