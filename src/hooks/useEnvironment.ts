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
  const [isApp, setIsApp] = useState(false);
  const [isMobileWeb, setIsMobileWeb] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'unknown'>(
    'unknown',
  );
  const [appVersion, setAppVersion] = useState<string | null>(null);

  useEffect(() => {
    const envInfo = parseEnvironmentFromUserAgent();
    setIsApp(envInfo.isApp);
    setPlatform(envInfo.platform);
    setAppVersion(envInfo.appVersion);

    const mobileWeb = getIsMobileWeb();
    setIsMobileWeb(mobileWeb);
  }, []);

  return {
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
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setIsApp(getIsAppFromUserAgent());
  }, []);

  return isApp;
};
