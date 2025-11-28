'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import DirectInquiry from '@/app/help/faq/direct-inquiry/DirectInquiry.content';

const DirectInquiryActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <DirectInquiry />
      </div>
    </AppScreen>
  );
};

export default DirectInquiryActivity;
