'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import {
  ERROR_MESSAGES,
  REG_EXP,
} from '@/components/onboarding-contents/formValidation.constants';
import useBottomSheet from '@/hooks/useBottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { putUser, useGetUser } from '@/services/user-management.service';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FirstSignupCoupon from './icons/first-signup-coupon.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getFirstSignup, removeFirstSignup } from '@/utils/localStorage';

const ONBOARDING_STEP = ['닉네임 설정', '첫 가입 감사 쿠폰'] as const;
const BOTTOM_SHEET_TEXT: Record<
  (typeof ONBOARDING_STEP)[number],
  { title: ReactNode; description: ReactNode }
> = {
  '닉네임 설정': {
    title: '환영합니다! 어떻게 불러드릴까요?',
    description: '닉네임은 마이페이지에서 언제든지 변경할 수 있어요.',
  },
  '첫 가입 감사 쿠폰': {
    title: '여러분을 위한 작은 선물이에요.',
    description: (
      <p className="leading-[22px]">
        웰컴기프트로 쿠폰함에 10,000원을 쏙 넣어드렸어요.
        <br />
        셔틀 예약 시 바로 적용할 수 있어요.
      </p>
    ),
  },
};

const Page = () => {
  const router = useRouter();
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet({
    preventCloseOnDrag: true,
  });
  const handleIsFirstSignup = () => {
    const isFirstSignup = getFirstSignup();
    if (isFirstSignup) {
      setTimeout(() => {
        openBottomSheet();
      }, 0);
    }
  };
  useEffect(() => {
    handleIsFirstSignup();
  }, []);

  const { Funnel, Step, stepName, handleNextStep } = useFunnel(ONBOARDING_STEP);
  const { control, setValue, handleSubmit, setError, clearErrors } = useForm<{
    nickname: string;
  }>();
  const { data: user } = useGetUser();
  useEffect(() => {
    if (user) {
      setValue('nickname', user.nickname || '');
    }
  }, [user]);

  const [editMode, setEditMode] = useState(false);

  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const setNicknameDuplicateError = () => {
    setError('nickname', {
      type: 'duplicate',
      message: ERROR_MESSAGES.nickname.duplicate,
    });
    setIsNicknameDuplicate(true);
  };
  const handleValidStep = () => {
    clearErrors();
    handleNextStep();
  };
  const {
    mutate: putNickname,
    isPending,
    isSuccess,
  } = usePutNickname({
    onSuccess: handleValidStep,
    onError: setNicknameDuplicateError,
  });

  const onNicknameSubmit = handleSubmit((data: { nickname: string }) => {
    if (!editMode) {
      handleNextStep();
      return;
    }
    putNickname(data.nickname);
  });
  const isNicknameInputDisabled = isPending || isSuccess || !editMode;

  const handleCouponLinkClick = () => {
    removeFirstSignup();
    closeBottomSheet();
    router.push('/mypage/coupons');
  };
  const handleCouponConfirmClick = () => {
    removeFirstSignup();
    closeBottomSheet();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={BOTTOM_SHEET_TEXT[stepName].title}
      description={BOTTOM_SHEET_TEXT[stepName].description}
    >
      <Funnel>
        <Step name="닉네임 설정">
          <form onSubmit={onNicknameSubmit}>
            <div className={`relative ${isNicknameDuplicate ? 'h-76' : ''}`}>
              <TextInput
                name="nickname"
                control={control}
                setValue={setValue}
                placeholder="영문/한글/숫자 포함 2 ~ 12자"
                inputClassName="pr-84 disabled:bg-white"
                rules={{
                  required: ERROR_MESSAGES.nickname.required,
                  pattern: {
                    value: REG_EXP.nickname,
                    message: ERROR_MESSAGES.nickname.pattern,
                  },
                }}
                disabled={isNicknameInputDisabled}
                defaultValue={user?.nickname || ''}
              />
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="absolute right-12 top-8 flex h-32 w-56 items-center justify-center rounded-[6px] bg-[#F3F3F3] text-12 font-600"
                >
                  수정
                </button>
              )}
            </div>
            <Button className="my-16">이걸로 할게요</Button>
          </form>
        </Step>
        <Step name="첫 가입 감사 쿠폰">
          <div className="mx-auto py-16">
            <FirstSignupCoupon />
          </div>
          <span className="text-10 font-400 text-grey-400">
            * 전화번호 당 하나씩만 받을 수 있어요.
          </span>
          <div className="flex gap-8 py-16">
            <Button variant="secondary" onClick={handleCouponLinkClick}>
              쿠폰함 가기
            </Button>
            <Button onClick={handleCouponConfirmClick}>확인했어요</Button>
          </div>
        </Step>
      </Funnel>
    </BottomSheet>
  );
};

export default Page;

const usePutNickname = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nickname: string) => putUser({ nickname }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
      onSuccess?.();
    },
    onError,
  });
};
