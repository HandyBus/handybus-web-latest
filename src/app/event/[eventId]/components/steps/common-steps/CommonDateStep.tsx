'use client';

import { useAtomValue } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { dateString } from '@/utils/dateString.util';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdWithHubsAtom } from '../../../store/dailyEventIdWithHubsAtom';

interface Props {
  toNextStep: () => void;
}

const CommonDateStep = ({ toNextStep }: Props) => {
  const event = useAtomValue(eventAtom);
  const dailyEvents =
    event?.dailyEvents?.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))) ?? [];
  const dailyEventIdWithHubs = useAtomValue(dailyEventIdWithHubsAtom);

  const { setValue } = useFormContext<EventFormValues>();

  const handleDateClick = (dailyEvent: DailyEventsInEventsViewEntity) => {
    if (!event) {
      return;
    }
    setValue('dailyEvent', dailyEvent);
    toNextStep();
  };

  return (
    <section>
      {dailyEvents.map((dailyEvent) => {
        const isDemandOpen = dailyEvent.status === 'OPEN';
        const isReservationOpen = Object.keys(dailyEventIdWithHubs).includes(
          dailyEvent.dailyEventId,
        );
        const isEventEnded = !isDemandOpen && !isReservationOpen;

        return (
          <button
            key={dailyEvent.dailyEventId}
            type="button"
            onClick={() => handleDateClick(dailyEvent)}
            disabled={isEventEnded}
            className="flex w-full items-center justify-between py-12 text-left text-16 font-600 text-basic-grey-700 disabled:text-basic-grey-300"
          >
            <span>{formatFullDate(dailyEvent.date)}</span>
            <span className="text-14 font-500 text-basic-grey-500">
              {isEventEnded
                ? '마감'
                : isDemandOpen && !isReservationOpen
                  ? '전지역 수요조사 중'
                  : null}
            </span>
          </button>
        );
      })}
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
