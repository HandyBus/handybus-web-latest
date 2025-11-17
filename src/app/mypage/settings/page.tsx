'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return (
    <Stack
      initialContext={{
        req: {
          path: '/mypage/settings',
        },
      }}
    />
  );
};

export default Page;
