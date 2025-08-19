'use client';

import { EventsViewEntity } from '@/types/event.type';
import EventForm from './event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import ShuttleRouteDetailView from './shuttle-route-detail-view/ShuttleRouteDetailView';

interface Props {
  event: EventsViewEntity;
  isNoDemandRewardCouponEvent: boolean;
}

const EventContent = ({ event, isNoDemandRewardCouponEvent }: Props) => {
  return (
    <JotaiProvider>
      <EventForm
        event={event}
        isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
      />
      <ShuttleRouteDetailView />
    </JotaiProvider>
  );
};

export default EventContent;
