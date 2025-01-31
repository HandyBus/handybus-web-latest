'use client';

import OnboardingFunnel from './components/OnboardingFunnel';
import { parseProgress } from '@/utils/parseProgress.util';
import { useGetUser } from '@/services/user-management.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

const Funnel = () => {
  const { data: user, isLoading } = useGetUser();
  const onboardingProgress = user?.progresses
    ? parseProgress(user.progresses)
    : null;

  return (
    <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
      {onboardingProgress && (
        <OnboardingFunnel
          onboardingProgress={onboardingProgress}
          initialPhoneNumber={user?.phoneNumber}
        />
      )}
    </DeferredSuspense>
  );
};

export default Funnel;
