'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return (
    <Stack
      initialContext={{
        req: {
          path: '/mypage/profile/edit',
        },
      }}
    />
  );
};

export default Page;
