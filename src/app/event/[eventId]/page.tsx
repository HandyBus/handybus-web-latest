'use client';

import { EventStack } from '@/stacks/event-stack';

interface Props {
  params: {
    eventId: string;
  };
}

const Page = ({ params }: Props) => {
  const { eventId } = params;
  return (
    <EventStack
      initialContext={{
        req: {
          path: `/event/${eventId}`,
          params: { eventId },
        },
      }}
    />
  );
};

export default Page;
