'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  DemandStep,
  gtagExitDemand,
  gtagCompleteDemand,
} from '@/utils/analytics/demandAnalytics.util';
import dayjs, { Dayjs } from 'dayjs';

interface UseDemandTrackingProps {
  eventId: string;
  eventName: string;
  isBottomSheetOpen: boolean;
}

export const useDemandTracking = ({
  eventId,
  eventName,
  isBottomSheetOpen,
}: UseDemandTrackingProps) => {
  const currentStepRef = useRef<DemandStep | null>(null);
  const demandStartTimeRef = useRef<Dayjs | null>(null);

  const trackClickDemandStart = useCallback(() => {
    demandStartTimeRef.current = dayjs();
    currentStepRef.current = 'start_demand';
  }, []);

  const trackEnterDemandStep = useCallback((step: DemandStep) => {
    if (currentStepRef.current !== step) {
      currentStepRef.current = step;
    }
  }, []);

  const trackExitDemandStep = useCallback(
    (exitType: 'page_leave' | 'bottom_sheet_close') => {
      const currentStep = currentStepRef.current;
      const demandStartTime = demandStartTimeRef.current;

      if (currentStep && demandStartTime) {
        const total_time_ms = dayjs().diff(demandStartTime, 'ms');
        gtagExitDemand(
          currentStep,
          exitType,
          eventId,
          eventName,
          total_time_ms,
        );
      }

      currentStepRef.current = null;
    },
    [eventId, eventName],
  );

  const trackCompleteDemandStep = useCallback(
    (selectedHub: string, tripType: string, eventDate: string) => {
      const demandStartTime = demandStartTimeRef.current;

      if (demandStartTime) {
        const totalTimeMs = dayjs().diff(demandStartTime, 'ms');
        gtagCompleteDemand(
          eventId,
          eventName,
          eventDate,
          selectedHub,
          tripType,
          totalTimeMs,
        );
      }

      currentStepRef.current = null;
      demandStartTimeRef.current = null;
    },
    [eventId, eventName],
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentStepRef.current) {
        trackExitDemandStep('page_leave');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && currentStepRef.current) {
        trackExitDemandStep('page_leave');
      }
    };

    const handlePopState = () => {
      if (currentStepRef.current) {
        trackExitDemandStep('page_leave');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // 페이지 닫기 탭닫기, 새로고침, 새로운 URL 입력
    document.addEventListener('visibilitychange', handleVisibilityChange); // 탭전환/최소화
    window.addEventListener('popstate', handlePopState); // 브라우저 뒤로가기/앞으로가기

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [trackExitDemandStep]);

  useEffect(() => {
    if (!isBottomSheetOpen && currentStepRef.current) {
      trackExitDemandStep('bottom_sheet_close');
    }
  }, [isBottomSheetOpen, trackExitDemandStep]);

  return {
    trackClickDemandStart,
    trackEnterDemandStep,
    trackExitDemandStep,
    trackCompleteDemandStep,
    currentStep: currentStepRef.current,
  };
};
