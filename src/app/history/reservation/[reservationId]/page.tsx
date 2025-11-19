'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/history/reservation/${reservationId}`,
        },
      }}
    />
  );
};

export default Page;
