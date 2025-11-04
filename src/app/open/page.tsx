'use client';

import { useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/buttons/button/Button';

const DEEP_LINK_TIMEOUT = 300;

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deepLinkTimeout = useRef<NodeJS.Timeout | null>(null);
  const visibilityChangeHandler = useRef<(() => void) | null>(null);
  const blurHandler = useRef<(() => void) | null>(null);

  // URL 생성
  const { deepLinkUrl, webUrl, isValid } = useMemo(() => {
    const path = searchParams.get('path');

    if (!path) {
      return { deepLinkUrl: '', webUrl: '', isValid: false };
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

    const deepLink = `handybus://?${deepLinkParams.toString()}`;
    const web = `${path}${webParams.toString() ? `?${webParams.toString()}` : ''}`;

    return { deepLinkUrl: deepLink, webUrl: web, isValid: true };
  }, [searchParams]);

  // path가 없으면 루트 페이지로 이동
  if (!isValid) {
    router.replace('/');
    return null;
  }

  const attemptDeepLink = () => {
    const handleAppOpened = () => {
      if (deepLinkTimeout.current) {
        clearTimeout(deepLinkTimeout.current);
        deepLinkTimeout.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleAppOpened();
      }
    };

    const handleBlur = () => {
      handleAppOpened();
    };

    visibilityChangeHandler.current = handleVisibilityChange;
    blurHandler.current = handleBlur;

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    // 딥링크 시도
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

    deepLinkTimeout.current = setTimeout(() => {
      // visibilitychange로 앱이 열렸는지 확인
      if (document.hidden) {
        return;
      }

      // cleanup
      if (visibilityChangeHandler.current) {
        document.removeEventListener(
          'visibilitychange',
          visibilityChangeHandler.current,
        );
      }
      if (blurHandler.current) {
        window.removeEventListener('blur', blurHandler.current);
      }

      // 웹으로 fallback
      window.location.href = webUrl;
    }, DEEP_LINK_TIMEOUT);
  };

  const handleWebRedirect = () => {
    // 타이머 정리
    if (deepLinkTimeout.current) {
      clearTimeout(deepLinkTimeout.current);
      deepLinkTimeout.current = null;
    }

    // 이벤트 리스너 정리
    if (visibilityChangeHandler.current) {
      document.removeEventListener(
        'visibilitychange',
        visibilityChangeHandler.current,
      );
    }
    if (blurHandler.current) {
      window.removeEventListener('blur', blurHandler.current);
    }

    window.location.href = webUrl;
  };

  return (
    <main className="flex grow flex-col justify-end">
      <div className="flex w-full flex-col gap-4 p-16">
        <Button onClick={attemptDeepLink} variant="primary">
          앱으로 이동하기
        </Button>
        <Button onClick={handleWebRedirect} variant="secondary">
          웹으로 이동하기
        </Button>
      </div>
    </main>
  );
};

export default Page;
