'use client';

import useFunnel from '@/hooks/useFunnel';

const ONBOARDING_STEPS = [
  '프로필 정보',
  '개인 정보',
  '거주지',
  '최애 가수',
] as const;

const OnboardingFunnel = () => {
  const { Funnel, Step, handleNextStep, handlePrevStep } =
    useFunnel(ONBOARDING_STEPS);

  return (
    <form noValidate className="h-full w-full bg-white">
      <Funnel>
        <Step name="프로필 정보">
          <div>
            1 프로필 정보
            <button type="button" onClick={handlePrevStep}>
              이전으로
            </button>
            <button type="button" onClick={handleNextStep}>
              다음으로
            </button>
          </div>
        </Step>
        <Step name="개인 정보">
          <div>
            2 개인 정보
            <button type="button" onClick={handlePrevStep}>
              이전으로
            </button>
            <button type="button" onClick={handleNextStep}>
              다음으로
            </button>
          </div>
        </Step>
        <Step name="거주지">
          <div>
            3 거주지
            <button type="button" onClick={handlePrevStep}>
              이전으로
            </button>
            <button type="button" onClick={handleNextStep}>
              다음으로
            </button>
          </div>
        </Step>
        <Step name="최애 가수">
          <div>
            4 최애 가수
            <button type="button" onClick={handlePrevStep}>
              이전으로
            </button>
            <button type="button" onClick={handleNextStep}>
              다음으로
            </button>
          </div>
        </Step>
      </Funnel>
    </form>
  );
};

export default OnboardingFunnel;
