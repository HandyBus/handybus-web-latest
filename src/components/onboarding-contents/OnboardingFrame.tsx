'use client';

import Button from '@/components/buttons/button/Button';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  handleSubmit?: () => void;
  handlePrevStep?: () => void;
  disabled?: boolean;
  buttonType?: 'button' | 'submit' | 'reset';
  buttonText?: string;
}

const OnboardingFrame = ({
  children,
  handleSubmit,
  handlePrevStep,
  disabled = false,
  buttonType = 'button',
  buttonText,
}: Props) => {
  return (
    <>
      <div className="relative flex grow flex-col">{children}</div>
      <div className="mt-auto flex w-full flex-col items-center bg-basic-white">
        {buttonText && (
          <div className="w-full p-16">
            <Button
              type={buttonType}
              onClick={handleSubmit}
              disabled={disabled}
            >
              {buttonText}
            </Button>
          </div>
        )}
        {handlePrevStep && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="text-center text-12 text-basic-grey-400 underline underline-offset-2"
          >
            이전으로
          </button>
        )}
      </div>
    </>
  );
};

export default OnboardingFrame;
