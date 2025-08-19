import { useAtom } from 'jotai';
import { reservationTrackingMethodsAtom } from './store/reservationTracking.store';

/**
 * 전역 상태에서 예약 추적 메소드들을 사용하는 훅
 *
 * @returns 예약 추적 메소드들
 *
 * @example
 * ```typescript
 * const { trackEnterReservation, setReservationTrackingStep } = useReservationTrackingGlobal();
 *
 * // 예약 시작 추적
 * trackEnterReservation();
 *
 * // 단계 변경 추적
 * setReservationTrackingStep('[예약] 정류장 선택');
 * ```
 */
export const useReservationTrackingGlobal = () => {
  const [reservationTrackingMethods] = useAtom(reservationTrackingMethodsAtom);

  return {
    trackEnterReservation: () => {
      reservationTrackingMethods?.trackEnterReservation?.();
    },
    setReservationTrackingStep: (eventStep: string) => {
      reservationTrackingMethods?.setReservationTrackingStep?.(eventStep);
    },
    trackCompleteReservation: (
      eventDate: string | undefined,
      selectedHubToDestination: string | undefined,
      selectedHubFromDestination: string | undefined,
      tripType: string,
      hasOtherEventReservation: boolean | undefined,
      paymentId: string | undefined,
    ) => {
      reservationTrackingMethods?.trackCompleteReservation?.(
        eventDate,
        selectedHubToDestination,
        selectedHubFromDestination,
        tripType,
        hasOtherEventReservation,
        paymentId,
      );
    },
    markAsIntentionalNavigation: (hasNoTimeout?: boolean) => {
      reservationTrackingMethods?.markAsIntentionalNavigation?.(hasNoTimeout);
    },
    getReservationStartTime: () => {
      return reservationTrackingMethods?.getReservationStartTime?.() || null;
    },
  };
};
