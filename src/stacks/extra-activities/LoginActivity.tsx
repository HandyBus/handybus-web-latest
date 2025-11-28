'use client';

import type { ActivityComponentType } from '@stackflow/react';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import Login from '@/app/login/Login.content';

interface Params {
  redirectUrl?: string;
}

const LoginActivity: ActivityComponentType<Params> = ({
  params,
}: {
  params: Params;
}) => {
  const { redirectUrl } = params;
  return (
    <AppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Login redirectUrl={redirectUrl} />
      </div>
    </AppScreen>
  );
};

export default LoginActivity;
