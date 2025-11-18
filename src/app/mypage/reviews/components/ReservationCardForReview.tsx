'use client';

import { dateString } from '@/utils/dateString.util';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { EventsViewEntity } from '@/types/event.type';
import { DailyEventsInEventsViewEntity } from '@/types/event.type';
import Image from 'next/image';
import { DEFAULT_EVENT_IMAGE } from '@/constants/common';
import Badge from '@/components/badge/Badge';
import { getHubText } from '@/utils/event.util';
import { customTwMerge } from 'tailwind.config';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import Button from '@/components/buttons/button/Button';
import { useFlow } from '@/stacks';

interface Props {
  reservation: ReservationsViewEntity;
  event: EventsViewEntity;
  dailyEvent: DailyEventsInEventsViewEntity;
}

const ReservationCardForReview = ({
  reservation,
  event,
  dailyEvent,
}: Props) => {
  const { leftDays, reviewDeadline } = checkIsReviewWritingPeriod(reservation);
  const formattedReviewDeadline = dateString(reviewDeadline, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const formattedEventDate = dateString(dailyEvent.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const hubText = getHubText(reservation);
  const tripTypeText = TRIP_STATUS_TO_STRING[reservation.type];

  const flow = useFlow();
  const redirectToWriteReview = handleClickAndStopPropagation(() => {
    flow.push('WriteReview', { reservationId: reservation.reservationId });
  });

  return (
    <div className="flex w-full flex-col rounded-12 border border-basic-grey-200 bg-basic-white p-16 text-left">
      <div className="flex h-[22px] w-full items-center justify-between gap-12">
        <h4 className="text-14 font-600 leading-[160%] text-basic-grey-700">
          작성기한 : {formattedReviewDeadline}
        </h4>
        <Badge
          className={customTwMerge(
            'border border-basic-grey-200 text-10 font-600 text-basic-grey-700',
            leftDays === 0 && 'border-basic-red-400 text-basic-red-400',
          )}
        >
          {leftDays === 0 ? '오늘 마감' : `D-${leftDays}`}
        </Badge>
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
        <button
          type="button"
          className="flex grow flex-col pl-12 text-left"
          onClick={redirectToWriteReview}
        >
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
        </button>
      </div>
      <div className="mt-16">
        <Button
          type="button"
          variant="primary"
          size="large"
          onClick={redirectToWriteReview}
        >
          후기 작성하기
        </Button>
      </div>
    </div>
  );
};

export default ReservationCardForReview;
