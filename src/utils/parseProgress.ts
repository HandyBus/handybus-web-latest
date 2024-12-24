import { ProgressType } from '@/types/client.types';

export type OnboardingProgress =
  | 'AGREEMENT_INCOMPLETE'
  | 'AGREEMENT_COMPLETE'
  | 'ONBOARDING_COMPLETE';

export const parseProgress = (
  progresses: {
    id: number;
    isCompleted: boolean;
    type: ProgressType;
  }[],
): OnboardingProgress => {
  const isAgreedServiceTerms = progresses.find(
    (el) => el.type === 'SERVICE_TERMS_AGREEMENT',
  )?.isCompleted;
  const isAgreedPersonalInfo = progresses.find(
    (el) => el.type === 'PERSONAL_INFO_CONSENT',
  )?.isCompleted;
  const isOnboardingComplete = progresses.find(
    (el) => el.type === 'ONBOARDING_COMPLETE',
  )?.isCompleted;

  if (isOnboardingComplete) {
    return 'ONBOARDING_COMPLETE';
  }
  if (isAgreedServiceTerms && isAgreedPersonalInfo) {
    return 'AGREEMENT_COMPLETE';
  }
  return 'AGREEMENT_INCOMPLETE';
};
