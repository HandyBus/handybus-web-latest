import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import {
  DailyEventsInEventsViewEntity,
  EventsViewEntity,
} from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { dateString } from '@/utils/dateString.util';
import { useMemo } from 'react';

interface Props {
  reservation: ReservationsViewEntity;
  event: EventsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity | null | undefined;
}

const useEventText = ({ reservation, event, dailyEvent }: Props) => {
  const eventName = event.eventName;

  const eventLocationName = event.eventLocationName;

  const formattedEventDate = dateString(dailyEvent?.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });

  const hubText = useMemo(() => {
    const tripTypePrefix = `[${TRIP_STATUS_TO_STRING[reservation.type]}]`;
    const toDestinationStartHub =
      reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
        (hub) =>
          hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
      );
    const toDestinationEndHub =
      reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
        (hub) => hub.role === 'DESTINATION',
      );
    const fromDestinationStartHub =
      reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
        (hub) =>
          hub.shuttleRouteHubId ===
          reservation.fromDestinationShuttleRouteHubId,
      );
    const fromDestinationEndHub =
      reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
        (hub) => hub.role === 'DESTINATION',
      );

    let hubText = '';
    if (reservation.type === 'TO_DESTINATION') {
      hubText = `${toDestinationStartHub?.name} → ${toDestinationEndHub?.name}`;
    } else if (reservation.type === 'FROM_DESTINATION') {
      hubText = `${fromDestinationStartHub?.name} → ${fromDestinationEndHub?.name}`;
    } else {
      if (
        toDestinationStartHub?.regionHubId ===
        fromDestinationStartHub?.regionHubId
      ) {
        hubText = `${toDestinationStartHub?.name} ↔ ${toDestinationEndHub?.name}`;
      } else {
        hubText = `${toDestinationStartHub?.name} → ${toDestinationEndHub?.name} → ${fromDestinationEndHub?.name}`;
      }
    }

    return `${tripTypePrefix} ${hubText}`;
  }, [reservation, event.eventLocationName]);

  return { eventName, eventLocationName, formattedEventDate, hubText };
};

export default useEventText;
