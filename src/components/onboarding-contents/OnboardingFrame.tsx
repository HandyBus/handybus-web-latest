'use client';

import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  handleSubmit?: () => void;
  handlePrevStep?: () => void;
  indicatorMax?: number;
  indicatorValue?: number;
  disabled?: boolean;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonText?: string;
}

const OnboardingFrame = ({
  children,
  handleSubmit,
  handlePrevStep,
  indicatorMax,
  indicatorValue,
  disabled = false,
  buttonType = 'button',
  buttonText = '다음으로',
}: Props) => {
  const showIndicator = indicatorMax && indicatorValue;
  return (
    <>
      <div className="relative flex grow flex-col">{children}</div>
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-basic-white">
        {showIndicator && (
          <div className="py-16">
            <Indicator max={indicatorMax} value={indicatorValue} />
          </div>
        )}
        <div className="w-full px-32 pb-4 pt-8">
          <Button type={buttonType} onClick={handleSubmit} disabled={disabled}>
            {buttonText}
          </Button>
        </div>
        {handlePrevStep && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="text-basic-grey-400 text-center text-12 underline underline-offset-2"
          >
            이전으로
          </button>
        )}
      </div>
    </>
  );
};

export default OnboardingFrame;
