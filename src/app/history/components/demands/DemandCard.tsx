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
import { handleClickAndStopPropagation } from '@/utils/common.util';
import Tooltip from '@/components/tooltip/Tooltip';
import { useRouter } from 'next/navigation';

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
    demand.status === 'CANCELLED'
      ? '수요조사 취소'
      : dailyEvent.status === 'OPEN' || dailyEvent.status === 'CLOSED'
        ? '수요조사 완료'
        : '수요조사 마감';

  const demandRegionHub =
    demand.toDestinationRegionHub ?? demand.fromDestinationRegionHub;
  // NOTE: 기존에 기타로 수요조사를 한 유저들을 위한 호환성 코드. V2부터 기타로 수요조사가 불가하도록 변경됨.
  const desiredDemandRegionHub =
    demand.desiredToDestinationRegionHub ??
    demand.desiredFromDestinationRegionHub;

  const isDemandFulfilled = demand.isFulfilled;
  const isDemandCancelled = demand.status === 'CANCELLED';
  const isShuttleRouteCreatedInDemandHub = demand.hasShuttleRoute;
  const isShuttleRouteCreatedOnlyInRelatedRegion =
    demand.hasShuttleRouteInRelatedRegion && !demand.hasShuttleRoute;

  const showDemandCount =
    dailyEvent.status === 'OPEN' &&
    !isDemandFulfilled &&
    !isDemandCancelled &&
    !isShuttleRouteCreatedInDemandHub &&
    !isShuttleRouteCreatedOnlyInRelatedRegion;
  const showShuttleRouteCreatedInDemandHubCTA =
    (dailyEvent.status === 'OPEN' || dailyEvent.status === 'CLOSED') &&
    !isDemandFulfilled &&
    !isDemandCancelled &&
    isShuttleRouteCreatedInDemandHub &&
    !isShuttleRouteCreatedOnlyInRelatedRegion;
  const showShuttleRouteCreatedOnlyInRelatedRegionCTA =
    (dailyEvent.status === 'OPEN' || dailyEvent.status === 'CLOSED') &&
    !isDemandFulfilled &&
    !isDemandCancelled &&
    !isShuttleRouteCreatedInDemandHub &&
    isShuttleRouteCreatedOnlyInRelatedRegion;

  const ableToRedirectToDemandDetail =
    (dailyEvent.status === 'OPEN' || dailyEvent.status === 'CLOSED') &&
    !isDemandCancelled;

  const router = useRouter();
  const redirectToDemandDetail = handleClickAndStopPropagation(() => {
    router.push(`/history/demand/${demand.shuttleDemandId}`);
  });
  const redirectToEventDetail = handleClickAndStopPropagation(() => {
    router.push(`/event/${event.eventId}`);
  });

  return (
    <div className="flex w-full flex-col rounded-12 border border-basic-grey-200 bg-basic-white p-16 text-left">
      <div className="flex w-full">
        <div className="flex grow flex-col">
          <h4
            className={customTwMerge(
              'flex h-28 items-center gap-[6px] whitespace-nowrap break-keep text-18 font-600 leading-[160%]',
              demand.status === 'SUBMITTED' &&
                'OPEN' &&
                'text-brand-primary-400',
              demand.status === 'SUBMITTED' &&
                dailyEvent.status === 'CLOSED' &&
                'text-basic-black',
              demand.status === 'SUBMITTED' &&
                (dailyEvent.status === 'ENDED' ||
                  dailyEvent.status === 'INACTIVE') &&
                'text-basic-grey-500',
              demand.status === 'CANCELLED' && 'text-basic-red-400',
            )}
          >
            {demandStatusText}
            {isDemandFulfilled && !isDemandCancelled && (
              <Badge className="border border-basic-grey-200 text-basic-grey-700">
                예약 완료
              </Badge>
            )}
          </h4>
          <p className="h-[19px] whitespace-nowrap break-keep text-12 font-500 leading-[160%] text-basic-grey-400">
            {formattedDemandDate} 수요조사 참여
          </p>
        </div>
        {ableToRedirectToDemandDetail && (
          <div className="w-24 shrink-0">
            <button
              type="button"
              className="w-full"
              onClick={redirectToDemandDetail}
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}
      </div>
      <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
      {showShuttleRouteCreatedOnlyInRelatedRegionCTA && (
        <div className="mb-12 flex h-[26px] items-center text-16 font-600 leading-[160%] text-basic-grey-700">
          인근 정류장이 열렸어요
          <Tooltip content="내가 요청한 정류장이 포함된 지역에서 예약이 가능한 셔틀이 있어요." />
        </div>
      )}
      <div className="flex">
        <div className="relative h-[70px] w-52 shrink-0 overflow-hidden rounded-4">
          <Image
            src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
            alt={`${event.eventName} 행사 포스터`}
            fill
            className="object-cover"
          />
        </div>
        <button
          type="button"
          className="flex grow flex-col pl-12 text-left"
          disabled={!ableToRedirectToDemandDetail}
          onClick={redirectToDemandDetail}
        >
          <h5 className="line-clamp-1 h-[23px] text-16 font-600 leading-[140%]">
            {event.eventName}
          </h5>
          <p className="flex h-[22px] items-center gap-[6px] whitespace-nowrap break-keep text-14 font-500 leading-[160%] text-basic-grey-700">
            {formattedEventDate}
          </p>
          <p className="line-clamp-1 flex h-24 items-center gap-4 text-14 font-500 leading-[160%] text-basic-grey-700">
            <Badge className="border border-basic-grey-200 text-basic-grey-700">
              {tripTypeText}
            </Badge>
            {demandRegionHub?.name ?? desiredDemandRegionHub} 요청
          </p>
        </button>
      </div>
      {showDemandCount && (
        <>
          <div className="my-8 h-[1px] w-full bg-basic-grey-100" />
          <div className="flex h-[22px] items-center justify-between">
            <div className="flex items-center">
              <span className="text-14 font-600 leading-[160%] text-basic-grey-700">
                신청 인원
              </span>
              <Tooltip content="신청 인원은 동일한 행사에서 같은 지역을 신청한 인원을 의미해요." />
            </div>
            <div className="text-14 font-600 leading-[160%] text-basic-grey-700">
              {demand.demandCountOnRegion} 명
            </div>
          </div>
        </>
      )}
      {showShuttleRouteCreatedInDemandHubCTA && (
        <div className="mt-16">
          <Button
            type="button"
            variant="primary"
            size="large"
            onClick={redirectToEventDetail}
          >
            예약하기
          </Button>
        </div>
      )}
      {showShuttleRouteCreatedOnlyInRelatedRegionCTA && (
        <div className="mt-16">
          <Button
            type="button"
            variant="secondary"
            size="large"
            onClick={redirectToEventDetail}
          >
            인근 정류장 확인하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default DemandCard;
