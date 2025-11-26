'use client';

import type { ActivityComponentType } from '@stackflow/react';
import Login from '@/app/login/Login.content';
import StackAppScreen from '@/stacks/StackAppScreen';

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
    <StackAppScreen>
      <div className="relative flex h-full w-full flex-col">
        <Login redirectUrl={redirectUrl} />
      </div>
    </StackAppScreen>
  );
};

export default LoginActivity;
