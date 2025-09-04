'use client';

import { ReservationsViewEntity } from '@/types/reservation.type';
import dayjs from 'dayjs';
import { useMemo } from 'react';

// 편도노선일 경우를 함께 고려하여 검증
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
  const selectedHubNameFromDestination = fromDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
  )?.name;
  if (!selectedHubNameToDestination && !selectedHubNameFromDestination)
    throw new Error('선택한 정류장의 정보가 없습니다.');

  const arrivalHubNameToDestination = toDestinationShuttleRouteHubs?.find(
    (hub) => hub.sequence === toDestinationShuttleRouteHubs?.length,
  )?.name;
  const departureHubNameFromDestination = fromDestinationShuttleRouteHubs?.find(
    (hub) => hub.sequence === 1,
  )?.name;
  if (!arrivalHubNameToDestination && !departureHubNameFromDestination)
    throw new Error('행사장의 정보가 없습니다.');

  const boardingTimeToDestination =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
    )?.arrivalTime;
  const boardingTimeFromDestination =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.sequence === 1,
    )?.arrivalTime;
  if (!boardingTimeToDestination && !boardingTimeFromDestination)
    throw new Error('탑승 시간의 정보가 없습니다.');

  const arrivalTimeToDestination =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.sequence === toDestinationShuttleRouteHubs?.length,
    )?.arrivalTime;
  const arrivalTimeFromDestination =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
    )?.arrivalTime;
  if (!arrivalTimeToDestination && !arrivalTimeFromDestination)
    throw new Error('도착 시간의 정보가 없습니다.');

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

  const userName = reservation.userName || reservation.userNickname;

  const userPhoneNumber = formatPhoneNumber(reservation.userPhoneNumber);

  const passengerCount = reservation.passengerCount;

  const dailyEvent = reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );

  const isSeventeenEvent =
    reservation.shuttleRoute.eventId === '603038379151464486';
  const temporaryNoticeRoomUrl: string | null = useMemo(() => {
    const SHUTTLE_ROUTE_ID_13_대구 = '613618546496246356';
    const SHUTTLE_ROUTE_ID_13_부산 = '613620913623012086';
    const SHUTTLE_ROUTE_ID_13_대전 = '611769613054644567';
    const SHUTTLE_ROUTE_ID_13_천안아산 = '613615679391666718';
    const SHUTTLE_ROUTE_ID_13_청주 = '611771163789496897';
    const OPEN_CHAT_URL_13_대구 = 'https://open.kakao.com/o/gwew7bQh';
    const OPEN_CHAT_URL_13_부산 = 'https://open.kakao.com/o/gp1J7bQh';
    const OPEN_CHAT_URL_13_대전 = 'https://open.kakao.com/o/gaoW7bQh';
    const OPEN_CHAT_URL_13_천안아산 = 'https://open.kakao.com/o/gOF77bQh';
    const OPEN_CHAT_URL_13_청주 = 'https://open.kakao.com/o/grNn8bQh';
    const SHUTTLE_ROUTE_ID_14_대구 = '613623549873099706';
    const SHUTTLE_ROUTE_ID_14_부산 = '613622643945378707';
    const SHUTTLE_ROUTE_ID_14_대전 = '611770340053357083';
    const SHUTTLE_ROUTE_ID_14_천안아산 = '613624012286727144';
    const SHUTTLE_ROUTE_ID_14_청주 = '611771616103240128';
    const OPEN_CHAT_URL_14_대구 = 'https://open.kakao.com/o/gRTC8bQh';
    const OPEN_CHAT_URL_14_부산 = 'https://open.kakao.com/o/gSJS8bQh';
    const OPEN_CHAT_URL_14_대전 = 'https://open.kakao.com/o/gbVe9bQh';
    const OPEN_CHAT_URL_14_천안아산 = 'https://open.kakao.com/o/gZau9bQh';
    const OPEN_CHAT_URL_14_청주 = 'https://open.kakao.com/o/g1QhacQh';

    switch (reservation.shuttleRouteId) {
      // 세븐틴 9/13 노선목록
      case SHUTTLE_ROUTE_ID_13_대구:
        return OPEN_CHAT_URL_13_대구;
      case SHUTTLE_ROUTE_ID_13_부산:
        return OPEN_CHAT_URL_13_부산;
      case SHUTTLE_ROUTE_ID_13_대전:
        return OPEN_CHAT_URL_13_대전;
      case SHUTTLE_ROUTE_ID_13_천안아산:
        return OPEN_CHAT_URL_13_천안아산;
      case SHUTTLE_ROUTE_ID_13_청주:
        return OPEN_CHAT_URL_13_청주;
      // 세븐틴 9/14 노선목록
      case SHUTTLE_ROUTE_ID_14_대구:
        return OPEN_CHAT_URL_14_대구;
      case SHUTTLE_ROUTE_ID_14_부산:
        return OPEN_CHAT_URL_14_부산;
      case SHUTTLE_ROUTE_ID_14_대전:
        return OPEN_CHAT_URL_14_대전;
      case SHUTTLE_ROUTE_ID_14_천안아산:
        return OPEN_CHAT_URL_14_천안아산;
      case SHUTTLE_ROUTE_ID_14_청주:
        return OPEN_CHAT_URL_14_청주;

      default:
        return null;
    }
  }, [reservation.shuttleRouteId]);
  const noticeRoomUrl = isSeventeenEvent
    ? temporaryNoticeRoomUrl
    : dailyEvent?.metadata?.openChatUrl;

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
    userName,
    userPhoneNumber,
    noticeRoomUrl,
    openOpenChatLink,
  };
};

export default useBoardingPassData;

/* 
  핸드폰번호를 한국 형식으로 변환하는 함수
   - +82로 시작하는 경우 제거하고 0으로 시작하도록 변환
   - 11자리인 경우 (01012345678 -> 010-1234-5678)
   - 10자리인 경우 (0101234567 -> 010-123-4567)
   - 변환할 수 없는 경우 원본 반환
*/
const formatPhoneNumber = (phoneNumber: string) => {
  const digits = phoneNumber.replace(/^\+82/, '0').replace(/\D/g, '');

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phoneNumber;
};
