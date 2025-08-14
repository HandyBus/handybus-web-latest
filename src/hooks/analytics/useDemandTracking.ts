'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  DemandStep,
  gtagAbandonDemand,
  gtagCompleteDemand,
  gtagEnterDemand,
} from '@/utils/analytics/demandAnalytics.util';
import dayjs, { Dayjs } from 'dayjs';
import { EVENT_STEPS } from '@/app/event/[eventId]/form.const';

const EVENT_STEP_TO_DEMAND_STEP: Record<string, DemandStep> = {
  '[공통] 일자 선택': 'select_date',
  '[공통] 시/도 선택': 'select_sido',
  '[수요조사] 정류장 선택': 'select_hub',
  '[수요조사] 좌석 선택': 'select_trip_type',
  '[수요조사] 정류장 정보': 'hub_info',
} as const;

interface Props {
  eventId: string;
  eventName: string;
  isBottomSheetOpen: boolean;
  isActive?: boolean; // 추적 활성화 여부
}

const useDemandTracking = ({
  eventId,
  eventName,
  isBottomSheetOpen,
  isActive = true,
}: Props) => {
  const demandStartTimeRef = useRef<Dayjs | null>(null);
  const currentStepRef = useRef<DemandStep | null>(null);

  const setDemandTrackingStep = (eventStep: (typeof EVENT_STEPS)[number]) => {
    if (!isActive) return; // 비활성화 시 추적하지 않음

    const demandStep = EVENT_STEP_TO_DEMAND_STEP.hasOwnProperty(eventStep)
      ? EVENT_STEP_TO_DEMAND_STEP[eventStep]
      : undefined;

    if (!demandStep) {
      return;
    }

    currentStepRef.current = demandStep;
  };

  const trackEnterDemand = useCallback(() => {
    if (!isActive) return; // 비활성화 시 추적하지 않음
    demandStartTimeRef.current = dayjs();
    gtagEnterDemand(eventId, eventName);
  }, [eventId, eventName, isActive]);

  const trackAbandonDemand = useCallback(
    (exitType: 'page_leave' | 'bottom_sheet_close') => {
      if (!isActive) return; // 비활성화 시 추적하지 않음

      const demandStartTime = demandStartTimeRef.current;
      const currentStep = currentStepRef.current;

      if (!demandStartTime || !currentStep) {
        return;
      }

      const totalTimeMs = dayjs().diff(demandStartTime, 'ms');
      gtagAbandonDemand(currentStep, exitType, eventId, eventName, totalTimeMs);

      demandStartTimeRef.current = null;
      currentStepRef.current = null;
    },
    [eventId, eventName, isActive],
  );

  const trackCompleteDemand = useCallback(
    (selectedHub: string, tripType: string, eventDate: string) => {
      if (!isActive) return; // 비활성화 시 추적하지 않음

      const demandStartTime = demandStartTimeRef.current;
      if (!demandStartTime) {
        return;
      }

      const totalTimeMs = dayjs().diff(demandStartTime, 'ms');
      gtagCompleteDemand(
        eventId,
        eventName,
        eventDate,
        selectedHub,
        tripType,
        totalTimeMs,
      );

      demandStartTimeRef.current = null;
    },
    [eventId, eventName, isActive],
  );

  useEffect(() => {
    if (!isActive) return; // 비활성화 시 이벤트 리스너 등록하지 않음

    const handleBeforeUnload = () => {
      trackAbandonDemand('page_leave');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackAbandonDemand('page_leave');
      }
    };

    const handlePopState = () => {
      trackAbandonDemand('page_leave');
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // 페이지 닫기 탭닫기, 새로고침, 새로운 URL 입력
    document.addEventListener('visibilitychange', handleVisibilityChange); // 탭전환/최소화
    window.addEventListener('popstate', handlePopState); // 브라우저 뒤로가기/앞으로가기

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [trackAbandonDemand, isActive]);

  useEffect(() => {
    if (!isActive) return; // 비활성화 시 추적하지 않음
    if (!isBottomSheetOpen) {
      trackAbandonDemand('bottom_sheet_close');
    }
  }, [isBottomSheetOpen, trackAbandonDemand, isActive]);

  return {
    trackEnterDemand,
    trackCompleteDemand,
    setDemandTrackingStep,
  };
};

export default useDemandTracking;
