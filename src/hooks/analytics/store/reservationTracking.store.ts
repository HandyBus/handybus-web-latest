import { atom } from 'jotai';

/**
 * 예약 추적 메소드들의 타입 정의
 * 예약 프로세스의 각 단계별 추적 및 관리 기능 제공
 */
export interface ReservationTrackingMethods {
  /** 예약 프로세스 시작 추적 */
  trackEnterReservation: () => void;
  /** 예약 단계 변경 추적 */
  setReservationTrackingStep: (eventStep: string) => void;
  /** 예약 완료 추적 */
  trackCompleteReservation: (
    eventDate: string | undefined,
    selectedHubToDestination: string | undefined,
    selectedHubFromDestination: string | undefined,
    tripType: string,
    hasOtherEventReservation: boolean | undefined,
    paymentId: string | undefined,
    referralCode: string | undefined,
  ) => void;
  /** 의도적 네비게이션 마킹 (이탈 추적 방지용) */
  markAsIntentionalNavigation: (hasNoTimeout?: boolean) => void;
  /** 예약 시작 시간 조회 */
  getReservationStartTime: () => string | null;
}

/**
 * 예약 추적 메소드들을 위한 전역 상태 atom
 * Props drilling 없이 전역에서 예약 추적 기능 사용 가능
 */
export const reservationTrackingMethodsAtom =
  atom<ReservationTrackingMethods | null>(null);
