'use client';

import { dateString } from '@/utils/dateString.util';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { EventsViewEntity } from '@/types/event.type';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import Image from 'next/image';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import Badge from '@/components/badge/Badge';
import ArrowRightIcon from '../../icons/arrow-right-black.svg';
import { getHubText } from '@/utils/event.util';
import { customTwMerge } from 'tailwind.config';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { checkIsHandyParty } from '@/utils/handyParty.util';
import { useRouter } from 'next/navigation';

interface Props {
  reservation: ReservationsViewEntity;
  event: EventsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity;
}

// NOTE: 비활성화 된 예약은 처리하지 않음. 무산된 행사는 예약 취소로 처리.
const ReservationCard = ({ reservation, event, dailyEvent }: Props) => {
  const formattedReservationDate = dateString(reservation.createdAt, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });
  // TODO: 여기 수령 날짜를 예약 취소를 고려하여 reservationTransferRequest.updatedAt로 변경해야 함.
  const formattedReservationTransferredDate = dateString(
    reservation.updatedAt,
    {
      showYear: true,
      showDate: true,
      showTime: true,
      showWeekday: true,
    },
  );
  const formattedEventDate = dateString(dailyEvent.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const hubText = getHubText(reservation);
  const tripTypeText = TRIP_STATUS_TO_STRING[reservation.type];
  const reservationStatusText =
    reservation.reservationStatus === 'CANCEL'
      ? '예약 취소'
      : reservation.reservationStatus === 'COMPLETE_PAYMENT' &&
          event.eventStatus === 'ENDED'
        ? '셔틀 종료'
        : '예약 완료';

  const isHandyParty = checkIsHandyParty(reservation.shuttleRoute);
  const isTransferredReservation =
    reservation.originalUserId !== reservation.userId;

  const router = useRouter();
  const redirectToReservationDetail = handleClickAndStopPropagation(() => {
    router.push(`/history/reservation/${reservation.reservationId}`);
  });

  return (
    <div className="rounded-12 border border-basic-grey-200 bg-basic-white p-16">
      <button
        type="button"
        className="flex w-full flex-col gap-12 text-left"
        onClick={redirectToReservationDetail}
      >
        <div className="flex w-full">
          <div className="flex grow flex-col">
            <h4
              className={customTwMerge(
                'flex h-28 items-center gap-[6px] whitespace-nowrap break-keep text-18 font-600 leading-[160%]',
                reservation.reservationStatus === 'COMPLETE_PAYMENT' &&
                  'text-brand-primary-400',
                reservation.reservationStatus === 'CANCEL' &&
                  'text-basic-red-400',
                reservation.reservationStatus === 'COMPLETE_PAYMENT' &&
                  event.eventStatus === 'ENDED' &&
                  'text-basic-grey-500',
              )}
            >
              {reservationStatusText}
              {isTransferredReservation && (
                <Badge className="border border-basic-grey-200 text-basic-grey-700">
                  받은 탑승권
                </Badge>
              )}
              {isHandyParty && (
                <Badge className="bg-[rgba(0,0,0,0.80)] text-basic-white">
                  핸디팟
                </Badge>
              )}
            </h4>
            <p className="h-[19px] whitespace-nowrap break-keep text-12 font-500 leading-[160%] text-basic-grey-400">
              {isTransferredReservation
                ? `${formattedReservationTransferredDate} 수령`
                : `${formattedReservationDate} 예약`}
            </p>
          </div>
          <div className="w-24 shrink-0">
            <ArrowRightIcon />
          </div>
        </div>
        <div className="h-[1px] w-full bg-basic-grey-100" />
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
              <span>{formattedEventDate}</span>
              <div className="h-[10px] w-[0.8px] bg-[#CCC]" />
              <span>{reservation.passengerCount}인</span>
            </p>
            <p className="flex h-24 items-center gap-4">
              <Badge className="border border-basic-grey-200 text-basic-grey-700">
                {tripTypeText}
              </Badge>
              <span className="line-clamp-1 text-14 font-500 leading-[160%] text-basic-grey-700">
                {hubText}
              </span>
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ReservationCard;
