'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    reservationId: string;
  };
  searchParams: {
    direction?: string;
  };
}

const Page = ({ params, searchParams }: Props) => {
  const { reservationId } = params;
  const { direction } = searchParams;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/ticket/${reservationId}?direction=${direction}`,
        },
      }}
    />
  );
};

export default Page;
