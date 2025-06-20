'use client';

import { useAtomValue } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { dateString } from '@/utils/dateString.util';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import Button from '@/components/buttons/button/Button';
import { EventPhase } from '@/utils/event.util';

interface Props {
  toNextStep: () => void;
  phase: EventPhase;
}

const CommonDateStep = ({ toNextStep, phase }: Props) => {
  const event = useAtomValue(eventAtom);
  const dailyEvents =
    event?.dailyEvents?.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))) ?? [];
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);

  const { setValue } = useFormContext<EventFormValues>();

  const handleDateClick = (dailyEvent: DailyEventsInEventsViewEntity) => {
    if (!event) {
      return;
    }
    setValue('dailyEvent', dailyEvent);
    toNextStep();
  };

  return (
    <section className="flex flex-col gap-8">
      {dailyEvents.map((dailyEvent) => {
        const isDemandOpen = dailyEvent.status === 'OPEN';
        const isReservationOpen = Object.keys(dailyEventIdsWithHubs).includes(
          dailyEvent.dailyEventId,
        );
        const isEventEnded = !isDemandOpen && !isReservationOpen;
        const isDemandOpenAndReservationClosed =
          isDemandOpen && !isReservationOpen && phase === 'reservation';
        return (
          <div key={dailyEvent.dailyEventId} className="relative">
            <button
              type="button"
              onClick={() => handleDateClick(dailyEvent)}
              disabled={isEventEnded || isDemandOpenAndReservationClosed}
              className="group flex w-full items-center justify-between py-12 text-left"
            >
              <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
                {formatFullDate(dailyEvent.date)}
              </span>
              {isEventEnded && (
                <span className="text-14 font-500 text-basic-grey-500">
                  마감
                </span>
              )}
            </button>
            {isDemandOpenAndReservationClosed && (
              <Button
                variant="primary"
                size="small"
                className="absolute right-0 top-1/2 w-100 -translate-y-1/2"
                onClick={() => handleDateClick(dailyEvent)}
              >
                수요조사 참여하기
              </Button>
            )}
          </div>
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
