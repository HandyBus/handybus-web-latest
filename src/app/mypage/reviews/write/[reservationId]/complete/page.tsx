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
          path: `/mypage/reviews/write/${reservationId}/complete`,
        },
      }}
    />
  );
};

export default Page;
