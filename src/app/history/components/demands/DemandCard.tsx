'use client';

import { dateString } from '@/utils/dateString.util';
import { EventsViewEntity } from '@/types/event.type';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import Image from 'next/image';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import Badge from '@/components/badge/Badge';
import ArrowRightIcon from '../../icons/arrow-right.svg';
import { customTwMerge } from 'tailwind.config';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import Button from '@/components/buttons/button/Button';
import useAppRouter from '@/hooks/useAppRouter';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import Tooltip from '@/components/tooltip/Tooltip';

interface Props {
  demand: ShuttleDemandsViewEntity;
  event: EventsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity;
}

// TODO: 수요조사 취소 관련 대응
const DemandCard = ({ demand, event, dailyEvent }: Props) => {
  const formattedDemandDate = dateString(demand.createdAt, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });
  const formattedEventDate = dateString(dailyEvent.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const tripTypeText = TRIP_STATUS_TO_STRING[demand.type];
  const demandStatusText =
    event.eventStatus === 'OPEN' ? '수요조사 완료' : '수요조사 마감';

  const demandRegionHub =
    demand.toDestinationRegionHub ?? demand.fromDestinationRegionHub;
  // NOTE: 기존에 기타로 수요조사를 한 유저들을 위한 호환성 코드. V2부터 기타로 수요조사가 불가하도록 변경됨.
  const desiredDemandRegionHub =
    demand.desiredToDestinationRegionHub ??
    demand.desiredFromDestinationRegionHub;

  const isDemandFulfilled = demand.status === 'FULFILLED';
  const isShuttleRouteCreated = demand.hasShuttleRoute;

  const showDemandCount =
    event.eventStatus === 'OPEN' &&
    !isDemandFulfilled &&
    !isShuttleRouteCreated;
  const showReservationCTA =
    (event.eventStatus === 'OPEN' || event.eventStatus === 'CLOSED') &&
    !isDemandFulfilled &&
    isShuttleRouteCreated;

  const router = useAppRouter();
  const handleDemandCardClick = handleClickAndStopPropagation(() => {
    router.push(`/history/demand/${demand.shuttleDemandId}`);
  });
  const handleReservationCTAClick = handleClickAndStopPropagation(() => {
    router.push(`/event/${event.eventId}`);
  });

  return (
    <button
      type="button"
      onClick={handleDemandCardClick}
      disabled={
        event.eventStatus === 'ENDED' || event.eventStatus === 'INACTIVE'
      }
      className="flex w-full flex-col rounded-12 border border-basic-grey-200 bg-basic-white p-16 text-left"
    >
      <div className="flex w-full">
        <div className="flex grow flex-col">
          <h4
            className={customTwMerge(
              'h-28 whitespace-nowrap break-keep text-18 font-600 leading-[160%]',
              event.eventStatus === 'OPEN' && 'text-brand-primary-400',
              event.eventStatus === 'CLOSED' && 'text-basic-black',
              (event.eventStatus === 'ENDED' ||
                event.eventStatus === 'INACTIVE') &&
                'text-basic-grey-500',
            )}
          >
            {demandStatusText}
            {isDemandFulfilled && (
              <Badge className="ml-[6px] border border-basic-grey-200 text-basic-grey-700">
                예약 완료
              </Badge>
            )}
          </h4>
          <p className="h-[19px] whitespace-nowrap break-keep text-12 font-500 leading-[160%] text-basic-grey-400">
            {formattedDemandDate} 수요조사 참여
          </p>
        </div>
        {(event.eventStatus === 'OPEN' || event.eventStatus === 'CLOSED') && (
          <div className="w-24 shrink-0">
            <ArrowRightIcon />
          </div>
        )}
      </div>
      <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
      <div className="flex gap-12">
        <div className="relative h-[70px] w-52 shrink-0 overflow-hidden rounded-4">
          <Image
            src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt={`${event.eventName} 행사 포스터`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h5 className="line-clamp-1 h-[23px] text-16 font-600 leading-[140%]">
            {event.eventName}
          </h5>
          <p className="flex h-[22px] items-center gap-[6px] whitespace-nowrap break-keep text-14 font-500 leading-[160%] text-basic-grey-700">
            {formattedEventDate}
          </p>
          <p className="line-clamp-1 flex h-24 items-center gap-4 text-14 font-500 leading-[160%] text-basic-grey-700">
            {demandRegionHub?.name ?? desiredDemandRegionHub} {tripTypeText}{' '}
            요청
          </p>
        </div>
      </div>
      {showDemandCount && (
        <>
          <div className="my-8 h-[1px] w-full bg-basic-grey-100" />
          <div className="flex h-[22px] items-center justify-between">
            <div className="flex items-center">
              <span className="text-14 font-600 leading-[160%] text-basic-grey-700">
                신청 인원
              </span>
              <Tooltip content="셔틀 개설 기준은 행사마다 달라져요. 인원 수 기준은 따로 제공되지 않는 점 양해 부탁드려요." />
            </div>
            <div className="text-14 font-600 leading-[160%] text-basic-grey-700">
              {demand.demandCountOnRegion} 명
            </div>
          </div>
        </>
      )}
      {showReservationCTA && (
        <div className="mt-16">
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={handleReservationCTAClick}
          >
            예약하기
          </Button>
        </div>
      )}
    </button>
  );
};

export default DemandCard;
