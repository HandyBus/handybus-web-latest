'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    token: string;
  };
}

const Page = ({ params }: Props) => {
  const { token } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/accept-reservation-transfer/${token}/fail`,
        },
      }}
    />
  );
};

export default Page;
