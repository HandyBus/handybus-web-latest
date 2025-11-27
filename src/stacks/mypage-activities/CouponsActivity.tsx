'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Coupons from '@/app/mypage/coupons/Coupons.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const CouponsActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Coupons />
      </div>
    </StackAppScreen>
  );
};

export default CouponsActivity;
