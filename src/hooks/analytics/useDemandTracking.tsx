'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  DemandStep,
  trackDemandStepEnter,
  trackDemandExit,
  trackDemandComplete,
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
  const stepStartTimeRef = useRef<Dayjs | null>(null);
  const demandStartTimeRef = useRef<Dayjs | null>(null);

  const trackStepEnter = useCallback(
    (step: DemandStep) => {
      if (currentStepRef.current !== step) {
        currentStepRef.current = step;
        stepStartTimeRef.current = dayjs();

        if (step === 'demand_start') {
          demandStartTimeRef.current = dayjs();
        }

        trackDemandStepEnter(step, eventId, eventName);
      }
    },
    [eventId, eventName],
  );

  const trackExit = useCallback(
    (exitType: 'page_leave' | 'bottom_sheet_close') => {
      const currentStep = currentStepRef.current;
      const stepStartTime = stepStartTimeRef.current;

      if (currentStep && stepStartTime) {
        const timeSpentMs = dayjs().diff(stepStartTime, 'ms');
        trackDemandExit(currentStep, exitType, eventId, eventName, timeSpentMs);
      }

      currentStepRef.current = null;
      stepStartTimeRef.current = null;
    },
    [eventId, eventName],
  );

  const trackComplete = useCallback(
    (selectedHub: string, tripType: string) => {
      const demandStartTime = demandStartTimeRef.current;

      if (demandStartTime) {
        const totalTimeMs = dayjs().diff(demandStartTime, 'ms');
        trackDemandComplete(
          eventId,
          eventName,
          selectedHub,
          tripType,
          totalTimeMs,
        );
      }

      currentStepRef.current = null;
      stepStartTimeRef.current = null;
      demandStartTimeRef.current = null;
    },
    [eventId, eventName],
  );

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentStepRef.current) {
        trackExit('page_leave');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && currentStepRef.current) {
        trackExit('page_leave');
      }
    };

    const handlePopState = () => {
      if (currentStepRef.current) {
        trackExit('page_leave');
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
  }, [trackExit]);

  useEffect(() => {
    if (!isBottomSheetOpen && currentStepRef.current) {
      trackExit('bottom_sheet_close');
    }
  }, [isBottomSheetOpen, trackExit]);

  return {
    trackStepEnter,
    trackExit,
    trackComplete,
    currentStep: currentStepRef.current,
  };
};
