'use client';

import { useRef, useCallback } from 'react';
import { trackFAQClick } from '@/utils/analytics/faqAnalytics.util';

export const useFAQTracking = () => {
  const clickOrderRef = useRef<number>(0);

  const trackFAQItemClick = useCallback(
    (
      faqTitle: string,
      faqCategory: string,
      position: number,
      action: 'open' | 'close',
    ) => {
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
        trackFAQClick(faqTitle, faqCategory, position, undefined, action);
      }
    },
    [],
  );

  return {
    trackFAQItemClick,
    getCurrentClickOrder: () => clickOrderRef.current,
  };
};
