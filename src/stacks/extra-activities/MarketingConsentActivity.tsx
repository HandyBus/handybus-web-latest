'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import MarketingConsent from '@/app/help/faq/marketing-consent/MarketingConsent.content';

const MarketingConsentActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <MarketingConsent />
      </div>
    </AppScreen>
  );
};

export default MarketingConsentActivity;
