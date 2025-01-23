'use client';

import DetailRow from '../DetailRow';
import Section from '../Section';
import { dateString } from '@/utils/dateString.util';
import { parsePhoneNumber } from '@/utils/common.util';
import {
  HANDY_STATUS_TO_STRING,
  TRIP_STATUS_TO_STRING,
} from '@/constants/status';
import { HandyStatus, Reservation } from '@/types/user-management.type';

interface Props {
  reservation: Reservation;
  handyStatus?: HandyStatus;
  isExpandable?: boolean;
  hideApplyHandy?: boolean;
}

const ReservationInfoSection = ({
  reservation,
  isExpandable = false,
}: Props) => {
  const tripText = TRIP_STATUS_TO_STRING[reservation.type];
  const showToDestination =
    reservation.type === 'TO_DESTINATION' || reservation.type === 'ROUND_TRIP';
  const showFromDestination =
    reservation.type === 'FROM_DESTINATION' ||
    reservation.type === 'ROUND_TRIP';
  const toDestinationLocation =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) =>
        hub.shuttleRouteHubId === reservation.toDestinationShuttleRouteHubId,
    )?.name;
  const fromDestinationLocation =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) =>
        hub.shuttleRouteHubId === reservation.fromDestinationShuttleRouteHubId,
    )?.name;
  const handyTagText = HANDY_STATUS_TO_STRING[reservation.handyStatus];
  const parsedDate = dateString(
    reservation.shuttleRoute.event.dailyEvents.find(
      (dailyEvent) =>
        dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
    )?.date,
  );

  return (
    <>
      <Section title="예약 정보" isExpandable={isExpandable}>
        <div className="flex flex-col gap-28">
          <section className="flex flex-col gap-8">
            <DetailRow title="탑승일" content={parsedDate} />
            <DetailRow
              title="노선 종류"
              content={reservation.shuttleRoute.name}
            />
            <DetailRow title="왕복 여부" content={tripText} />
            {showToDestination && toDestinationLocation && (
              <DetailRow
                title={
                  <>
                    탑승 장소
                    <br />
                    <span className="text-14">(콘서트행)</span>
                  </>
                }
                content={toDestinationLocation}
              />
            )}
            {showFromDestination && fromDestinationLocation && (
              <DetailRow
                title={
                  <>
                    하차 장소
                    <br />
                    <span className="text-14">(귀가행)</span>
                  </>
                }
                content={fromDestinationLocation}
              />
            )}
            <DetailRow
              title="탑승객 수"
              content={`${reservation.passengers?.length ?? 0}명`}
            />
          </section>
          {reservation.passengers?.map((passenger, index) => (
            <Passenger
              key={index}
              index={index + 1}
              name={passenger.passengerName}
              phoneNumber={parsePhoneNumber(passenger.passengerPhoneNumber)}
              tagText={index === 0 ? handyTagText : undefined}
            />
          ))}
        </div>
      </Section>
    </>
  );
};

export default ReservationInfoSection;

interface PassengerProps {
  index: number;
  name: string;
  phoneNumber: string;
  tagText?: string;
}

const Passenger = ({ index, name, phoneNumber, tagText }: PassengerProps) => {
  return (
    <section className="flex flex-col gap-8">
      <h4 className="flex items-center gap-8 pb-4 text-18 font-500 text-grey-700">
        탑승객 {index}
        {tagText && (
          <div className="rounded-full border border-grey-100 px-8 text-12 font-400 text-grey-600-sub">
            {tagText}
          </div>
        )}
      </h4>
      <DetailRow title="이름" content={name} />
      <DetailRow title="전화번호" content={phoneNumber} />
    </section>
  );
};
