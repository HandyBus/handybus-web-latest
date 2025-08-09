'use client';

import { EventsViewEntity } from '@/types/event.type';
import EventForm from './event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import ShuttleRouteDetailView from './shuttle-route-detail-view/ShuttleRouteDetailView';

interface Props {
  event: EventsViewEntity;
}

const EventContent = ({ event }: Props) => {
  return (
    <JotaiProvider>
      <EventForm event={event} />
      <ShuttleRouteDetailView />
    </JotaiProvider>
  );
};

export default EventContent;
