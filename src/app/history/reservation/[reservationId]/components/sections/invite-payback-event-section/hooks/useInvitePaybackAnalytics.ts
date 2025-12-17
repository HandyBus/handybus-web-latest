import { useMemo } from 'react';
import { useReferralTracking } from '@/hooks/analytics/useReferralTracking';
import { EventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';

interface Props {
  event: EventsViewEntity;
  reservation: ReservationsViewEntity;
}

export const useInvitePaybackAnalytics = ({ event, reservation }: Props) => {
  const eventId = event.eventId;
  const eventName = event.eventName;
  const eventDate = useMemo(
    () =>
      event.dailyEvents.find(
        (dailyEvent) =>
          dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
      )?.date ?? '',
    [event.dailyEvents, reservation.shuttleRoute.dailyEventId],
  );

  return useReferralTracking({
    eventId,
    eventName,
    eventDate,
  });
};
