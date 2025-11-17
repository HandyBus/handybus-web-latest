import { createStack } from './stack-config';
import HomeActivity from './home-activities/HomeActivity';
import EventDetailActivity from './event-activities/EventDetailActivity';
import EventListActivity from './event-activities/EventListActivity';
import PaymentActivity from './event-activities/PaymentActivity';

const activities = {
  // home activities
  Home: HomeActivity,
  // event activities
  EventList: EventListActivity,
  EventDetail: EventDetailActivity,
  Payment: PaymentActivity,
};

const routes = {
  // home activities
  Home: '/',
  // event activities
  EventList: '/event',
  EventDetail: '/event/:eventId',
  Payment:
    '/event/:eventId/dailyevent/:dailyEventId/route/:shuttleRouteId/payment',
};

export const { Stack, useFlow } = createStack(activities, routes, 'Home');
