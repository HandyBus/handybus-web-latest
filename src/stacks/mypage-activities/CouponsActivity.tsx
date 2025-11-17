'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Coupons from '@/app/mypage/coupons/Coupons.content';

const CouponsActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Coupons />
      </div>
    </AppScreen>
  );
};

export default CouponsActivity;
