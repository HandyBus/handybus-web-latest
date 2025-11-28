'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AlertRequestDetail from '@/app/mypage/alert-requests/[alertRequestId]/AlertRequestDetail.content';

interface Params {
  alertRequestId: string;
}

const AlertRequestDetailActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { alertRequestId } = params;

  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AlertRequestDetail alertRequestId={alertRequestId} />
      </div>
    </AppScreen>
  );
};

export default AlertRequestDetailActivity;
