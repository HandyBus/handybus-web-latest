import dayjs, { Dayjs } from 'dayjs';
import { useScrollDepth } from './useScrollDepth';
import {
  gtagAbandonReservation,
  gtagCompleteReservation,
  gtagEnterReservation,
  ReservationStep,
} from '@/utils/analytics/reservationAnalytics.util';
import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { reservationTrackingMethodsAtom } from './store/reservationTracking.store';

export const EVENT_STEP_TO_RESERVATION_STEP: Record<string, ReservationStep> = {
  '[공통] 일자 선택': 'select_date',
  '[공통] 시/도 선택': 'select_sido',
  '[기타] 상품 선택': 'select_product',
  '[예약] 정류장 선택': 'select_hub',
  '[기타] 복수 노선': 'select_multiple_routes',
  '[예약] 좌석 선택': 'select_trip_type',
  '[예약] 예약 정보': 'hub_info',
  '[핸디팟] 방향 선택': 'handy_party_select_trip_type',
  '[핸디팟] 주소 입력': 'handy_party_select_address',
  '[핸디팟] 지도': 'handy_party_select_map',
  '[핸디팟] 예약 확인': 'handy_party_select_reservation_info',
  '[핸디팟] 이름 입력': 'handy_party_write_name',
  '[기타] 이름 입력': 'write_name',
  '[예약] 결제 페이지': 'payment',
  '[예약] 결제 요청': 'request_payment',
  '[예약] 결제 성공': 'success_payment',
} as const;

interface Props {
  eventId: string;
  eventName: string;
  isBottomSheetOpen: boolean;
  isActive?: boolean;
  reservationStartTime?: string;
  initialStep?: ReservationStep;
}

export const useReservationTracking = ({
  eventId,
  eventName,
  isBottomSheetOpen,
  isActive = true,
  reservationStartTime,
  initialStep,
}: Props) => {
  const { currentScrollDepth, maxScrollDepth } = useScrollDepth();
  const reservationStartTimeRef = useRef<Dayjs | null>(null);
  const currentStepRef = useRef<ReservationStep | null>(initialStep ?? null);
  const isNavigatingRef = useRef<boolean>(false);
  const isNoBottomSheetPage = Boolean(reservationStartTime);

  const [, setReservationTrackingMethods] = useAtom(
    reservationTrackingMethodsAtom,
  );

  const setReservationTrackingStep = useCallback(
    (eventStep: keyof typeof EVENT_STEP_TO_RESERVATION_STEP) => {
      if (!isActive) return;

      const reservationStep = EVENT_STEP_TO_RESERVATION_STEP.hasOwnProperty(
        eventStep,
      )
        ? EVENT_STEP_TO_RESERVATION_STEP[eventStep]
        : undefined;

      if (!reservationStep) {
        return;
      }

      currentStepRef.current = reservationStep;
    },
    [isActive],
  );

  const trackEnterReservation = useCallback(() => {
    if (!isActive) return;
    // 외부에서 전달받은 시작 시간이 있으면 사용, 없으면 현재 시간 사용
    reservationStartTimeRef.current = reservationStartTime
      ? dayjs(reservationStartTime)
      : dayjs();
    gtagEnterReservation(
      eventId,
      eventName,
      currentScrollDepth,
      maxScrollDepth,
    );
  }, [
    eventId,
    eventName,
    isActive,
    reservationStartTime,
    currentScrollDepth,
    maxScrollDepth,
  ]);

  const trackAbandonReservation = useCallback(
    (exitType: 'page_leave' | 'bottom_sheet_close', debug?: string) => {
      if (!isActive) return;
      // 의도적 이동인 경우 모든 이탈 타입에 대해 집계하지 않음
      if (isNavigatingRef.current) {
        return;
      }

      const reservationStartTime = reservationStartTimeRef.current;
      const currentStep = currentStepRef.current;

      if (!reservationStartTime || !currentStep) {
        return;
      }

      const totalTimeMs = dayjs().diff(reservationStartTime, 'ms');
      gtagAbandonReservation(
        eventId,
        eventName,
        currentStep,
        exitType,
        totalTimeMs,
        debug,
      );

      reservationStartTimeRef.current = null;
      currentStepRef.current = null;
    },
    [isActive, eventId, eventName],
  );

  const trackCompleteReservation = useCallback(
    (
      eventDate: string | undefined,
      selectedHubToDestination: string | undefined,
      selectedHubFromDestination: string | undefined,
      tripType: string,
      hasOtherEventReservation: boolean | undefined,
      paymentId: string | undefined,
    ) => {
      if (!isActive) return;
      const reservationStartTime = reservationStartTimeRef.current;

      if (!reservationStartTime) {
        return;
      }

      const totalTimeMs = dayjs().diff(reservationStartTime, 'ms');
      gtagCompleteReservation(
        eventId,
        eventName,
        eventDate,
        selectedHubToDestination,
        selectedHubFromDestination,
        tripType,
        totalTimeMs,
        hasOtherEventReservation,
        paymentId,
      );
    },
    [isActive, eventId, eventName],
  );

  const markAsIntentionalNavigation = useCallback((hasNoTimeout?: boolean) => {
    isNavigatingRef.current = true;

    // 네트워크 이슈 등으로 라우팅 실패했을때를 대비해 5초 후 플래그 리셋
    if (!hasNoTimeout) {
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 5000);
    }
  }, []);

  // 컴포넌트 마운트 시 reservationStartTime이 있으면 설정
  useEffect(() => {
    if (reservationStartTime && !reservationStartTimeRef.current) {
      reservationStartTimeRef.current = dayjs(reservationStartTime);
    }
  }, [reservationStartTime]);

  useEffect(() => {
    if (!isActive) return;

    const handleBeforeUnload = () => {
      trackAbandonReservation('page_leave', '페이지 닫기');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackAbandonReservation('page_leave', '탭전환');
      }
    };

    const handlePopState = () => {
      trackAbandonReservation('page_leave', '뒤로가기');
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // 페이지 닫기 탭닫기, 새로고침, 새로운 URL 입력
    document.addEventListener('visibilitychange', handleVisibilityChange); // 탭전환/최소화
    window.addEventListener('popstate', handlePopState); // 브라우저 뒤로가기/앞으로가기

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
      isNavigatingRef.current = false;
    };
  }, [trackAbandonReservation, isActive]);

  useEffect(() => {
    if (!isActive) return;
    if (!isBottomSheetOpen && !isNoBottomSheetPage) {
      trackAbandonReservation(
        'bottom_sheet_close',
        isNavigatingRef.current ? '의도적 페이지 이동' : '바텀시트 닫기',
      );
    }
  }, [
    isBottomSheetOpen,
    isNoBottomSheetPage,
    trackAbandonReservation,
    isActive,
  ]);

  // 현재 예약 시작 시간을 반환하는 함수
  const getReservationStartTime = useCallback(() => {
    return reservationStartTimeRef.current?.toISOString() || null;
  }, []);

  useEffect(() => {
    if (isActive) {
      setReservationTrackingMethods({
        trackEnterReservation,
        setReservationTrackingStep,
        trackCompleteReservation,
        markAsIntentionalNavigation,
        getReservationStartTime,
      });
    } else {
      setReservationTrackingMethods(null);
    }

    return () => {
      setReservationTrackingMethods(null);
    };
  }, [
    isActive,
    // 메소드들은 useCallback으로 메모이제이션되어 있어서 필요할 때만 변경됨
    trackEnterReservation,
    setReservationTrackingStep,
    trackCompleteReservation,
    markAsIntentionalNavigation,
    getReservationStartTime,
    setReservationTrackingMethods,
  ]);

  return {
    trackEnterReservation,
    setReservationTrackingStep,
    trackCompleteReservation,
    markAsIntentionalNavigation,
    getReservationStartTime,
  };
};
