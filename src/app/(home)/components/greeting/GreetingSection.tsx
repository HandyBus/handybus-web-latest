'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import useBottomSheet from '@/hooks/useBottomSheet';
import { putUser } from '@/services/user.service';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  getEntryGreetingIncomplete,
  removeEntryGreetingIncomplete,
} from '@/utils/localStorage';
import { toast } from 'react-toastify';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import CheckIcon from './icons/check.svg';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { useFlow } from '@/stacks';

const BOTTOM_SHEET_TEXT_MARKETING_AGREEMENT = {
  title: '정말 중요한 내용만 알려드릴게요',
  description: '수신 동의는 마이페이지에서 언제든지 변경할 수 있어요.',
};

const GreetingSection = () => {
  const flow = useFlow();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet({
    preventCloseOnDrag: true,
  });

  const checkAndHandleEntryGreeting = () => {
    const isEntryGreetingIncomplete = getEntryGreetingIncomplete();
    const isLoggedIn = getIsLoggedIn();
    if (isEntryGreetingIncomplete && isLoggedIn) {
      setTimeout(() => {
        openBottomSheet();
      }, 0);
    }
  };
  useEffect(() => {
    checkAndHandleEntryGreeting();
  }, []);

  const {
    mutateAsync: putMarketingAgreement,
    isPending: isMarketingAgreementPending,
    isSuccess: isMarketingAgreementSuccess,
  } = usePutMarketingAgreement();
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(true);
  const handleMarketingAgreementClick = () => {
    setIsMarketingAgreed(!isMarketingAgreed);
  };
  const handleMarketingAgreementSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await putMarketingAgreement(isMarketingAgreed);
      await putEntryGreetingChecked();
      removeEntryGreetingIncomplete();
      closeBottomSheet();
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: 'GreetingPage',
          page: 'home',
          feature: 'onboarding',
          section: 'marketing-consent',
          userType: getIsLoggedIn() ? 'loggedIn' : 'anonymous',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          isMarketingAgreed,
          hasEntryGreetingIncomplete: getEntryGreetingIncomplete(),
          timestamp: dayjs().toISOString(),
        },
      });
      toast.error('잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  const {
    mutateAsync: putEntryGreetingChecked,
    isPending: isEntryGreetingCheckedPending,
    isSuccess: isEntryGreetingCheckedSuccess,
  } = useEntryGreetingToChecked();

  const isMarketingAgreementButtonDisabled =
    isMarketingAgreementPending ||
    isMarketingAgreementSuccess ||
    isEntryGreetingCheckedPending ||
    isEntryGreetingCheckedSuccess;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={BOTTOM_SHEET_TEXT_MARKETING_AGREEMENT.title}
      description={BOTTOM_SHEET_TEXT_MARKETING_AGREEMENT.description}
    >
      <form onSubmit={handleMarketingAgreementSubmit} className="mt-4">
        <button
          onClick={handleMarketingAgreementClick}
          className="flex w-full items-center justify-between rounded-6 bg-basic-grey-50 px-16 py-12"
        >
          <button
            type="button"
            onClick={handleClickAndStopPropagation(() =>
              flow.push('MarketingConsent', {}),
            )}
            className="line-clamp-1 text-left text-14 font-600 underline underline-offset-2"
          >
            마케팅 활용/광고성 정보 수신 동의
          </button>
          <CheckIcon
            className={`${isMarketingAgreed ? 'text-brand-primary-400' : 'text-[#CCCCCC]'}`}
          />
        </button>
        <Button className="my-16" disabled={isMarketingAgreementButtonDisabled}>
          확인했어요
        </Button>
      </form>
    </BottomSheet>
  );
};

export default GreetingSection;

const usePutMarketingAgreement = () => {
  return useMutation({
    mutationFn: (isAgreedMarketing: boolean) => putUser({ isAgreedMarketing }),
  });
};

const useEntryGreetingToChecked = () => {
  return useMutation({
    mutationFn: () => putUser({ entryGreetingChecked: true }),
  });
};
