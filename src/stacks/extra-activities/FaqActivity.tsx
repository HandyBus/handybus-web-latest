'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Faq from '@/app/help/faq/Faq.content';

const FaqActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Faq />
      </div>
    </AppScreen>
  );
};

export default FaqActivity;
