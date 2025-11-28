'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import About from '@/app/help/about/About.content';

const AboutActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <About />
      </div>
    </AppScreen>
  );
};

export default AboutActivity;
