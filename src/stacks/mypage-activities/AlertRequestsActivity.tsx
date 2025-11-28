'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import AlertRequests from '@/app/mypage/alert-requests/AlertRequests.content';

const AlertRequestsActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <AlertRequests />
      </div>
    </AppScreen>
  );
};

export default AlertRequestsActivity;
