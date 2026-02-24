'use client';

import HandybusBannerIcon from '@/components/header/icons/handybus-banner-icon.svg';

const IOS_APP_STORE_URL =
  'https://apps.apple.com/us/app/%ED%95%B8%EB%94%94%EB%B2%84%EC%8A%A4/id6751479950';
const ANDROID_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.handybus.app';

const getAppDownloadUrl = () => {
  if (typeof window === 'undefined') return IOS_APP_STORE_URL;
  const ua = window.navigator.userAgent;
  if (/android/i.test(ua)) return ANDROID_PLAY_STORE_URL;
  return IOS_APP_STORE_URL;
};

const AppDownloadBanner = () => {
  return (
    <div className="fixed-centered-layout top-0 z-50 flex items-center justify-between gap-12 bg-basic-black px-16 py-12">
      <div className="flex items-center gap-12">
        <HandybusBannerIcon />
        <span className="text-16 font-600 leading-[140%] text-basic-white">
          최애를 만나는 가장 빠른 길
        </span>
      </div>
      <div className="flex items-center">
        <a
          href={getAppDownloadUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brand-primary-400 px-12 py-4 text-14 font-600 leading-[160%] text-basic-white active:bg-brand-primary-500"
        >
          앱 다운로드
        </a>
      </div>
    </div>
  );
};

export default AppDownloadBanner;
