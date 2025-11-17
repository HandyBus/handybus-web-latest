'use client';

import { Stack } from '@/stacks';

interface Props {
  params: {
    eventId: string;
    dailyEventId: string;
    shuttleRouteId: string;
  };
}

const Page = ({ params }: Props) => {
  const { eventId, dailyEventId, shuttleRouteId } = params;
  return (
    <Stack
      initialContext={{
        req: {
          path: `/event/${eventId}/dailyevent/${dailyEventId}/route/${shuttleRouteId}/payment`,
          params: {
            eventId,
            dailyEventId,
            shuttleRouteId,
          },
        },
      }}
    />
  );
};

export default Page;
