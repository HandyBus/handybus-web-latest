'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { RefObject } from 'react';
import {
  SHARE_BUTTONS,
  SHARE_PLATFORM,
  SharePlatform,
} from './BottomBar.constant';
import Script from 'next/script';
import { useShare } from './useShare';

interface ShareSheetProps {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement>;
  closeBottomSheet: () => void;
  shuttleName?: string;
}
const ShareSheet = ({
  bottomSheetRef,
  contentRef,
  closeBottomSheet,
  shuttleName,
}: ShareSheetProps) => {
  const currentUrl = window.location.href;
  const { shareToTwitter, copyToClipboard, shareToKakao, initializeKakao } =
    useShare(currentUrl, closeBottomSheet, shuttleName);

  const handleShare = (platform: SharePlatform) => {
    switch (platform) {
      case SHARE_PLATFORM.KAKAO:
        shareToKakao(shuttleName);
        break;
      case SHARE_PLATFORM.TWITTER:
        shareToTwitter();
        break;
      case SHARE_PLATFORM.LINK:
        copyToClipboard();
        break;
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        title="공유하기"
        description="친구들과 함께 핸디버스를 타요"
      >
        <div
          ref={contentRef}
          className="overflow-y-hidden text-16 font-400 leading-[24px] text-grey-800"
        >
          {SHARE_BUTTONS.map((button) => (
            <button
              key={button.id}
              type="button"
              className="flex items-center gap-16 py-16"
              onClick={() => handleShare(button.id)}
              aria-label={button.ariaLabel}
            >
              <button.icon
                viewBox="0 0 24 24"
                width={24}
                height={24}
                aria-hidden="true"
              />
              <p>
                {button.text && (
                  <span className="text-16 font-500 leading-[25.6px]">
                    {button.text}
                  </span>
                )}
                {button.subText}
              </p>
            </button>
          ))}
          <div className="h-[21px]" />
        </div>
      </BottomSheet>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        onLoad={initializeKakao}
        strategy="afterInteractive"
      />
    </>
  );
};

export default ShareSheet;
