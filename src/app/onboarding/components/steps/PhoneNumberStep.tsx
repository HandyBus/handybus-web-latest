'use client';

import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PhoneNumberContent from '@/components/onboarding-contents/PhoneNumberContent';
import * as PortOne from '@portone/browser-sdk/v2';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.type';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useState } from 'react';
import CheckedIcon from '../../icons/checked.svg';
import UncheckedIcon from '../../icons/unchecked.svg';
import PrivacyPolicyBottomSheet from '../PrivacyPolicyBottomSheet';
import ServicePolicyBottomSheet from '../ServicePolicyBottomSheet';

const PhoneNumberStep = () => {
  const router = useRouter();
  const { getValues } = useFormContext<OnboardingFormValues>();

  const handlePhoneNumberValidation = async () => {
    const redirectUrl =
      process.env.NEXT_PUBLIC_PORTONE_IDENTITY_VERIFICATION_REDIRECT_URI;
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const danalChannelKey = process.env.NEXT_PUBLIC_PORTONE_DANAL_CHANNEL_KEY;

    if (!redirectUrl || !storeId || !danalChannelKey) {
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    const phoneNumber = getValues('phoneNumber').replace(/-/g, '');

    // 모바일 환경에서는 자동으로 리다이렉트 됨
    const response = await PortOne.requestIdentityVerification({
      storeId,
      identityVerificationId: `identity-verification-${crypto.randomUUID()}`,
      channelKey: danalChannelKey,
      redirectUrl,
      popup: {
        center: true,
      },
      // 입력한 전화번호 값으로 고정
      customer: {
        phoneNumber,
      },
    });

    // PC 환경 리다이렉트 처리
    if (!response || response.code !== undefined) {
      console.error('PortOne 인증 실패: ', response);
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    router.replace(
      `${redirectUrl}?identityVerificationId=${response.identityVerificationId}`,
    );
  };

  const {
    bottomSheetRef: privacyBottomSheetRef,
    openBottomSheet: openPrivacyBottomSheet,
    contentRef: privacyBottomSheetContentRef,
  } = useBottomSheet();

  const {
    bottomSheetRef: servicePolicyBottomSheetRef,
    openBottomSheet: openServicePolicyBottomSheet,
    contentRef: servicePolicyBottomSheetContentRef,
  } = useBottomSheet();

  const [isAgreementChecked, setIsAgreementChecked] = useState(true);

  return (
    <>
      <OnboardingFrame>
        <PhoneNumberContent
          title={
            <>
              빠른 가입을 위해
              <br />
              본인 인증을 진행할게요
            </>
          }
          handleNextStep={handlePhoneNumberValidation}
          disabled={!isAgreementChecked}
        />
        <div className="mt-auto flex items-center justify-center gap-4 pb-20">
          <button
            type="button"
            onClick={() => setIsAgreementChecked((prev) => !prev)}
          >
            {isAgreementChecked ? <CheckedIcon /> : <UncheckedIcon />}
          </button>
          <p className="text-12 text-basic-grey-500">
            <button
              type="button"
              onClick={openPrivacyBottomSheet}
              className="underline underline-offset-[3px]"
            >
              개인정보 수집 및 이용 동의
            </button>{' '}
            및{' '}
            <button
              type="button"
              onClick={openServicePolicyBottomSheet}
              className="underline underline-offset-[3px]"
            >
              서비스 약관
            </button>
            에 동의합니다.
          </p>
        </div>
      </OnboardingFrame>
      <PrivacyPolicyBottomSheet
        bottomSheetRef={privacyBottomSheetRef}
        contentRef={privacyBottomSheetContentRef}
      />
      <ServicePolicyBottomSheet
        bottomSheetRef={servicePolicyBottomSheetRef}
        contentRef={servicePolicyBottomSheetContentRef}
      />
    </>
  );
};

export default PhoneNumberStep;
