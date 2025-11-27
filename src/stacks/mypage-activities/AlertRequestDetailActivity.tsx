'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AlertRequestDetail from '@/app/mypage/alert-requests/[alertRequestId]/AlertRequestDetail.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AlertRequestDetail alertRequestId={alertRequestId} />
      </div>
    </StackAppScreen>
  );
};

export default AlertRequestDetailActivity;
