'use client';

import { useAtomValue } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { dateString } from '@/utils/dateString.util';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import { EventPhase } from '@/utils/event.util';
import { useGetDemandStats } from '@/services/demand.service';
import { useMemo } from 'react';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { toast } from 'react-toastify';
import { userDemandsAtom } from '../../../store/userDemandsAtom';

interface Props {
  toNextStep: () => void;
  phase: EventPhase;
}

const CommonDateStep = ({ toNextStep, phase }: Props) => {
  const event = useAtomValue(eventAtom);
  const userDemands = useAtomValue(userDemandsAtom);
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);

  const { setValue } = useFormContext<EventFormValues>();
  const handleDateClick = (dailyEvent: DailyEventsInEventsViewEntity) => {
    if (!event) {
      return;
    }

    const isDemandOpen = dailyEvent.dailyEventStatus === 'OPEN';
    const isReservationOpen = Object.keys(dailyEventIdsWithHubs).includes(
      dailyEvent.dailyEventId,
    );
    const onlyDemandPossibleDuringReservationPhase =
      isDemandOpen && !isReservationOpen && phase === 'reservation';

    if (phase === 'reservation' && !onlyDemandPossibleDuringReservationPhase) {
      setValue('dailyEvent', dailyEvent);
      toNextStep();
      return;
    }

    const isDemandSubmitted = userDemands?.some(
      (demand) => demand.dailyEventId === dailyEvent.dailyEventId,
    );

    if (isDemandSubmitted) {
      toast.error('이미 참여한 일자예요.');
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
      dayjs(a.dailyEventDate).diff(dayjs(b.dailyEventDate)),
    );
    return dailyEvents.map((dailyEvent) => {
      const demandStat = demandStats?.find(
        (stat) => stat.dailyEventId === dailyEvent.dailyEventId,
      );
      return { ...dailyEvent, demandStat };
    });
  }, [demandStats, event?.dailyEvents]);

  if (!event || !demandStats) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loading style="grow" />
      </div>
    );
  }
  return (
    // 동시접속자수가 몰려서 event 데이터 자체를 못받는 경우도 지속되는 로딩 UI를 보여줌. 에러화면을 보여주면 유저들의 새로고침을 유발해 서버에 더 많은 부하가중.
    <DeferredSuspense
      fallback={
        <div className="flex h-60 items-center justify-center">
          <Loading style="grow" />
        </div>
      }
      isLoading={isDemandStatsLoading}
    >
      <section className="flex flex-col gap-8">
        {dailyEventWithDemandStats.map((dailyEventWithDemandStat) => {
          const isDemandPhase = phase === 'demand';
          const isDemandOpen =
            dailyEventWithDemandStat.dailyEventStatus === 'OPEN';
          const isReservationOpen = Object.keys(dailyEventIdsWithHubs).includes(
            dailyEventWithDemandStat.dailyEventId,
          );
          const isDailyEventEnded = !isDemandOpen && !isReservationOpen;
          const onlyDemandPossibleDuringReservationPhase =
            isDemandOpen && !isReservationOpen && phase === 'reservation';
          return (
            <div
              key={dailyEventWithDemandStat.dailyEventId}
              className="relative"
            >
              <button
                type="button"
                onClick={() => handleDateClick(dailyEventWithDemandStat)}
                disabled={isDailyEventEnded}
                className="group flex w-full items-center justify-between py-12 text-left"
              >
                <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
                  {formatFullDate(dailyEventWithDemandStat.dailyEventDate)}
                </span>
                {isDailyEventEnded ? (
                  <DailyEventStatusChip status="예약마감" />
                ) : onlyDemandPossibleDuringReservationPhase ? (
                  <DailyEventStatusChip status="수요조사중" />
                ) : (
                  !isDemandPhase &&
                  !isDailyEventEnded && (
                    <DailyEventStatusChip status="셔틀예약중" />
                  )
                )}
              </button>
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
    </DeferredSuspense>
  );
};

export default CommonDateStep;

const formatFullDate = (dailyEventDate: string) => {
  const tokens = dateString(dailyEventDate, {
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

const DailyEventStatusChip = ({
  status,
}: {
  status: '셔틀예약중' | '수요조사중' | '예약마감';
}) => {
  switch (status) {
    case '셔틀예약중':
      return (
        <span className="rounded-[42px] bg-brand-primary-50 px-8 py-4 text-10 font-600 leading-[160%] text-brand-primary-400">
          셔틀 예약중
        </span>
      );
    case '수요조사중':
      return (
        <span className="rounded-[42px] border border-basic-grey-200 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-700">
          수요조사중
        </span>
      );
    case '예약마감':
      return (
        <span className="rounded-[42px] bg-basic-grey-50 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-300">
          예약마감
        </span>
      );
    default:
      return;
  }
};
