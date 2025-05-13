'use client';

import { dateString } from '@/utils/dateString.util';
import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import ArrowRightIcon from '../icons/arrow-right.svg';
import Link from 'next/link';
import { useMemo } from 'react';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';

interface Props {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
}

const AlertRequestCard = ({ alertRequest }: Props) => {
  const router = useRouter();

  const event = alertRequest.shuttleRoute.event;
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === alertRequest.shuttleRoute.dailyEventId,
  );
  const shuttleRoute = alertRequest.shuttleRoute;
  const hub =
    shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === alertRequest.shuttleRouteHubId,
    ) ||
    alertRequest.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === alertRequest.shuttleRouteHubId,
    );

  const formattedAlertRequestDate = dateString(alertRequest.createdAt, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });
  const eventName = event.eventName;
  const eventLocationName = event.eventLocationName;
  const formattedEventDate = dateString(dailyEvent?.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const hubText = hub ? `[${shuttleRoute.name} - ${hub.name}] 요청` : '';

  const hasEmptySeat = shuttleRoute.remainingSeatCount > 0;
  const isReservationEnded = shuttleRoute.status !== 'OPEN';

  const { status, description } = useMemo(() => {
    if (isReservationEnded) {
      return {
        status: '마감',
        description: '예약이 마감되었어요.',
      };
    }
    if (hasEmptySeat) {
      return {
        status: '예약 가능',
        description: '빈자리가 생겼어요. 지금 바로 예약하세요!',
      };
    }
    return {
      status: '알림 받는 중',
      description: '예약 가능한 자리가 생기면 바로 알려드릴게요.',
    };
  }, [hasEmptySeat, isReservationEnded]);

  return (
    <Link href={`/event/${event.eventId}`}>
      <article className="flex flex-col gap-16 px-16 py-24">
        <div>
          <div className="flex h-32 items-center justify-between">
            <div className="flex items-center gap-8 pb-[6px]">
              <h5 className="text-18 font-600">빈자리 알림 요청</h5>
              <p
                className={`text-14 font-500 ${
                  isReservationEnded
                    ? 'text-basic-grey-700'
                    : 'text-brand-primary-400'
                }`}
              >
                {status}
              </p>
            </div>
            <div>
              {!isReservationEnded && !hasEmptySeat && (
                <Button variant="s-destructive" size="small">
                  취소하기
                </Button>
              )}
              {!isReservationEnded && hasEmptySeat && (
                <div className="flex items-center gap-8">
                  <Button variant="tertiary" size="small">
                    알림 취소
                  </Button>
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => {
                      router.push(`/event/${event.eventId}`);
                    }}
                  >
                    예약하기
                  </Button>
                </div>
              )}
              {isReservationEnded && (
                <Button variant="primary" size="small" disabled>
                  예약하기
                </Button>
              )}
            </div>
          </div>
          <p className="text-14 font-500 text-basic-grey-700">{description}</p>
          <p className="text-12 font-500 text-basic-grey-400">
            {formattedAlertRequestDate} 빈자리 알림 신청
          </p>
        </div>
        <div className="h-[1.5px] w-full bg-basic-grey-100" />
        <div>
          <div className="flex items-center">
            <h6 className="line-clamp-1 grow text-16 font-600">{eventName}</h6>
            <ArrowRightIcon className="shrink-0" />
          </div>
          <p className="text-12 font-500 text-basic-grey-700">
            {eventLocationName}
          </p>
          <p className="text-12 font-500 text-basic-grey-700">
            {formattedEventDate}
          </p>
          <p className="text-12 font-500 text-basic-grey-700">{hubText}</p>
        </div>
      </article>
      <div className="h-8 w-full bg-basic-grey-50" />
    </Link>
  );
};

export default AlertRequestCard;
