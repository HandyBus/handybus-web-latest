'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    eventId: string;
  };
}

const Page = ({ params }: Props) => {
  const { eventId } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/event/${eventId}`,
        },
      }}
    />
  );
};

export default Page;
