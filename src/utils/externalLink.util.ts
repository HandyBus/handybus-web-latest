import { sendMessageToApp } from './webview.util';
import { getIsAppFromUserAgent } from './environment.util';
import type { MouseEvent } from 'react';

const INTERNAL_DOMAINS = [
  /^https?:\/\/handybus\.co\.kr/,
  /^https?:\/\/www\.handybus\.co\.kr/,
  /^https?:\/\/dev-handybus-web-latest\.vercel\.app/,
  /^https?:\/\/localhost/,
] as const;

export const isExternalLink = (url: string): boolean => {
  // 상대 경로는 내부 링크로 간주
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }

  try {
    const isInternalDomain = INTERNAL_DOMAINS.some((pattern) =>
      pattern.test(url),
    );

    if (isInternalDomain) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const handleExternalLink = (url: string): boolean => {
  const isApp = getIsAppFromUserAgent();

  // 내부 링크인 경우
  if (!isExternalLink(url)) {
    window.location.href = url;
    return false;
  }

  if (isApp) {
    // 앱 환경: postMessage로 앱에 전달
    const success = sendMessageToApp('OPEN_EXTERNAL_BROWSER', { url });
    if (!success) {
      // postMessage 실패 시 fallback으로 window.location.href 시도
      console.warn(
        '[ExternalLink] Failed to send message to app, falling back to window.location.href',
      );
      window.location.href = url;
    }
    return success;
  } else {
    // 일반 웹 환경
    window.location.href = url;
    return true;
  }
};

/**
 * 외부 링크 클릭 이벤트 핸들러를 생성합니다.
 */
export const createExternalLinkHandler = (url: string) => {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    // 기본 동작 방지 (Next.js Link의 기본 네비게이션 방지)
    event.preventDefault();
    event.stopPropagation();

    handleExternalLink(url);
  };
};
