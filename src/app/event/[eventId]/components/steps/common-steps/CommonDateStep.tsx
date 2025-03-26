'use client';

import { useAtom, useAtomValue } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { dateString } from '@/utils/dateString.util';
import { checkIsReservationOpen } from '../../../event.util';
import { getShuttleRoutesOfDailyEvent } from '@/services/shuttleRoute.service';
import { datesWithRoutesAtom } from '../../../store/datesWithRoutesAtom';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { useState } from 'react';

interface Props {
  toNextStep: () => void;
}

const CommonDateStep = ({ toNextStep }: Props) => {
  const event = useAtomValue(eventAtom);
  const dailyEvents = event?.dailyEvents ?? [];

  const [datesWithRoutes, setDatesWithRoutes] = useAtom(datesWithRoutesAtom);
  const [isLoading, setIsLoading] = useState(false);

  const loadRoutesAndToNextStep = async (
    dailyEvent: DailyEventsInEventsViewEntity,
  ) => {
    const isReservationOpen = checkIsReservationOpen(event);
    if (!isReservationOpen || !event) {
      toNextStep();
      return;
    }

    setIsLoading(true);
    const isRoutesLoaded = Object.keys(datesWithRoutes).find(
      (date) => date === dailyEvent.date,
    );
    if (isRoutesLoaded) {
      toNextStep();
      return;
    }

    try {
      const routes = await getShuttleRoutesOfDailyEvent(
        event.eventId,
        dailyEvent.dailyEventId,
      );
      setDatesWithRoutes({
        date: dailyEvent.date,
        routes,
      });
      toNextStep();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      {dailyEvents.map((dailyEvent) => (
        <button
          key={dailyEvent.dailyEventId}
          type="button"
          disabled={isLoading}
          onClick={() => loadRoutesAndToNextStep(dailyEvent)}
          className="block w-full py-12 text-left text-16 font-600 text-basic-grey-700"
        >
          {formatFullDate(dailyEvent.date)}
        </button>
      ))}
    </section>
  );
};

const formatFullDate = (date: string) => {
  const tokens = dateString(date, {
    showYear: true,
    showDate: true,
    showWeekday: true,
  }).split('.');
  const lastToken = tokens[2].split(' ');
  return (
    tokens[0] + '년 ' + tokens[1] + '월 ' + lastToken[0] + '일 ' + lastToken[1]
  );
};

export default CommonDateStep;
