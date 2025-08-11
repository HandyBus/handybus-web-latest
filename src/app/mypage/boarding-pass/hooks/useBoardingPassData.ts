import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs from 'dayjs';

const useBoardingPassData = (reservation: ReservationsViewEntity) => {
  const isRoundTrip = reservation.type === 'ROUND_TRIP';

  const shuttleName = reservation.shuttleRoute.name;
  const fromDestinationShuttleRouteHubs =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs;
  const toDestinationShuttleRouteHubs =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs;

  const selectedHubToDestination = reservation.toDestinationShuttleRouteHubId;
  const selectedHubFromDestination =
    reservation.fromDestinationShuttleRouteHubId;

  const selectedHubNameToDestination = toDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
  )?.name;
  if (!selectedHubNameToDestination)
    throw new Error('가는편 선택한 정류장의 정보가 없습니다.');
  const selectedHubNameFromDestination = fromDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
  )?.name;
  if (!selectedHubNameFromDestination)
    throw new Error('오는편 선택한 정류장의 정보가 없습니다.');

  const arrivalHubNameToDestination = toDestinationShuttleRouteHubs?.find(
    (hub) => hub.sequence === toDestinationShuttleRouteHubs?.length,
  )?.name;
  if (!arrivalHubNameToDestination)
    throw new Error('가는편 도착 정류장의 정보가 없습니다.');
  const departureHubNameFromDestination = fromDestinationShuttleRouteHubs?.find(
    (hub) => hub.sequence === 1,
  )?.name;
  if (!departureHubNameFromDestination)
    throw new Error('오는편 출발 정류장의 정보가 없습니다.');

  const boardingTimeToDestination =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
    )?.arrivalTime;
  if (!boardingTimeToDestination)
    throw new Error('가는편 탑승 시간의 정보가 없습니다.');
  const arrivalTimeToDestination =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.sequence === toDestinationShuttleRouteHubs?.length,
    )?.arrivalTime;
  if (!arrivalTimeToDestination)
    throw new Error('가는편 도착 시간의 정보가 없습니다.');

  const boardingTimeFromDestination =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.sequence === 1,
    )?.arrivalTime;
  if (!boardingTimeFromDestination)
    throw new Error('오는편 탑승 시간의 정보가 없습니다.');
  const arrivalTimeFromDestination =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
    )?.arrivalTime;
  if (!arrivalTimeFromDestination)
    throw new Error('오는편 도착 시간의 정보가 없습니다.');

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const underTenMinutes = minutes < 10;
    return `${hours > 0 ? `${hours}시간 ` : ''}${
      underTenMinutes ? `0${minutes}` : minutes
    }분`;
  };

  const durationToDestination = formatDuration(
    dayjs(arrivalTimeToDestination)
      .startOf('minute')
      .diff(dayjs(boardingTimeToDestination).startOf('minute'), 'minute'),
  );

  const durationFromDestination = formatDuration(
    dayjs(arrivalTimeFromDestination)
      .startOf('minute')
      .diff(dayjs(boardingTimeFromDestination).startOf('minute'), 'minute'),
  );

  const passengerCount = reservation.passengerCount;

  const dailyEvent = reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );
  const noticeRoomUrl = dailyEvent?.metadata?.openChatUrl;

  const openOpenChatLink = () => {
    if (noticeRoomUrl) {
      window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return {
    isRoundTrip,
    shuttleName,
    selectedHubNameToDestination,
    selectedHubNameFromDestination,
    arrivalHubNameToDestination,
    departureHubNameFromDestination,
    boardingTimeToDestination,
    arrivalTimeToDestination,
    boardingTimeFromDestination,
    arrivalTimeFromDestination,
    durationToDestination,
    durationFromDestination,
    passengerCount,
    noticeRoomUrl,
    openOpenChatLink,
  };
};

export default useBoardingPassData;
