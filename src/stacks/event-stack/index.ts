import { createStack } from '../stack-config';
import EventDetailActivity from './activities/EventDetailActivity';
import EventListActivity from './activities/EventListActivity';
import PaymentActivity from './activities/PaymentActivity';

const activities = {
  EventList: EventListActivity,
  EventDetail: EventDetailActivity,
  Payment: PaymentActivity,
};

const routes = {
  EventList: '/event',
  EventDetail: '/event/:eventId',
  Payment:
    '/event/:eventId/dailyevent/:dailyEventId/route/:shuttleRouteId/payment',
  PaymentRequest:
    '/event/:eventId/dailyevent/:dailyEventId/route/:shuttleRouteId/payment/request',
  PaymentRequestSuccess:
    '/event/:eventId/dailyevent/:dailyEventId/route/:shuttleRouteId/payment/request/:reservationId',
  PaymentRequestFail:
    '/event/:eventId/dailyevent/:dailyEventId/route/:shuttleRouteId/payment/request/fail',
};

export const { Stack: EventStack, useFlow: useEventFlow } = createStack(
  activities,
  routes,
  'EventList',
);
