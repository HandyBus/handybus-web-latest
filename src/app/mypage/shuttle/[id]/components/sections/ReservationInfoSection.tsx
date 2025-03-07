'use client';

import DetailRow from '../DetailRow';
import Section from '../Section';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { HandyStatus, ReservationsViewEntity } from '@/types/reservation.type';
import { getBoardingTime } from '@/utils/common.util';
import { dateString } from '@/utils/dateString.util';

interface Props {
  reservation: ReservationsViewEntity;
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
  const boardingTime = getBoardingTime({
    tripType: reservation.type,
    toDestinationShuttleRouteHubs:
      reservation.shuttleRoute.toDestinationShuttleRouteHubs ?? [],
    fromDestinationShuttleRouteHubs:
      reservation.shuttleRoute.fromDestinationShuttleRouteHubs ?? [],
    toDestinationShuttleRouteHubId:
      reservation.toDestinationShuttleRouteHubId ?? '',
  });
  const parsedBoardingTime = boardingTime
    ? dateString(boardingTime, { showTime: true })
    : '';

  return (
    <>
      <Section title="예약 정보" isExpandable={isExpandable}>
        <div className="flex flex-col gap-28">
          <section className="flex flex-col gap-8">
            <DetailRow title="탑승 시간" content={parsedBoardingTime} />
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
                    <span className="text-14">(가는 편)</span>
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
                    <span className="text-14">(오는 편)</span>
                  </>
                }
                content={fromDestinationLocation}
              />
            )}
            <DetailRow
              title="탑승객 수"
              content={`${reservation.passengerCount ?? 0}명`}
            />
          </section>
        </div>
      </Section>
    </>
  );
};

export default ReservationInfoSection;
