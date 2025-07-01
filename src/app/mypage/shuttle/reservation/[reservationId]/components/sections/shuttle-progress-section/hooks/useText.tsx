import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import { useCallback, useMemo } from 'react';

interface Props {
  reservationProgress: ReservationProgress;
  isOpenChatLinkCreated: boolean;
  isHandy: boolean;
  isTaxiRoute: boolean;
}

const useText = ({
  reservationProgress,
  isOpenChatLinkCreated,
  isHandy,
  isTaxiRoute,
}: Props) => {
  const getShuttleBusProgressText = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      return '배차 중';
    } else if (
      reservationProgress === 'afterBusAssigned' &&
      !isOpenChatLinkCreated
    ) {
      return '배차 완료';
    } else if (
      reservationProgress === 'afterBusAssigned' &&
      isOpenChatLinkCreated
    ) {
      return '채팅방 입장';
    }
    return '채팅방 입장';
  }, [reservationProgress, isOpenChatLinkCreated]);

  const getShuttleBusDescriptionText = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      return '함께 갈 인원과 배차 정보를 확인 중이에요. 버스와 인원이 정해지면, 오픈채팅방 링크와 함께 안내드릴게요. ';
    } else if (
      reservationProgress === 'afterBusAssigned' &&
      isHandy &&
      !isOpenChatLinkCreated
    ) {
      return '핸디의 첫번째 미션! 채팅방을 만들어주세요. 오픈채팅방 링크를 추가하면 탑승객을 초대할게요.';
    } else if (
      reservationProgress === 'afterBusAssigned' &&
      isHandy &&
      isOpenChatLinkCreated
    ) {
      return '잘 하셨어요! 오픈채팅방에 탑승객들을 초대했어요. 자유롭게 이야기를 나눠보세요.';
    } else if (
      reservationProgress === 'afterBusAssigned' &&
      !isHandy &&
      !isOpenChatLinkCreated
    ) {
      return '배차가 완료되었어요. 함께 가는 분들을 위해 핸디가 채팅방을 만들고 있어요. 조금만 기다려주세요!';
    } else if (
      reservationProgress === 'afterBusAssigned' &&
      !isHandy &&
      isOpenChatLinkCreated
    ) {
      return '오픈채팅방이 열렸어요. 함께 가는 분들과 인사를 나누고 자유롭게 소통해 보세요.';
    } else if (reservationProgress === 'shuttleEnded') {
      return '종료된 셔틀이에요.';
    }
    return '';
  }, [reservationProgress, isOpenChatLinkCreated, isHandy]);

  const getTaxiRouteProgressText = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      return '배차 중';
    } else {
      return '배차 완료';
    }
  }, [reservationProgress]);

  const getTaxiRouteDescriptionText = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      return '함께 갈 인원과 배차 정보를 확인 중이에요.';
    } else if (reservationProgress === 'afterBusAssigned') {
      return '배차가 확정되었어요. 탑승 관련 정보는 카카오톡에서도 확인할 수 있어요.';
    } else if (reservationProgress === 'shuttleEnded') {
      return '종료된 핸디팟이에요.';
    }
    return '';
  }, [reservationProgress]);

  const progressText = useMemo(() => {
    if (isTaxiRoute) {
      return getTaxiRouteProgressText();
    }
    return getShuttleBusProgressText();
  }, [isTaxiRoute, getTaxiRouteProgressText, getShuttleBusProgressText]);

  const descriptionText = useMemo(() => {
    if (isTaxiRoute) {
      return getTaxiRouteDescriptionText();
    }
    return getShuttleBusDescriptionText();
  }, [isTaxiRoute, getTaxiRouteDescriptionText, getShuttleBusDescriptionText]);

  return { progressText, descriptionText };
};

export default useText;
