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
import { RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

// export const BOTTOM_BAR_TYPE = {
//   DEMAND: 'DEMAND',
//   RESERVATION: 'RESERVATION',
//   DEMAND_WRITE: 'DEMAND_WRITE',
//   RESERVATION_WRITE: 'RESERVATION_WRITE',
// } as const;

// export type BottomBarType =
//   (typeof BOTTOM_BAR_TYPE)[keyof typeof BOTTOM_BAR_TYPE];

export type BottomBarType =
  | 'DEMAND'
  | 'RESERVATION'
  | 'DEMAND_WRITE'
  | 'RESERVATION_WRITE_1'
  | 'RESERVATION_WRITE_2'
  | 'RESERVATION_WRITE_3'
  | 'RESERVATION_WRITE_4';

interface Props {
  variant?: 'primary' | 'secondary' | 'alert' | 'modalSecondary';
  disabled?: boolean;
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
  onSubmit?: () => void;
  type?: BottomBarType;
}
const BottomBar = ({
  variant = 'primary',
  disabled = false,
  handleNextStep,
  handlePrevStep,
  onSubmit,
  type,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const content = (() => {
    switch (type) {
      case 'DEMAND':
        return (
          <BottomBarContents
            message="수요 신청하기"
            openBottomSheet={openBottomSheet}
            variant={variant}
            disabled={disabled}
            onSubmit={onSubmit}
          />
        );
      case 'DEMAND_WRITE':
        return (
          <DemandWriteBottomBar
            message="수요 신청하기"
            disabled={disabled}
            onSubmit={onSubmit}
          />
        );
      case 'RESERVATION':
        return (
          <BottomBarContents
            message="셔틀 예약하러 가기"
            openBottomSheet={openBottomSheet}
            variant={variant}
            disabled={disabled}
            onSubmit={onSubmit}
            doesHaveShareButton={false}
          />
        );
      case 'RESERVATION_WRITE_1':
      case 'RESERVATION_WRITE_2':
      case 'RESERVATION_WRITE_3':
      case 'RESERVATION_WRITE_4':
        return (
          <ReservationBottomBar
            type={type}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  })();

  const bottomBarContent = (
    <>
      {content}
      <ShareSheet bottomSheetRef={bottomSheetRef} contentRef={contentRef} />
    </>
  );

  return createPortal(
    bottomBarContent,
    document.getElementById('bottom-bar-root') || document.body,
  );
};

export default BottomBar;

const DemandWriteBottomBar = ({
  message,
  // disabled,
  onSubmit,
}: {
  message: string;
  disabled: boolean;
  onSubmit?: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-4 px-16 py-8">
        <Button variant="primary" onClick={onSubmit}>
          {message}
        </Button>
      </div>
    </div>
  );
};

const ReservationBottomBar = ({
  type,
  handleNextStep,
  handlePrevStep,
}: {
  type: BottomBarType;
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
}) => {
  const router = useRouter();
  if (type === 'RESERVATION_WRITE_1')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button variant="primary" onClick={handleNextStep}>
              셔틀 예약하기
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_2')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <PriceInfo />
          <div className="flex justify-between gap-8">
            <Button
              variant="secondary"
              className="w-76"
              onClick={handlePrevStep}
            >
              이전
            </Button>
            <Button variant="primary" onClick={handleNextStep}>
              다음단계로
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_3')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button variant="primary" onClick={handleNextStep}>
              80,000원 결제하기
            </Button>
          </div>
        </div>
      </div>
    );
  if (type === 'RESERVATION_WRITE_4')
    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <PriceInfo />
          <div className="flex justify-between gap-8">
            <Button
              variant="secondary"
              className="w-76"
              // onClick={
              //   // mypage reservation link
              // }
            >
              예약 상세 보기
            </Button>
            <Button variant="primary" onClick={() => router.push('/')}>
              홈으로
            </Button>
          </div>
        </div>
      </div>
    );
};

const PriceInfo = () => {
  return (
    <section className="flex items-center justify-between">
      <span className="text-14 font-400 leading-[22.4px] text-grey-900 ">
        총 금액
      </span>
      <div className="flex items-center text-12 font-400 leading-[19.2px] text-grey-600-sub ">
        <span>(42000 * 2인)</span>
        <span className="ml-12 text-22 font-700 leading-[35.2px] text-grey-900">
          총 10,000
        </span>
        <span className="ml-4 text-14 font-400 leading-[22.4px] text-grey-900">
          원
        </span>
      </div>
    </section>
  );
};

interface BottomBarContentsProps {
  message: string;
  openBottomSheet: () => void;
  variant: 'primary' | 'secondary' | 'alert' | 'modalSecondary';
  disabled?: boolean;
  doesHaveShareButton?: boolean;
  onSubmit?: () => void;
}
const BottomBarContents = ({
  message,
  openBottomSheet,
  variant,
  disabled,
  doesHaveShareButton = true,
  onSubmit,
}: BottomBarContentsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="flex flex-col gap-4 px-16 py-8">
        {doesHaveShareButton && (
          <p className="text-12 font-400 leading-[19.2px] text-grey-500">
            수요 신청은 <span className="font-700">무료</span>이며, 수요 신청
            결과를 노선 개설에 활용합니다.
          </p>
        )}
        <div className=" flex justify-between gap-12">
          <Button variant={variant} disabled={disabled} onClick={onSubmit}>
            {message}
          </Button>
          {doesHaveShareButton && (
            <IconButton
              type="button"
              className="h-[44px] w-[44px]"
              onClick={openBottomSheet}
            >
              <ShareIcon />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

interface ShareSheetProps {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement> | undefined;
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
