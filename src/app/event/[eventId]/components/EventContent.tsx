'use client';

import { EventWithRoutesViewEntity } from '@/types/event.type';
import EventForm from './event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import ShuttleRouteDetailView from './ShuttleRouteDetailView';

interface Props {
  event: EventWithRoutesViewEntity;
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
