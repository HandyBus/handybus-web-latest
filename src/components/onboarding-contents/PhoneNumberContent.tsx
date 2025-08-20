'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './onboarding.type';
import OnboardingTitle from './OnboardingTitle';
import Button from '../buttons/button/Button';
import { ReactNode, useState } from 'react';

interface Props {
  title: string | ReactNode;
  handleNextStep: () => void;
  disabled?: boolean;
}

const PhoneNumberContent = ({
  title,
  handleNextStep,
  disabled = false,
}: Props) => {
  const { control } = useFormContext<OnboardingFormValues>();
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');

    if (numbers.length > 11) {
      return value;
    }

    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  };

  const isPhoneNumberComplete = (phoneNumber: string) => {
    const numbers = phoneNumber.replace(/[^0-9]/g, '');
    return numbers.length === 11;
  };

  const handlePhoneNumberChange = (
    value: string,
    onChange: (value: string) => void,
  ) => {
    const formatted = formatPhoneNumber(value);
    onChange(formatted);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string,
  ) => {
    // 숫자와 백스페이스, 삭제 키만 허용
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
    if (e.key === 'Enter' && isPhoneNumberComplete(value)) {
      handleNextStep();
    }
  };

  return (
    <>
      <OnboardingTitle title={title} />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <div
            className={`mx-24 flex items-center gap-12 border-b p-12 ${
              isFocused ? 'border-brand-primary-400' : 'border-basic-grey-200'
            }`}
          >
            <input
              className="flex h-[26px] grow items-center text-16 font-500 outline-none placeholder:text-basic-grey-400"
              placeholder="010-0000-0000"
              type="tel"
              inputMode="numeric"
              maxLength={13}
              value={field.value || ''}
              onChange={(e) =>
                handlePhoneNumberChange(e.target.value, field.onChange)
              }
              onKeyDown={(e) => handleKeyDown(e, field.value || '')}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <Button
              type="button"
              variant="primary"
              size="small"
              disabled={!isPhoneNumberComplete(field.value || '') || disabled}
              onClick={handleNextStep}
            >
              인증하기
            </Button>
          </div>
        )}
      />
    </>
  );
};

export default PhoneNumberContent;
