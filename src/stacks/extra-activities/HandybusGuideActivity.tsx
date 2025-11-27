'use client';

import type { ActivityComponentType } from '@stackflow/react';
import HandybusGuide, {
  TabValue,
} from '@/app/help/handybus-guide/HandybusGuide.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <HandybusGuide tab={tab} />
      </div>
    </StackAppScreen>
  );
};

export default HandybusGuideActivity;
