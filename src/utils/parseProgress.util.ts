import { ProgressType } from '@/types/user-management.type';

export type OnboardingProgress =
  | 'AGREEMENT_INCOMPLETE'
  | 'AGREEMENT_COMPLETE'
  | 'ONBOARDING_COMPLETE';

export const parseProgress = (
  progresses: {
    isCompleted: boolean;
    progressType: ProgressType;
  }[],
): OnboardingProgress => {
  const isAgreedServiceTerms = progresses.find(
    (el) => el.progressType === 'SERVICE_TERMS_AGREEMENT',
  )?.isCompleted;
  const isAgreedPersonalInfo = progresses.find(
    (el) => el.progressType === 'PERSONAL_INFO_CONSENT',
  )?.isCompleted;
  const isOnboardingComplete = progresses.find(
    (el) => el.progressType === 'ONBOARDING_COMPLETE',
  )?.isCompleted;

  if (isOnboardingComplete) {
    return 'ONBOARDING_COMPLETE';
  }
  if (isAgreedServiceTerms && isAgreedPersonalInfo) {
    return 'AGREEMENT_COMPLETE';
  }
  return 'AGREEMENT_INCOMPLETE';
};
