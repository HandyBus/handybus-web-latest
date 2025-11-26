'use client';

import type { ActivityComponentType } from '@stackflow/react';
import PrivacyPolicy from '@/app/help/faq/privacy-policy/PrivacyPolicy.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const PrivacyPolicyActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <PrivacyPolicy />
      </div>
    </StackAppScreen>
  );
};

export default PrivacyPolicyActivity;
