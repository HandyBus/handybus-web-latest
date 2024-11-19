'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import IconButton from '@/components/buttons/icon-button/IconButton';
import useBottomSheet from '@/hooks/useBottomSheet';
import ShareIcon from 'public/icons/share.svg';
import KakaoIcon from 'public/icons/kakao-colored.svg';
import TwitterIcon from 'public/icons/twitter-colored.svg';
import InstagramIcon from 'public/icons/instagram-colored.svg';
import LinkIcon from 'public/icons/link.svg';
import { RefObject } from 'react';

interface Props {
  message: string;
  variant?: 'primary' | 'secondary' | 'alert' | 'modalSecondary';
  disabled?: boolean;
}
const BottomBar = ({
  message = '수요 신청하기',
  variant = 'secondary',
  disabled = false,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();

  return (
    <>
      <BottomBarContents
        message={message}
        openBottomSheet={openBottomSheet}
        variant={variant}
        disabled={disabled}
      />
      <div id="bottom-bar-spacer" className="h-120" />
      <ShareSheet bottomSheetRef={bottomSheetRef} contentRef={contentRef} />
    </>
  );
};

export default BottomBar;

interface BottomBarContentsProps {
  message: string;
  openBottomSheet: () => void;
  variant: 'primary' | 'secondary' | 'alert' | 'modalSecondary';
  disabled?: boolean;
}
const BottomBarContents = ({
  message,
  openBottomSheet,
  variant,
  disabled,
}: BottomBarContentsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-480 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-4 px-16 py-8">
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          수요 신청은 <span className="font-700">무료</span>이며, 수요 신청
          결과를 노선 개설에 활용합니다.
        </p>
        <div className=" flex justify-between gap-12">
          <Button variant={variant} disabled={disabled}>
            {message}
          </Button>
          <IconButton
            type="button"
            className="h-[44px] w-[44px]"
            onClick={openBottomSheet}
          >
            <ShareIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

interface ShareSheetProps {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement>;
}
const ShareSheet = ({ bottomSheetRef, contentRef }: ShareSheetProps) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      title="공유하기"
      description="친구들과 함께 핸디버스를 타요"
    >
      <div
        ref={contentRef}
        className="overflow-y-hidden text-16 font-400 leading-[24px] text-grey-800"
      >
        <button type="button" className="flex items-center gap-16 py-16">
          <KakaoIcon viewBox="0 0 24 24 " width={24} height={24} />
          <p>
            <span className="text-16 font-500 leading-[25.6px]">카카오톡</span>
            으로 공유하기
          </p>
        </button>
        <button type="button" className="flex items-center gap-16 py-16">
          <TwitterIcon viewBox="0 0 24 24" width={24} height={24} />
          <p>
            <span className="text-16 font-500 leading-[25.6px]">트위터</span>로
            공유하기
          </p>
        </button>
        <button type="button" className="flex items-center gap-16 py-16">
          <InstagramIcon viewBox="0 0 24 24" width={24} height={24} />
          <p>
            <span className="text-16 font-500 leading-[25.6px]">
              인스타그램
            </span>
            으로 공유하기
          </p>
        </button>
        <button type="button" className="flex items-center gap-16 py-16">
          <LinkIcon viewBox="0 0 24 24" width={24} height={24} />
          <p>링크 복사하기</p>
        </button>
        <div className="h-[21px]" />
      </div>
    </BottomSheet>
  );
};
