'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import HandybusGuide, {
  TabValue,
} from '@/app/help/handybus-guide/HandybusGuide.content';

interface Params {
  tab: TabValue;
}

const HandybusGuideActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { tab } = params;
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <HandybusGuide tab={tab} />
      </div>
    </AppScreen>
  );
};

export default HandybusGuideActivity;
