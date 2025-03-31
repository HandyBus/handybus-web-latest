'use client';

import { useAtomValue } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { dateString } from '@/utils/dateString.util';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdWithRoutesAtom } from '../../../store/dailyEventIdWithRoutesAtom';
import { dailyEventIdWithHubsAtom } from '../../../store/dailyEventIdWithHubsAtom';

interface Props {
  toNextStep: () => void;
}

const CommonDateStep = ({ toNextStep }: Props) => {
  const event = useAtomValue(eventAtom);
  const dailyEvents =
    event?.dailyEvents?.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))) ?? [];

  const dailyEventIdWithRoutes = useAtomValue(dailyEventIdWithRoutesAtom);
  const dailyEventIdWithHubs = useAtomValue(dailyEventIdWithHubsAtom);
  console.log(dailyEventIdWithRoutes);
  console.log(dailyEventIdWithHubs);

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
      {dailyEvents.map((dailyEvent) => (
        <button
          key={dailyEvent.dailyEventId}
          type="button"
          onClick={() => handleDateClick(dailyEvent)}
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
