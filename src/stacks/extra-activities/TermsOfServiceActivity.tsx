'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import TermsOfService from '@/app/help/faq/terms-of-service/TermsOfService.content';

const TermsOfServiceActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <TermsOfService />
      </div>
    </AppScreen>
  );
};

export default TermsOfServiceActivity;
