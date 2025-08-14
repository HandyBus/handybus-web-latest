import dayjs, { Dayjs } from 'dayjs';
import { useScrollDepth } from './useScrollDepth';
import {
  gtagAbandonReservation,
  gtagCompleteReservation,
  gtagEnterReservation,
  ReservationStep,
} from '@/utils/analytics/reservationAnalytics.util';
import { useEffect, useRef } from 'react';
import { EVENT_STEPS } from '@/app/event/[eventId]/form.const';

const EVENT_STEP_TO_RESERVATION_STEP: Record<string, ReservationStep> = {
  '[공통] 일자 선택': 'select_date',
  '[공통] 시/도 선택': 'select_sido',
  '[예약] 정류장 선택': 'select_hub',
  '[예약] 좌석 선택': 'select_trip_type',
  '[예약] 예약 정보': 'hub_info',
  '[기타] 이름 입력': 'write_name',
} as const;

interface Props {
  eventId: string;
  eventName: string;
  isBottomSheetOpen: boolean;
  isActive?: boolean; // 추적 활성화 여부
}

export const useReservationTracking = ({
  eventId,
  eventName,
  isBottomSheetOpen,
  isActive = true,
}: Props) => {
  const { currentScrollDepth, maxScrollDepth } = useScrollDepth();
  const reservationStartTimeRef = useRef<Dayjs | null>(null);
  const reservationTrackingStepRef = useRef<ReservationStep | null>(null);

  const trackEnterReservation = (eventId: string, eventName: string) => {
    if (!isActive) return; // 비활성화 시 추적하지 않음
    reservationStartTimeRef.current = dayjs();
    gtagEnterReservation(
      eventId,
      eventName,
      currentScrollDepth,
      maxScrollDepth,
    );
  };

  const setReservationTrackingStep = (
    eventStep: (typeof EVENT_STEPS)[number],
  ) => {
    if (!isActive) return; // 비활성화 시 추적하지 않음

    const reservationStep = EVENT_STEP_TO_RESERVATION_STEP.hasOwnProperty(
      eventStep,
    )
      ? EVENT_STEP_TO_RESERVATION_STEP[eventStep]
      : undefined;

    if (!reservationStep) {
      return;
    }

    reservationTrackingStepRef.current = reservationStep;
  };

  const trackAbandonReservation = (
    exitType: 'page_leave' | 'bottom_sheet_close',
  ) => {
    if (!isActive) return; // 비활성화 시 추적하지 않음

    const reservationStartTime = reservationStartTimeRef.current;
    const reservationStep = reservationTrackingStepRef.current;

    if (!reservationStartTime || !reservationStep) {
      return;
    }

    const totalTimeMs = dayjs().diff(reservationStartTime, 'ms');
    gtagAbandonReservation(
      eventId,
      eventName,
      reservationStep,
      exitType,
      totalTimeMs,
    );

    reservationStartTimeRef.current = null;
    reservationTrackingStepRef.current = null;
  };

  const trackCompleteReservation = (
    eventDate: string | undefined,
    selectedHubToDestination: string | undefined,
    selectedHubFromDestination: string | undefined,
    tripType: string,
    hasOtherEventReservation: boolean | undefined,
  ) => {
    if (!isActive) return; // 비활성화 시 추적하지 않음

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
    );
  };

  useEffect(() => {
    if (!isActive) return; // 비활성화 시 이벤트 리스너 등록하지 않음

    const handleBeforeUnload = () => {
      trackAbandonReservation('page_leave');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackAbandonReservation('page_leave');
      }
    };

    const handlePopState = () => {
      trackAbandonReservation('page_leave');
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // 페이지 닫기 탭닫기, 새로고침, 새로운 URL 입력
    document.addEventListener('visibilitychange', handleVisibilityChange); // 탭전환/최소화
    window.addEventListener('popstate', handlePopState); // 브라우저 뒤로가기/앞으로가기

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [trackAbandonReservation, isActive]);

  useEffect(() => {
    if (!isActive) return; // 비활성화 시 추적하지 않음
    if (!isBottomSheetOpen) {
      trackAbandonReservation('bottom_sheet_close');
    }
  }, [isBottomSheetOpen, trackAbandonReservation, isActive]);

  return {
    trackEnterReservation,
    setReservationTrackingStep,
    trackCompleteReservation,
  };
};
