import { EventsViewEntity } from '@/types/event.type';

export const checkIsReservationOpen = (event: EventsViewEntity) => {
  return event.minRoutePrice !== null;
};
