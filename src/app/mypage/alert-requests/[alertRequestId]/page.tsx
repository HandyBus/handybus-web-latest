'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    alertRequestId: string;
  };
}

const Page = ({ params }: Props) => {
  const { alertRequestId } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/mypage/alert-requests/${alertRequestId}`,
        },
      }}
    />
  );
};

export default Page;
