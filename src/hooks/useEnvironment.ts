'use client';

import { useEffect, useState } from 'react';
import {
  getIsAppFromUserAgent,
  getIsMobileWeb,
  parseEnvironmentFromUserAgent,
} from '@/utils/environment.util';

/**
 * 현재 실행 환경 정보를 제공하는 커스텀 훅
 *
 * User Agent를 기반으로 앱(React Native WebView) 환경인지 판단합니다.
 *
 * @example
 * const MyComponent = () => {
 *   const { isApp, isMobileWeb, platform, appVersion } = useEnvironment();
 *
 *   if (isApp) {
 *     return <div>앱 환경입니다. 버전: {appVersion}</div>;
 *   }
 *
 *   return <div>웹 환경입니다.</div>;
 * };
 *
 */
const useEnvironment = () => {
  // lazy initialization을 사용하여 초기 렌더링 시에도 올바른 값으로 설정하여 깜빡임 방지
  const [isLoading, setIsLoading] = useState(true);
  const [isApp] = useState(() => getIsAppFromUserAgent());
  const [isMobileWeb] = useState(() => getIsMobileWeb());
  const [platform] = useState<'ios' | 'android' | 'unknown'>(() => {
    const envInfo = parseEnvironmentFromUserAgent();
    return envInfo.platform;
  });
  const [appVersion] = useState<string | null>(() => {
    const envInfo = parseEnvironmentFromUserAgent();
    return envInfo.appVersion;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') setIsLoading(false);
  }, [setIsLoading]);

  return {
    /** 환경 로딩 여부 */
    isLoading,
    /** React Native WebView 환경 여부 */
    isApp,
    /** 모바일 웹 브라우저 환경 여부 (앱이 아닌 모바일 브라우저) */
    isMobileWeb,
    /** 플랫폼 정보 (ios | android | unknown) */
    platform,
    /** 앱 버전 (앱 환경인 경우) */
    appVersion,
    /** 데스크톱 웹 환경 여부 */
    isDesktopWeb: !isApp && !isMobileWeb,
  };
};

export default useEnvironment;

/**
 * 간단하게 앱 환경 여부만 확인하는 경량 훅
 *
 * @returns {boolean} React Native WebView 환경 여부
 *
 * @example
 * const MyComponent = () => {
 *   const isApp = useIsApp();
 *
 *   return (
 *     <button onClick={() => {
 *       if (isApp) {
 *         // 앱 전용 로직
 *       } else {
 *         // 웹 전용 로직
 *       }
 *     }}>
 *       클릭
 *     </button>
 *   );
 * };
 */
export const useIsApp = (): boolean => {
  // lazy initialization을 사용하여 초기 렌더링 시에도 올바른 값으로 설정하여 깜빡임 방지
  const [isApp] = useState(() => getIsAppFromUserAgent());

  return isApp;
};
