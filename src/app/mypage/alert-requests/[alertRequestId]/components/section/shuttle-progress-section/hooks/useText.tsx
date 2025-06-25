import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import { useMemo } from 'react';

interface Props {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
}

const useText = ({ alertRequest }: Props) => {
  const shuttleRoute = alertRequest.shuttleRoute;
  const hasEmptySeat =
    alertRequest.notifiedAt !== null && shuttleRoute.remainingSeatCount > 0;
  const isReservationEnded = shuttleRoute.status !== 'OPEN';

  const text = useMemo(() => {
    if (isReservationEnded && !hasEmptySeat) {
      return {
        progressText: (
          <span className="text-brand-primary-400">
            예약 가능한 자리가 생겼어요
          </span>
        ),
        descriptionText:
          '빈자리가 생겼어요. 지금 바로 예약하세요! 알림 요청 여부와 상관없이 예약은 선착순으로 진행되고 있어요. 빈 자리가 사라지면 기존 대기 번호로 돌아가요.',
      };
    } else {
      return {
        progressText: `${alertRequest.queueIndex}번째로 대기중이에요`,
        descriptionText:
          '대기 순서에 따라 알림을 보내드리고 있어요. 알림 요청 여부와 상관없이 예약은 선착순으로 진행되고 있어요.',
      };
    }
  }, [alertRequest, isReservationEnded, hasEmptySeat]);

  return text;
};

export default useText;
