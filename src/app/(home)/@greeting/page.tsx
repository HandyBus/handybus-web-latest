'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import {
  ERROR_MESSAGES,
  REG_EXP,
} from '@/components/onboarding-contents/formValidation.const';
import useBottomSheet from '@/hooks/useBottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { putUser, useGetUser } from '@/services/user.service';
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import {
  getEntryGreetingIncomplete,
  removeEntryGreetingIncomplete,
} from '@/utils/localStorage';
import Link from 'next/link';
import { CustomError } from '@/services/custom-error';
import { toast } from 'react-toastify';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import CheckIcon from './icons/check.svg';

const GREETING_STEP = ['마케팅 약관 동의', '닉네임 설정'] as const;
const BOTTOM_SHEET_TEXT: Record<
  (typeof GREETING_STEP)[number],
  { title: ReactNode; description: ReactNode }
> = {
  '마케팅 약관 동의': {
    title: '정말 중요한 내용만 알려드릴게요',
    description: '수신 동의는 마이페이지에서 언제든지 변경할 수 있어요.',
  },
  '닉네임 설정': {
    title: '환영합니다! 어떻게 불러드릴까요?',
    description: '닉네임은 마이페이지에서 언제든지 변경할 수 있어요.',
  },
};

const Page = () => {
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet({
    preventCloseOnDrag: true,
  });

  const [isEntryGreetingIncomplete, setIsEntryGreetingIncomplete] =
    useState(false);
  const checkAndHandleEntryGreeting = () => {
    const isEntryGreetingIncomplete = getEntryGreetingIncomplete();
    const isLoggedIn = getIsLoggedIn();
    if (isEntryGreetingIncomplete && isLoggedIn) {
      setIsEntryGreetingIncomplete(true);
      setTimeout(() => {
        openBottomSheet();
      }, 0);
    }
  };
  useEffect(() => {
    checkAndHandleEntryGreeting();
  }, []);

  const { Funnel, Step, stepName, handleNextStep } = useFunnel(GREETING_STEP);

  // 마케팅 약관 동의
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
      handleNextStep();
    } catch (error) {
      toast.error('잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };
  const isMarketingAgreementButtonDisabled =
    isMarketingAgreementPending || isMarketingAgreementSuccess;

  // 닉네임 설정
  const { control, setValue, handleSubmit, setError } = useForm<{
    nickname: string;
  }>();
  const { data: user } = useGetUser({
    enabled: isEntryGreetingIncomplete,
  });
  useEffect(() => {
    if (user) {
      setValue('nickname', user.nickname || '');
    }
  }, [user]);

  const {
    mutateAsync: putNickname,
    isPending: isNicknamePending,
    isSuccess: isNicknameSuccess,
  } = usePutNickname();
  const {
    mutateAsync: putEntryGreetingChecked,
    isPending: isEntryGreetingCheckedPending,
    isSuccess: isEntryGreetingCheckedSuccess,
  } = useEntryGreetingToChecked();

  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const setNicknameDuplicateError = () => {
    setError('nickname', {
      type: 'duplicate',
      message: ERROR_MESSAGES.nickname.duplicate,
    });
    setIsNicknameDuplicate(true);
  };

  const onNicknameSubmit = handleSubmit(async (data: { nickname: string }) => {
    try {
      await putNickname(data.nickname);
      await putEntryGreetingChecked();
      removeEntryGreetingIncomplete();
      closeBottomSheet();
    } catch (e) {
      const error = e as CustomError;
      if (error.statusCode === 409) {
        setNicknameDuplicateError();
        return;
      }
      toast.error('잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  });
  const isNicknameButtonDisabled =
    isNicknamePending ||
    isNicknameSuccess ||
    isEntryGreetingCheckedPending ||
    isEntryGreetingCheckedSuccess;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={BOTTOM_SHEET_TEXT[stepName].title}
      description={BOTTOM_SHEET_TEXT[stepName].description}
    >
      <Funnel>
        <Step name="마케팅 약관 동의">
          <form onSubmit={handleMarketingAgreementSubmit} className="mt-4">
            <button
              onClick={handleMarketingAgreementClick}
              className="flex w-full items-center justify-between rounded-6 bg-basic-grey-50 px-16 py-12"
            >
              <Link
                onClick={(e) => e.stopPropagation()}
                href="/policy"
                target="_blank"
                className="line-clamp-1 text-14 font-600 underline underline-offset-2"
              >
                마케팅 활용/광고성 정보 수신 동의
              </Link>
              <CheckIcon
                className={`${isMarketingAgreed ? 'text-[#00C896]' : 'text-[#CCCCCC]'}`}
              />
            </button>
            <Button
              className="my-16"
              disabled={isMarketingAgreementButtonDisabled}
            >
              확인했어요
            </Button>
          </form>
        </Step>
        <Step name="닉네임 설정">
          <form onSubmit={onNicknameSubmit}>
            <div className={`relative ${isNicknameDuplicate ? 'h-76' : ''}`}>
              <TextInput
                name="nickname"
                control={control}
                setValue={setValue}
                placeholder={user?.nickname || '영문/한글/숫자 포함 2 ~ 12자'}
                inputClassName="pr-84 disabled:bg-basic-white"
                rules={{
                  required: ERROR_MESSAGES.nickname.required,
                  pattern: {
                    value: REG_EXP.nickname,
                    message: ERROR_MESSAGES.nickname.pattern,
                  },
                }}
              />
            </div>
            <Button className="my-16" disabled={isNicknameButtonDisabled}>
              이걸로 할게요
            </Button>
          </form>
        </Step>
      </Funnel>
    </BottomSheet>
  );
};

export default Page;

const usePutNickname = () => {
  return useMutation({
    mutationFn: (nickname: string) => putUser({ nickname }),
  });
};

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
