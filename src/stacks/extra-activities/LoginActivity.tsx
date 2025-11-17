'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Login from '@/app/login/Login.content';

const LoginActivity: ActivityComponentType = () => {
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Login />
      </div>
    </AppScreen>
  );
};

export default LoginActivity;
