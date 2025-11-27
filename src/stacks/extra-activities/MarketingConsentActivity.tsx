'use client';

import type { ActivityComponentType } from '@stackflow/react';
import MarketingConsent from '@/app/help/faq/marketing-consent/MarketingConsent.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const MarketingConsentActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <MarketingConsent />
      </div>
    </StackAppScreen>
  );
};

export default MarketingConsentActivity;
