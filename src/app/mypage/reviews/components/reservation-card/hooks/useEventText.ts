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
    // TODO: 추후 도착지 속성이 추가되면 반영되어야 함
    const eventLocationHubName = event.eventLocationName;
    const toDestinationHub =
      reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
        (hub) =>
          hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
      );
    const fromDestinationHub =
      reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
        (hub) =>
          hub.shuttleRouteHubId ===
          reservation.fromDestinationShuttleRouteHubId,
      );

    let hubText = '';
    if (reservation.type === 'TO_DESTINATION') {
      hubText = `${toDestinationHub?.name} → ${eventLocationHubName}`;
    } else if (reservation.type === 'FROM_DESTINATION') {
      hubText = `${eventLocationHubName} → ${fromDestinationHub?.name}`;
    } else {
      if (toDestinationHub?.regionHubId === fromDestinationHub?.regionHubId) {
        hubText = `${toDestinationHub?.name} ↔ ${eventLocationHubName}`;
      } else {
        hubText = `${toDestinationHub?.name} → ${eventLocationHubName} → ${fromDestinationHub?.name}`;
      }
    }

    return `${tripTypePrefix} ${hubText}`;
  }, [reservation, event.eventLocationName]);

  return { eventName, eventLocationName, formattedEventDate, hubText };
};

export default useEventText;
