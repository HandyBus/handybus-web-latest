'use client';

import TrendEventsSwiperView from './TrendEventsSwiperView';
import { EventsViewEntity } from '@/types/event.type';

interface Props {
  events: EventsViewEntity[] | null | undefined;
}

const TrendEventCard = ({ events }: Props) => {
  const slicedEvents = !events
    ? []
    : events.length > 20
      ? events.slice(0, MAX_EVENTS_COUNT)
      : events.slice(0, MIN_EVENTS_COUNT);

  return (
    <section className="pb-24">
      {slicedEvents ? (
        <TrendEventsSwiperView events={slicedEvents} />
      ) : (
        <EmptyView />
      )}
    </section>
  );
};

export default TrendEventCard;

const EmptyView = () => <div className="h-[309px] py-16" />;
const MAX_EVENTS_COUNT = 5;
const MIN_EVENTS_COUNT = 3;
