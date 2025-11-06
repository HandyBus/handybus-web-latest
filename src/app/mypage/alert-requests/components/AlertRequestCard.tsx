'use client';

import { dateString } from '@/utils/dateString.util';
import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import ArrowRightIcon from '../icons/arrow-right.svg';
import Button from '@/components/buttons/button/Button';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import Image from 'next/image';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import useBottomSheet from '@/hooks/useBottomSheet';
import CancelAlertRequestBottomSheet from './CancelAlertRequestBottomSheet';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { useRouter } from 'next/navigation';

interface Props {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
}

const AlertRequestCard = ({ alertRequest }: Props) => {
  const event = alertRequest.shuttleRoute.event;
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === alertRequest.shuttleRoute.dailyEventId,
  )!;
  const shuttleRoute = alertRequest.shuttleRoute;
  const toDestinationHubs = shuttleRoute.toDestinationShuttleRouteHubs ?? [];
  const fromDestinationHubs =
    shuttleRoute.fromDestinationShuttleRouteHubs ?? [];
  const destinationHubs = [...toDestinationHubs, ...fromDestinationHubs].reduce(
    (acc, hub) => {
      if (
        hub.role === 'HUB' &&
        !acc.some((h) => h.regionHubId === hub.regionHubId)
      ) {
        acc.push(hub);
      }
      return acc;
    },
    [] as ShuttleRouteHubsInShuttleRoutesViewEntity[],
  );

  const formattedAlertRequestDate = dateString(alertRequest.createdAt, {
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
  const hubText = destinationHubs.map((hub) => hub.name).join(' - ');

  const hasEmptySeat =
    shuttleRoute.remainingSeatCount > 0 &&
    shuttleRoute.remainingSeatType === 'ROUND_TRIP';
  const isReservationEnded = shuttleRoute.status !== 'OPEN';

  const router = useRouter();
  const redirectToAlertRequestDetail = handleClickAndStopPropagation(() => {
    router.push(
      `/mypage/alert-requests/${alertRequest.shuttleRouteAlertRequestId}`,
    );
  });
  const redirectToEventDetail = handleClickAndStopPropagation(() => {
    router.push(`/event/${event.eventId}`);
  });

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <div className="flex w-full flex-col rounded-12 border border-basic-grey-200 bg-basic-white p-16 text-left">
        <button
          type="button"
          className="mb-16 w-full text-left"
          onClick={redirectToAlertRequestDetail}
        >
          <div className="flex w-full">
            <div className="flex grow flex-col">
              <h4 className="flex h-28 items-center gap-[6px] whitespace-nowrap break-keep text-16 font-600 leading-[160%]">
                빈자리 알림 요청
                {!hasEmptySeat && !isReservationEnded && (
                  <span className="text-14 font-500 text-brand-primary-400">
                    {alertRequest.queueIndex}번째로 대기중
                  </span>
                )}
              </h4>
              <p className="h-[19px] whitespace-nowrap break-keep text-12 font-500 leading-[160%] text-basic-grey-400">
                {formattedAlertRequestDate} 요청
              </p>
            </div>
            {!isReservationEnded && (
              <div className="w-24 shrink-0">
                <ArrowRightIcon />
              </div>
            )}
          </div>
          <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
          <div className="flex">
            <div className="relative h-[70px] w-52 shrink-0 overflow-hidden rounded-4">
              <Image
                src={event.eventImageUrl || DEFAULT_EVENT_IMAGE}
                alt={`${event.eventName} 행사 포스터`}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex grow flex-col pl-12 text-left">
              <h5 className="line-clamp-1 h-[23px] text-16 font-600 leading-[140%]">
                {event.eventName}
              </h5>
              <p className="flex h-[22px] items-center gap-[6px] whitespace-nowrap break-keep text-14 font-500 leading-[160%] text-basic-grey-700">
                {formattedEventDate}
              </p>
              {hubText && (
                <p className="flex h-24 items-center gap-[3px] text-14 font-500 leading-[160%] text-basic-grey-700">
                  <span className="line-clamp-1 w-fit">{hubText}</span>
                  <span className="shrink-0">요청</span>
                </p>
              )}
            </div>
          </div>
        </button>
        <div className="flex flex-col gap-12">
          {hasEmptySeat && !isReservationEnded && (
            <Button
              type="button"
              variant="primary"
              size="large"
              onClick={redirectToEventDetail}
            >
              예약하기
            </Button>
          )}
          {!isReservationEnded && (
            <Button
              type="button"
              variant="s-destructive"
              size="large"
              onClick={openBottomSheet}
            >
              취소하기
            </Button>
          )}
          {isReservationEnded && (
            <Button type="button" variant="primary" size="large" disabled>
              예약 마감된 셔틀이에요
            </Button>
          )}
        </div>
      </div>
      <CancelAlertRequestBottomSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        alertRequest={alertRequest}
        closeBottomSheet={closeBottomSheet}
      />
    </>
  );
};

export default AlertRequestCard;
