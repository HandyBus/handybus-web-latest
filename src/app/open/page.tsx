'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/buttons/button/Button';
import OpenAppIcon from './icons/open-app.svg';
import useEnvironment from '@/hooks/useEnvironment';
import Loading from '@/components/loading/Loading';

const DEEP_LINK_TIMEOUT = 300;

const Page = () => {
  const { isDesktopWeb, isLoading } = useEnvironment();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    if (!isLoading && isDesktopWeb) {
      handleWebRedirect();
    }
  }, [isLoading, isDesktopWeb, handleWebRedirect]);

  // path가 없으면 루트 페이지로 이동
  if (!isValid) {
    window.location.href = '/';
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isDesktopWeb)
    return (
      <main className="flex grow flex-col items-center justify-center">
        <div className="p-16">
          <h1 className="pb-4 text-center text-22 font-700 text-basic-black">
            페이지를 이동해 주세요
          </h1>
          <p className="pb-24 text-center text-16 font-500 text-basic-grey-600">
            지금 핸디버스 앱을 다운받고
            <br />
            더욱 편리하게 이용해보세요.
          </p>
          <div>
            <OpenAppIcon />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 p-16">
          <Button onClick={attemptDeepLink} variant="primary">
            앱에서 열기
          </Button>
          <Button onClick={handleWebRedirect} variant="secondary">
            웹으로 볼게요
          </Button>
        </div>
      </main>
    );
};

export default Page;
