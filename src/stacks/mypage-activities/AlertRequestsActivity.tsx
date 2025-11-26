'use client';

import type { ActivityComponentType } from '@stackflow/react';
import AlertRequests from '@/app/mypage/alert-requests/AlertRequests.content';
import StackAppScreen from '@/stacks/StackAppScreen';

const AlertRequestsActivity: ActivityComponentType = () => {
  return (
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AlertRequests />
      </div>
    </StackAppScreen>
  );
};

export default AlertRequestsActivity;
