'use client';

import { Provider as JotaiProvider, useSetAtom } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import { eventAtom } from '../store/eventAtom';
import {
  cheerCampaignAtom,
  userTodayParticipationsAtom,
  userTotalParticipationsAtom,
} from '../store/cheerAtom';
import { useGetUserCheerCampaignParticipations } from '@/services/user.service';
import { useGetEventCheerCampaignByEventId } from '@/services/cheer.service';
import dayjs from 'dayjs';
import { getIsLoggedIn } from '@/utils/handleToken.util';

interface Props {
  event: EventsViewEntity;
  children: ReactNode;
}

const EventProviderContent = ({ event, children }: Props) => {
  // event
  const setEvent = useSetAtom(eventAtom);
  useEffect(() => {
    setEvent(event);
  }, [event, setEvent]);

  // cheer campaign
  const setCheerCampaign = useSetAtom(cheerCampaignAtom);
  const { data: cheerCampaign } = useGetEventCheerCampaignByEventId(
    event.eventId,
  );
  useEffect(() => {
    setCheerCampaign(cheerCampaign ?? null);
  }, [cheerCampaign, setCheerCampaign]);

  // user total participations
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(getIsLoggedIn());
  }, []);
  const setUserTotalParticipations = useSetAtom(userTotalParticipationsAtom);
  const { data: userTotalParticipations } =
    useGetUserCheerCampaignParticipations(
      isLoggedIn && cheerCampaign?.eventCheerCampaignId
        ? cheerCampaign.eventCheerCampaignId
        : '',
      undefined,
      isLoggedIn,
    );
  useEffect(() => {
    if (userTotalParticipations) {
      setUserTotalParticipations(userTotalParticipations);
    }
  }, [userTotalParticipations, setUserTotalParticipations]);

  // user today participations
  const today = dayjs().tz('Asia/Seoul').format('YYYY-MM-DD');
  const setUserTodayParticipations = useSetAtom(userTodayParticipationsAtom);
  const { data: userTodayParticipations } =
    useGetUserCheerCampaignParticipations(
      isLoggedIn && cheerCampaign?.eventCheerCampaignId
        ? cheerCampaign.eventCheerCampaignId
        : '',
      { participatedDate: today },
      isLoggedIn,
    );
  useEffect(() => {
    if (userTodayParticipations) {
      setUserTodayParticipations(userTodayParticipations);
    }
  }, [userTodayParticipations, setUserTodayParticipations]);

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
