import { EventsViewEntity } from '@/types/event.type';

export const checkIsReservationOpen = (event: EventsViewEntity | null) => {
  if (!event) {
    return false;
  }
  return event.minRoutePrice !== null;
};
