'use client';

import type { ActivityComponentType } from '@stackflow/react';
import About from '@/app/help/about/About.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const AboutActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <About />
      </div>
    </StackAppScreen>
  );
};

export default AboutActivity;
