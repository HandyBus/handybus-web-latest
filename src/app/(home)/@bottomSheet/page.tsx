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
import { useGetUser } from '@/services/user-management.service';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FirstSignupCoupon from './icons/first-signup-coupon.svg';

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
      <>
        웰컴기프트로 쿠폰함에 10,000원을 쏙 넣어드렸어요.
        <br />
        셔틀 예약 시 바로 적용할 수 있어요.
      </>
    ),
  },
};

const Page = () => {
  const { bottomSheetRef, openBottomSheet } = useBottomSheet();

  useEffect(() => {
    setTimeout(() => {
      openBottomSheet();
    }, 0);
  }, []);

  const { Funnel, Step, stepName } = useFunnel(ONBOARDING_STEP);

  const handleEnter = () => {
    console.log('enter');
  };

  const { control, setValue } = useForm<{ nickname: string }>();

  const { data: user } = useGetUser();

  useEffect(() => {
    if (user) {
      setValue('nickname', user.nickname || '');
    }
  }, [user]);

  const [editMode, setEditMode] = useState(false);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      title={BOTTOM_SHEET_TEXT[stepName].title}
      description={BOTTOM_SHEET_TEXT[stepName].description}
    >
      <Funnel>
        <Step name="닉네임 설정">
          <form>
            <div className="relative py-8">
              <TextInput
                name="nickname"
                control={control}
                setValue={setValue}
                onKeyDown={handleEnter}
                placeholder="영문/한글/숫자 포함 2 ~ 12자"
                inputClassName="pr-84 disabled:bg-white"
                rules={{
                  required: ERROR_MESSAGES.nickname.required,
                  pattern: {
                    value: REG_EXP.nickname,
                    message: ERROR_MESSAGES.nickname.pattern,
                  },
                }}
                disabled={!editMode}
              />
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="absolute right-12 top-1/2 flex h-32 w-56 -translate-y-1/2 items-center justify-center rounded-[6px] bg-[#F3F3F3] text-12 font-600"
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
          <div className="flex gap-8 py-16">
            <Button variant="secondary">쿠폰함 가기</Button>
            <Button>확인했어요</Button>
          </div>
        </Step>
      </Funnel>
    </BottomSheet>
  );
};

export default Page;
