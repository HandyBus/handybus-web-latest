'use client';

import { useRef, useCallback } from 'react';
import { trackFAQClick } from './analytics.util';

export const useFAQTracking = () => {
  const clickOrderRef = useRef<number>(0);

  const trackFAQItemClick = useCallback(
    (
      faqTitle: string,
      faqCategory: string,
      position: number,
      action: 'open' | 'close',
    ) => {
      // 열기 액션일 때만 클릭 순서 증가
      if (action === 'open') {
        clickOrderRef.current += 1;

        trackFAQClick(
          faqTitle,
          faqCategory,
          position,
          clickOrderRef.current,
          action,
        );
      } else {
        trackFAQClick(faqTitle, faqCategory, position, 0, action);
      }
    },
    [],
  );

  return {
    trackFAQItemClick,
    getCurrentClickOrder: () => clickOrderRef.current,
  };
};
