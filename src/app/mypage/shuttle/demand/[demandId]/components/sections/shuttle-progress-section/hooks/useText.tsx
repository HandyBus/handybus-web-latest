import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import { useMemo } from 'react';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const useText = ({ demand }: Props) => {
  const isReservationOngoing =
    demand.hasShuttleRoute &&
    (demand.status === 'OPEN' ||
      demand.status === 'CLOSED' ||
      demand.status === 'FULFILLED');
  const isDemandFulfilled = demand.status === 'FULFILLED';

  const text = useMemo(() => {
    if (isReservationOngoing && !isDemandFulfilled) {
      return {
        progressText: (
          <span className="text-brand-primary-400">
            요청한 정류장을 예약할 수 있어요
          </span>
        ),
        descriptionText:
          '좌석이 남아있을 때 미리 예약해 주세요. 마감 후엔 빈자리 알림을 통해 예약 가능 여부를 받아보실 수 있어요.',
      };
    } else if (isReservationOngoing && isDemandFulfilled) {
      return {
        progressText: '예약한 셔틀이에요',
        descriptionText:
          '이 행사의 예약 정보는 예약 내역에서 확인할 수 있어요.',
      };
    } else {
      return {
        progressText: `${demand.demandCountOnRegion}명이 요청했어요.`,
        descriptionText:
          '셔틀 개설 기준은 행사마다 달라져요. 인원 수 기준은 따로 제공되지 않는 점 양해 부탁드려요.',
      };
    }
  }, [demand, isReservationOngoing, isDemandFulfilled]);

  return text;
};

export default useText;
