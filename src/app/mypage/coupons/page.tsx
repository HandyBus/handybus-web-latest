'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return (
    <Stack
      initialContext={{
        req: {
          path: '/mypage/coupons',
        },
      }}
    />
  );
};

export default Page;
