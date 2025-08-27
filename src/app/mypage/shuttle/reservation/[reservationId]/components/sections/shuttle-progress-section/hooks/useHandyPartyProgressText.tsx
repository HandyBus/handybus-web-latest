import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import { useCallback, useMemo } from 'react';

interface Props {
  reservationProgress: ReservationProgress;
}

const useHandyPartyProgressText = ({ reservationProgress }: Props) => {
  const getTaxiRouteProgressText = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      return '배차 중';
    } else {
      return '배차 완료';
    }
  }, [reservationProgress]);

  const getHandyPartyDescriptionText = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      return '함께 갈 인원과 배차 정보를 확인 중이에요.';
    } else if (
      reservationProgress === 'afterBusAssigned' ||
      reservationProgress === 'reviewAvailable'
    ) {
      return '배차가 확정되었어요. 탑승 관련 정보는 카카오톡에서도 확인할 수 있어요.';
    } else if (reservationProgress === 'shuttleEnded') {
      return '종료된 핸디팟이에요.';
    }
    return '';
  }, [reservationProgress]);

  const progressText = useMemo(() => {
    return getTaxiRouteProgressText();
  }, [getTaxiRouteProgressText]);

  const descriptionText = useMemo(() => {
    return getHandyPartyDescriptionText();
  }, [getHandyPartyDescriptionText]);

  return { progressText, descriptionText };
};

export default useHandyPartyProgressText;
