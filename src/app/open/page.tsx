'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';

const DEEP_LINK_TIMEOUT = 300;

const Page = () => {
  const searchParams = useSearchParams();
  const hasRedirected = useRef(false);
  const deepLinkTimeout = useRef<NodeJS.Timeout | null>(null);
  const visibilityChangeHandler = useRef<(() => void) | null>(null);
  const blurHandler = useRef<(() => void) | null>(null);
  const { platform } = useEnvironment();
  const isIOS = platform === 'ios';

  useEffect(() => {
    if (hasRedirected.current) {
      return;
    }

    const path = searchParams.get('path');

    // path가 없으면 루트 페이지로 이동
    if (!path) {
      console.warn('path parameter is missing');
      window.location.href = '/';
      return;
    }

    // path를 제외한 나머지 searchParams 추출
    const otherParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'path') {
        otherParams[key] = value;
      }
    });

    // 딥링크 URL 생성
    const deepLinkParams = new URLSearchParams();
    deepLinkParams.set('path', path);

    const webParams = new URLSearchParams();

    Object.entries(otherParams).forEach(([key, value]) => {
      deepLinkParams.set(key, value);
      webParams.set(key, value);
    });

    const deepLinkUrl = `handybus://?${deepLinkParams.toString()}`;
    const webUrl = `${path}${webParams.toString() ? `?${webParams.toString()}` : ''}`;

    // 앱이 열렸는지 확인하는 핸들러
    const handleAppOpened = () => {
      if (deepLinkTimeout.current) {
        clearTimeout(deepLinkTimeout.current);
        deepLinkTimeout.current = null;
      }
      hasRedirected.current = true;
    };

    // visibilitychange 이벤트: iOS에서 더 안정적으로 작동
    const handleVisibilityChange = () => {
      if (document.hidden && !hasRedirected.current) {
        handleAppOpened();
      }
    };

    // blur 이벤트: Android 및 다른 브라우저 지원
    const handleBlur = () => {
      handleAppOpened();
    };

    visibilityChangeHandler.current = handleVisibilityChange;
    blurHandler.current = handleBlur;

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    const attemptDeepLink = () => {
      try {
        const link = document.createElement('a');
        link.href = deepLinkUrl;
        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        setTimeout(() => {
          try {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
          } catch {}
        }, 100);
      } catch {}
    };

    // 딥링크 시도
    attemptDeepLink();

    // 딥링크가 실패하면 웹 URL로 fallback (300ms 후)
    // 페이지가 여전히 포커스되어 있고 리다이렉트가 발생하지 않았다면 웹으로 이동
    deepLinkTimeout.current = setTimeout(() => {
      if (!hasRedirected.current) {
        // iOS에서는 visibilitychange가 더 안정적이므로 추가 확인
        if (isIOS && document.hidden) {
          // 앱이 열린 것으로 간주
          hasRedirected.current = true;
          return;
        }

        // 여전히 포커스가 있다면 웹으로 fallback
        if (document.hasFocus() || !document.hidden) {
          hasRedirected.current = true;
          window.location.href = webUrl;
        }
      }
    }, DEEP_LINK_TIMEOUT);

    // cleanup
    return () => {
      if (deepLinkTimeout.current) {
        clearTimeout(deepLinkTimeout.current);
      }
      if (visibilityChangeHandler.current) {
        document.removeEventListener(
          'visibilitychange',
          visibilityChangeHandler.current,
        );
      }
      if (blurHandler.current) {
        window.removeEventListener('blur', blurHandler.current);
      }
    };
  }, [searchParams, isIOS]);

  return null;
};

export default Page;
