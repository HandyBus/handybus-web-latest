/**
 * 환경 감지 유틸리티
 *
 * React Native WebView와 일반 웹 브라우저를 구분하기 위한 User Agent 기반 감지 로직
 */

import {
  CUSTOM_USER_AGENT_IDENTIFIER,
  SupportedPlatform,
  USER_AGENT_PATTERNS,
} from '@/constants/environment.const';

/**
 * 클라이언트 사이드에서 User Agent를 기반으로 앱 환경 여부를 확인합니다.
 *
 * @returns {boolean} React Native WebView 환경이면 true, 아니면 false
 */
export const getIsAppFromUserAgent = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent = window.navigator.userAgent;
  return userAgent.includes(CUSTOM_USER_AGENT_IDENTIFIER);
};

/**
 * 서버 사이드에서 User Agent를 기반으로 앱 환경 여부를 확인합니다.
 *
 * @param {string} userAgent - Request headers의 User-Agent 값
 * @returns {boolean} React Native WebView 환경이면 true, 아니면 false
 *
 * @example
 * import { headers } from 'next/headers';
 *
 * const headersList = headers();
 * const userAgent = headersList.get('user-agent') || '';
 * const isApp = getIsAppFromUserAgentServer(userAgent);
 */
export const getIsAppFromUserAgentServer = (userAgent: string): boolean => {
  return userAgent.includes(CUSTOM_USER_AGENT_IDENTIFIER);
};

/**
 * User Agent에서 앱 버전 정보를 추출합니다.
 *
 * @param {string} [userAgent] - User Agent 문자열 (선택적, 기본값은 window.navigator.userAgent)
 * @returns {string | null} 앱 버전 또는 null (앱이 아닌 경우)
 *
 * @example
 * // User Agent: "... HandyBusApp/1.2.3 ..."
 * const version = getAppVersionFromUserAgent();
 * console.log(version); // "1.2.3"
 */
export const getAppVersionFromUserAgent = (
  userAgent?: string,
): string | null => {
  const ua =
    userAgent || (typeof window !== 'undefined' && window.navigator.userAgent);

  if (!ua) {
    return null;
  }

  const regex = new RegExp(`${CUSTOM_USER_AGENT_IDENTIFIER}\\/(\\S+)`);
  const match = ua.match(regex);

  return match ? match[1] : null;
};

/**
 * User Agent를 파싱하여 상세 정보를 반환합니다.
 *
 * @param {string} [userAgent] - User Agent 문자열 (선택적)
 * @returns {Object} 환경 정보 객체
 *
 * @example
 * const envInfo = parseEnvironmentFromUserAgent();
 * console.log(envInfo);
 * // {
 * //   isApp: true,
 * //   appVersion: "1.2.3",
 * //   platform: "ios" | "android" | "unknown"
 * // }
 */
export const parseEnvironmentFromUserAgent = (userAgent?: string) => {
  const ua =
    userAgent || (typeof window !== 'undefined' && window.navigator.userAgent);

  if (!ua) {
    return {
      isApp: false,
      appVersion: null,
      platform: 'unknown' as const,
    };
  }

  const isApp = ua.includes(CUSTOM_USER_AGENT_IDENTIFIER);
  const appVersion = getAppVersionFromUserAgent(ua);

  // 플랫폼 감지 (iOS, Android)
  let platform: SupportedPlatform = 'unknown';
  if (USER_AGENT_PATTERNS.iOS.test(ua)) {
    platform = 'ios';
  } else if (USER_AGENT_PATTERNS.ANDROID.test(ua)) {
    platform = 'android';
  }

  return {
    isApp,
    appVersion,
    platform,
  };
};

/**
 * 현재 환경이 모바일 웹인지 확인합니다.
 * (앱이 아닌 모바일 브라우저)
 *
 * @returns {boolean} 모바일 웹 환경이면 true
 */
export const getIsMobileWeb = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const isApp = getIsAppFromUserAgent();
  if (isApp) {
    return false;
  }

  const userAgent = window.navigator.userAgent;

  return USER_AGENT_PATTERNS.MOBILE.test(userAgent);
};
