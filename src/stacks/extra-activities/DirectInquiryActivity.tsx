'use client';

import type { ActivityComponentType } from '@stackflow/react';
import DirectInquiry from '@/app/help/faq/direct-inquiry/DirectInquiry.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const DirectInquiryActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <DirectInquiry />
      </div>
    </StackAppScreen>
  );
};

export default DirectInquiryActivity;
