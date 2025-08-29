import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

/**
 * 404 페이지 방문을 Sentry에 추적하는 커스텀 훅
 */
export const useNotFoundTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    // 404 에러를 Sentry에 기록
    Sentry.captureMessage('Page Not Found', {
      level: 'warning',
      tags: {
        component: 'NotFound',
        page: 'not-found',
        feature: 'navigation',
        errorType: '404-error',
        environment: process.env.NODE_ENV || 'development',
      },
      extra: {
        pathname,
        referrer: typeof window !== 'undefined' ? document.referrer : 'unknown',
        timestamp: dayjs().toISOString(),
      },
    });
  }, [pathname]);
};

export default useNotFoundTracking;
