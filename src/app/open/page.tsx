'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const DEEP_LINK_TIMEOUT = 300;

const Page = () => {
  const searchParams = useSearchParams();
  const hasRedirected = useRef(false);
  const deepLinkTimeout = useRef<NodeJS.Timeout | null>(null);
  const blurHandler = useRef<(() => void) | null>(null);

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

    Object.entries(otherParams).forEach(([key, value]) => {
      deepLinkParams.set(key, value);
    });

    const deepLinkUrl = `handybus://?${deepLinkParams.toString()}`;

    // 웹 URL 생성
    const webParams = new URLSearchParams();
    Object.entries(otherParams).forEach(([key, value]) => {
      webParams.set(key, value);
    });

    const webUrl = `${path}${webParams.toString() ? `?${webParams.toString()}` : ''}`;

    // 페이지가 blur되면 딥링크가 성공한 것으로 간주
    const handleBlur = () => {
      if (deepLinkTimeout.current) {
        clearTimeout(deepLinkTimeout.current);
        deepLinkTimeout.current = null;
      }
      hasRedirected.current = true;
    };

    blurHandler.current = handleBlur;
    window.addEventListener('blur', handleBlur);

    // 딥링크 시도
    const link = document.createElement('a');
    link.href = deepLinkUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 딥링크가 실패하면 웹 URL로 fallback (500ms 후)
    // 페이지가 여전히 포커스되어 있고 리다이렉트가 발생하지 않았다면 웹으로 이동
    deepLinkTimeout.current = setTimeout(() => {
      if (!hasRedirected.current && document.hasFocus()) {
        hasRedirected.current = true;
        window.location.href = webUrl;
      }
    }, DEEP_LINK_TIMEOUT);

    // cleanup
    return () => {
      if (deepLinkTimeout.current) {
        clearTimeout(deepLinkTimeout.current);
      }
      if (blurHandler.current) {
        window.removeEventListener('blur', blurHandler.current);
      }
    };
  }, [searchParams]);

  return null;
};

export default Page;
