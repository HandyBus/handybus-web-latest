'use client';

import MarketingBottomSheet from '@/app/onboarding/components/bottom-sheets/MarketingBottomSheet';
import Header from '@/components/header/Header';
import { SyntheticEvent, useEffect, useState } from 'react';
import useBottomSheet from '@/hooks/useBottomSheet';
import { putUser, useGetUser } from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { toast } from 'react-toastify';

const Page = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(
    user?.marketingConsent ?? false,
  );
  useEffect(() => {
    if (user) {
      setIsMarketingAgreed(user.marketingConsent);
    }
  }, [user]);

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const queryClient = useQueryClient();
  const handleAgree = () => {
    setIsMarketingAgreed(true);
    toast.success('마케팅 수신에 동의했어요');
  };
  const handleDisagree = () => {
    setIsMarketingAgreed(false);
    toast.success('마케팅 수신 동의를 철회했어요');
  };

  const { mutate: putMarketingAgreement } = usePutMarketingAgreement({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error('변경 사항을 저장하지 못했어요');
    },
  });

  // 스위치
  const handleSwitchClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    putMarketingAgreement(!isMarketingAgreed, {
      onSuccess: () => {
        if (!isMarketingAgreed) {
          handleAgree();
        } else {
          handleDisagree();
        }
      },
    });
  };

  // 바텀시트
  const handleMarketingAgreementClick = () => {
    openBottomSheet();
  };
  const handlePrimaryButtonClick = () => {
    putMarketingAgreement(true, {
      onSuccess: () => {
        handleAgree();
        closeBottomSheet();
      },
    });
  };
  const handleSecondaryButtonClick = () => {
    putMarketingAgreement(false, {
      onSuccess: () => {
        handleDisagree();
        closeBottomSheet();
      },
    });
  };
  return (
    <>
      <Header />
      <DeferredSuspense isLoading={isUserLoading}>
        {user && (
          <>
            <main className="grow">
              <div
                onClick={handleMarketingAgreementClick}
                className="flex w-full cursor-pointer items-center justify-between p-16"
              >
                <span className="text-14 font-400">마케팅 수신 알림</span>
                <button
                  onClick={handleSwitchClick}
                  className={`flex h-[14px] w-32 rounded-full bg-grey-50 transition-all duration-200 ${
                    isMarketingAgreed ? 'bg-primary-100' : 'bg-grey-50'
                  }`}
                >
                  <div
                    className={`h-20 w-20 -translate-y-[3px] rounded-full transition-all duration-200 ${
                      isMarketingAgreed
                        ? 'bg-primary-main translate-x-[12px]'
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
              closeBottomSheet={closeBottomSheet}
              primaryButtonText="알림 받기"
              secondaryButtonText="알림 끄기"
              onPrimaryButtonClick={handlePrimaryButtonClick}
              onSecondaryButtonClick={handleSecondaryButtonClick}
            />
          </>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Page;

const usePutMarketingAgreement = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (isAgreedMarketing: boolean) => putUser({ isAgreedMarketing }),
    onSuccess,
    onError,
  });
};
