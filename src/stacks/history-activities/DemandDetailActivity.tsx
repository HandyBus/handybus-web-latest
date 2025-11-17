'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import DemandDetail from '@/app/history/demand/[demandId]/DemandDetail.content';

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
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <DemandDetail demandId={demandId} />
      </div>
    </AppScreen>
  );
};

export default DemandDetailActivity;
