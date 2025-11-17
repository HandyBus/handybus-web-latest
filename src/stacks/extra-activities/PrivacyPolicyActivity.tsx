'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import PrivacyPolicy from '@/app/help/faq/privacy-policy/PrivacyPolicy.content';

const PrivacyPolicyActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <PrivacyPolicy />
      </div>
    </AppScreen>
  );
};

export default PrivacyPolicyActivity;
