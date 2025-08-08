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
import { useGetDemandStats } from '@/services/demand.service';
import { useMemo } from 'react';
import Loading from '@/components/loading/Loading';

interface Props {
  toNextStep: () => void;
  phase: EventPhase;
}

const CommonDateStep = ({ toNextStep, phase }: Props) => {
  const event = useAtomValue(eventAtom);
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);

  const { setValue } = useFormContext<EventFormValues>();

  const handleDateClick = (dailyEvent: DailyEventsInEventsViewEntity) => {
    if (!event) {
      return;
    }
    setValue('dailyEvent', dailyEvent);
    toNextStep();
  };

  const { data: demandStats, isLoading: isDemandStatsLoading } =
    useGetDemandStats(
      {
        groupBy: 'DAILY_EVENT',
        eventId: event?.eventId,
      },
      { enabled: !!event?.eventId },
    );

  const dailyEventWithDemandStats = useMemo(() => {
    if (!event?.dailyEvents || !demandStats) {
      return [];
    }
    const dailyEvents = event.dailyEvents.sort((a, b) =>
      dayjs(a.date).diff(dayjs(b.date)),
    );
    return dailyEvents.map((dailyEvent) => {
      const demandStat = demandStats?.find(
        (stat) => stat.dailyEventId === dailyEvent.dailyEventId,
      );
      return { ...dailyEvent, demandStat };
    });
  }, [demandStats, event?.dailyEvents]);

  if (isDemandStatsLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loading style="grow" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      {dailyEventWithDemandStats.map((dailyEventWithDemandStat) => {
        const isDemandPhase = phase === 'demand';
        const isDemandOpen = dailyEventWithDemandStat.status === 'OPEN';
        const isReservationOpen = Object.keys(dailyEventIdsWithHubs).includes(
          dailyEventWithDemandStat.dailyEventId,
        );
        const isDailyEventEnded = !isDemandOpen && !isReservationOpen;
        const onlyDemandPossibleDuringReservationPhase =
          isDemandOpen && !isReservationOpen && phase === 'reservation';
        return (
          <div key={dailyEventWithDemandStat.dailyEventId} className="relative">
            <button
              type="button"
              onClick={() => handleDateClick(dailyEventWithDemandStat)}
              disabled={
                isDailyEventEnded || onlyDemandPossibleDuringReservationPhase
              }
              className="group flex w-full items-center justify-between py-12 text-left"
            >
              <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
                {formatFullDate(dailyEventWithDemandStat.date)}
              </span>
              {isDailyEventEnded && (
                <span className="text-14 font-500 text-basic-grey-500">
                  마감
                </span>
              )}
            </button>
            {onlyDemandPossibleDuringReservationPhase && (
              <Button
                variant="primary"
                size="small"
                className="absolute right-0 top-1/2 w-100 -translate-y-1/2"
                onClick={() => handleDateClick(dailyEventWithDemandStat)}
              >
                수요조사 참여하기
              </Button>
            )}
            {isDemandPhase && !isDailyEventEnded && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 whitespace-nowrap break-keep text-14 font-500 text-brand-primary-400">
                {getDemandText(
                  dailyEventWithDemandStat.demandStat?.totalCount ?? 0,
                )}
              </span>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default CommonDateStep;

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

const getDemandText = (demandCount: number) => {
  if (demandCount < 30) {
    return '';
  }
  const parsedDemandCount = Math.floor(demandCount / 10) * 10;
  return `${parsedDemandCount}명 이상 요청했어요`;
};
