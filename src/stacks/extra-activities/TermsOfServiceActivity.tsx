'use client';

import type { ActivityComponentType } from '@stackflow/react';
import TermsOfService from '@/app/help/faq/terms-of-service/TermsOfService.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const TermsOfServiceActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <TermsOfService />
      </div>
    </StackAppScreen>
  );
};

export default TermsOfServiceActivity;
