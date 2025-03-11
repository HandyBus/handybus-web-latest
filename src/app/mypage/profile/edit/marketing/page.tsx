'use client';

import MarketingBottomSheet from '@/app/onboarding/components/bottom-sheets/MarketingBottomSheet';
import Header from '@/components/header/Header';
import { SyntheticEvent, useState } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';

const Page = () => {
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const handleSwitchClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsMarketingAgreed(!isMarketingAgreed);
  };

  const handleMarketingAgreementClick = () => {
    openBottomSheet();
  };

  return (
    <>
      <Header />
      <main className="grow">
        <div
          onClick={handleMarketingAgreementClick}
          className="flex w-full cursor-pointer items-center justify-between p-16"
        >
          <span className="text-14 font-400">마케팅 수신 알림</span>
          <button
            onClick={handleSwitchClick}
            className={`flex h-[14px] w-32 rounded-full bg-grey-50 transition-all duration-200 ${
              isMarketingAgreed ? 'bg-primary-sub' : 'bg-grey-50'
            }`}
          >
            <div
              className={`h-20 w-20 -translate-y-[3px] rounded-full transition-all duration-200 ${
                isMarketingAgreed
                  ? 'translate-x-[12px] bg-primary-main'
                  : 'bg-grey-200'
              }`}
            />
          </button>
        </div>
        <div className="h-8 w-full bg-grey-50" />
      </main>
      <MarketingBottomSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        onAccept={() => setIsMarketingAgreed(true)}
        closeBottomSheet={closeBottomSheet}
        primaryButtonText="알림 받기"
        secondaryButtonText="알림 끄기"
        onPrimaryButtonClick={() => {
          setIsMarketingAgreed(true);
          closeBottomSheet();
        }}
        onSecondaryButtonClick={() => {
          setIsMarketingAgreed(false);
          closeBottomSheet();
        }}
      />
    </>
  );
};

export default Page;
