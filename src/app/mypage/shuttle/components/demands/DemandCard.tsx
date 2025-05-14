'use client';

import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import { dateString } from '@/utils/dateString.util';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Link from 'next/link';
import ArrowRightIcon from '../../icons/arrow-right.svg';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const DemandCard = ({ demand }: Props) => {
  const dailyEvent = demand.event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === demand.dailyEventId,
  );
  const formattedEventDate = dateString(dailyEvent?.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const formattedDemandDate = dateString(demand.createdAt, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });

  const demandRegionHub =
    demand.toDestinationRegionHub ?? demand.fromDestinationRegionHub;
  // NOTE: 기존에 기타로 수요조사를 한 유저들을 위한 호환성 코드. V2부터 기타로 수요조사가 불가하도록 변경됨.
  const desiredDemandRegionHub =
    demand.desiredToDestinationRegionHub ??
    demand.desiredFromDestinationRegionHub;

  const isReservationOngoing =
    demand.hasShuttleRoute &&
    (demand.status === 'OPEN' ||
      demand.status === 'CLOSED' ||
      demand.status === 'FULFILLED');
  const isDemandFulfilled = demand.status === 'FULFILLED';
  const isDemandClosed =
    (demand.status === 'CLOSED' && !demand.hasShuttleRoute) ||
    demand.status === 'ENDED' ||
    demand.status === 'INACTIVE';

  const router = useRouter();
  const handleReserveClick = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  const descriptionText = useMemo(() => {
    if (isDemandClosed && demand.hasShuttleRoute) {
      return '이미 종료된 행사예요.';
    } else if (isDemandClosed && !demand.hasShuttleRoute) {
      return '아쉽게도 해당 행사는 인원 부족으로 셔틀이 열리지 않았어요.';
    } else if (isReservationOngoing && !isDemandFulfilled) {
      return '셔틀이 열렸어요! 지금 바로 예약해 보세요.';
    } else if (isReservationOngoing && isDemandFulfilled) {
      return '이 행사의 셔틀을 예약했어요.';
    } else {
      return (
        <span>
          현재{' '}
          <span className="text-brand-primary-400">
            {demand.demandCountOnRegion}
          </span>
          명이 요청했어요. 셔틀이 열리면 알려드릴게요.
        </span>
      );
    }
  }, [
    isDemandClosed,
    isReservationOngoing,
    isDemandFulfilled,
    demand.hasShuttleRoute,
    demand.demandCountOnRegion,
  ]);

  return (
    <Link href={`/event/${demand.eventId}`}>
      <article className="flex flex-col gap-16 px-16 py-24">
        <div>
          <div className="flex items-center justify-between">
            <h5
              className={`pb-[6px] text-18 font-600 ${isDemandClosed ? 'text-basic-grey-500' : ''}`}
            >
              {!isDemandClosed ? '수요조사 완료' : '수요조사 마감'}
            </h5>
            {isReservationOngoing && !isDemandFulfilled && (
              <Button
                variant="primary"
                size="small"
                onClick={() => handleReserveClick(demand.eventId)}
              >
                예약하기
              </Button>
            )}
          </div>
          <p className="text-14 font-500 text-basic-grey-700">
            {descriptionText}
          </p>
          <p className="text-12 font-500 text-basic-grey-400">
            {formattedDemandDate} 수요조사 참여
          </p>
        </div>
        <div className="h-[1.5px] w-full bg-basic-grey-100" />
        <div>
          <div className="flex items-center">
            <h6 className="line-clamp-1 grow text-16 font-600">
              {demand.event.eventName}
            </h6>
            <ArrowRightIcon className="shrink-0" />
          </div>
          <p className="text-12 font-500 text-basic-grey-700">
            {demand.event.eventLocationName}
          </p>
          <p className="text-12 font-500 text-basic-grey-700">
            {formattedEventDate}
          </p>
          <p className="text-14 font-500">
            [{demandRegionHub?.name ?? desiredDemandRegionHub}] 요청
          </p>
        </div>
      </article>
      <div className="h-8 w-full bg-basic-grey-50" />
    </Link>
  );
};

export default DemandCard;
