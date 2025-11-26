'use client';

import type { ActivityComponentType } from '@stackflow/react';
import DemandDetail from '@/app/history/demand/[demandId]/DemandDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

interface Params {
  demandId: string;
}

const DemandDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { demandId } = params;

  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <DemandDetail demandId={demandId} />
      </div>
    </StackAppScreen>
  );
};

export default DemandDetailActivity;
