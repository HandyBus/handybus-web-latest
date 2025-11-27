'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Faq from '@/app/help/faq/Faq.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const FaqActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Faq />
      </div>
    </StackAppScreen>
  );
};

export default FaqActivity;
