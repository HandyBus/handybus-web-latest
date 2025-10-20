import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs from 'dayjs';

// 예약에 대하여 리뷰 작성 가능 기간인지 판단
// 왕복 혹은 행사장행 일때 행사장 하차지 시간을 기준으로(귀가행은 귀가행 하차지 시간 기준) 1시간 전부터 행사일 기준 7일 후까지 리뷰 작성 가능
export const checkIsReviewWritingPeriod = (
  reservation: ReservationsViewEntity,
) => {
  const event = reservation.shuttleRoute.event;
  const shuttleRoute = reservation.shuttleRoute;
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) => dailyEvent.dailyEventId === shuttleRoute.dailyEventId,
  );

  if (!dailyEvent) {
    return { isReviewWritingPeriod: false, leftDays: 0 };
  }

  const tripType = reservation.type;
  const selectedFromDestinationShuttleRouteHubId =
    reservation.fromDestinationShuttleRouteHubId;

  const arrivalTime =
    tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
      ? shuttleRoute.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )?.arrivalTime
      : shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) =>
            hub.shuttleRouteHubId === selectedFromDestinationShuttleRouteHubId,
        )?.arrivalTime;

  if (!arrivalTime) {
    return { isReviewWritingPeriod: false, leftDays: 0 };
  }

  const reviewOpenTime = dayjs(arrivalTime)
    .tz('Asia/Seoul')
    .subtract(1, 'hour');
  const reviewClosingTime = dayjs(dailyEvent.date)
    .tz('Asia/Seoul')
    .add(7, 'day');
  const now = dayjs().tz('Asia/Seoul');

  const isReviewWritingPeriod =
    (shuttleRoute.status === 'CLOSED' || shuttleRoute.status === 'ENDED') &&
    now.isAfter(reviewOpenTime) &&
    now.isBefore(reviewClosingTime);

  const leftDays = reviewClosingTime.diff(now, 'day');

  return { isReviewWritingPeriod, leftDays, reviewDeadline: reviewClosingTime };
};
