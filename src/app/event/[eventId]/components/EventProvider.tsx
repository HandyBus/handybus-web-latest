'use client';

import { Provider as JotaiProvider, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import { eventAtom } from '../store/eventAtom';
import { cheerCampaignAtom } from '../store/cheerAtom';
import { useGetEventCheerCampaignByEventId } from '@/services/cheer.service';

interface Props {
  event: EventsViewEntity;
  children: React.ReactNode;
}

const EventProviderContent = ({ event, children }: Props) => {
  const setEvent = useSetAtom(eventAtom);
  const setCheerCampaign = useSetAtom(cheerCampaignAtom);

  const { data: cheerCampaign } = useGetEventCheerCampaignByEventId(
    event.eventId,
  );

  useEffect(() => {
    setEvent(event);
  }, [event, setEvent]);

  useEffect(() => {
    setCheerCampaign(cheerCampaign ?? null);
  }, [cheerCampaign, setCheerCampaign]);

  return <>{children}</>;
};

const EventProvider = ({ event, children }: Props) => {
  return (
    <JotaiProvider>
      <EventProviderContent event={event}>{children}</EventProviderContent>
    </JotaiProvider>
  );
};

export default EventProvider;
