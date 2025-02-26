'use client';

import OnboardingFunnel from './components/OnboardingFunnel';
import { parseProgress } from '@/utils/parseProgress.util';
import { useGetUser } from '@/services/user-management.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

const Page = () => {
  const { data: user, isLoading } = useGetUser({ skipCheckOnboarding: true });
  const onboardingProgress = user?.progresses
    ? parseProgress(user.progresses)
    : null;

  return (
    <div className="relative flex h-full w-full grow flex-col pt-36">
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {onboardingProgress && (
          <OnboardingFunnel onboardingProgress={onboardingProgress} />
        )}
      </DeferredSuspense>
    </div>
  );
};

export default Page;
