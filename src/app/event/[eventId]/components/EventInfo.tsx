'use client';

import Badge from '@/components/badge/Badge';
import { EventsViewEntity } from '@/types/event.type';
import { dateString } from '@/utils/dateString.util';
import { getPhaseAndEnabledStatus } from '@/utils/event.util';

export const HANDY_PARTY_AREA_GUIDE_ID = 'handy-party-area-guide';

interface Props {
  event: EventsViewEntity;
  isReservationClosingSoon: boolean;
}

const EventInfo = ({ event, isReservationClosingSoon }: Props) => {
  const parsedDateString = dateString(
    event.dailyEvents.map((v) => v.date),
    {
      showWeekday: false,
    },
  );

  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);

  return (
    <>
      <div
        id={HANDY_PARTY_AREA_GUIDE_ID}
        className="hidden bg-basic-grey-50 p-16 px-16 py-8 text-12 font-500 leading-[160%] text-basic-grey-700"
      />
      <section className="flex flex-col px-16 py-24">
        <h1 className="mb-4 text-20 font-700">{event.eventName}</h1>
        <h3 className="mb-[2px] text-16 font-500 text-basic-grey-700">
          {parsedDateString}
        </h3>
        <h4 className="mb-4 text-16 font-500 text-basic-grey-500">
          {event.eventLocationName}
        </h4>
        {enabledStatus === 'enabled' &&
          (phase === 'reservation' ? (
            <div className="flex items-center gap-4">
              <h5 className="text-20 font-600">
                {event.eventMinRoutePrice?.toLocaleString()}원~
              </h5>
              {isReservationClosingSoon && (
                <Badge className="bg-basic-red-100 text-basic-red-400">
                  마감임박
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-20 font-600 text-basic-grey-500">
                판매 대기
              </span>
              <Badge className="bg-basic-blue-100 text-basic-blue-400">
                수요조사 진행 중
              </Badge>
            </div>
          ))}
        {enabledStatus === 'disabled' &&
          (phase === 'reservation' ? (
            <span className="text-20 font-600 text-basic-grey-500">
              예약 마감
            </span>
          ) : (
            <span className="text-20 font-600 text-basic-grey-500">
              수요조사 불가
            </span>
          ))}
      </section>
    </>
  );
};

export default EventInfo;
