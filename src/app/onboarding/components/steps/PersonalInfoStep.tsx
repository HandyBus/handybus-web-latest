'use client';

import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.type';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import { useFormContext } from 'react-hook-form';
import CheckedIcon from '../../icons/checked.svg';
import UncheckedIcon from '../../icons/unchecked.svg';
import { useState } from 'react';
import PrivacyPolicyBottomSheet from '../PrivacyPolicyBottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import ServicePolicyBottomSheet from '../ServicePolicyBottomSheet';

interface Props {
  triggerSubmitForm: () => void;
  disabled: boolean;
}

const PersonalInfoStep = ({ triggerSubmitForm, disabled }: Props) => {
  const { trigger } = useFormContext<OnboardingFormValues>();

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['gender', 'age']);
    if (isStepValid) {
      triggerSubmitForm();
    }
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
      <OnboardingFrame
        handleSubmit={handleCheckStep}
        buttonText="가입 완료"
        disabled={!isAgreementChecked || disabled}
      >
        <PersonalInfoContent
          title={
            <>
              마지막으로
              <br />
              {/* TODO: 김민수님에 대해 알려주세요! */}
              회원님에 대해 알려주세요!
            </>
          }
        />
        <div className="mt-auto flex items-center justify-center gap-4">
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

export default PersonalInfoStep;
