'use client';

import { useRef, useCallback } from 'react';
import { gtagFAQClick } from '@/utils/analytics/faqAnalytics.util';

export const useFAQTracking = () => {
  const clickOrderRef = useRef<number>(0);

  const trackClickFAQItem = useCallback(
    (
      faqTitle: string,
      faqCategory: string,
      position: number,
      action: 'open' | 'close',
    ) => {
      if (action === 'open') {
        clickOrderRef.current += 1;

        gtagFAQClick(
          faqTitle,
          faqCategory,
          position,
          clickOrderRef.current,
          action,
        );
      } else {
        gtagFAQClick(faqTitle, faqCategory, position, undefined, action);
      }
    },
    [],
  );

  return {
    trackClickFAQItem,
    getCurrentClickOrder: () => clickOrderRef.current,
  };
};
