import OnboardingFunnel from './components/OnboardingFunnel';
import { parseProgress } from '@/utils/parseProgress.util';
import { redirect } from 'next/navigation';
import { removeOnboardingToken } from '@/utils/handleToken.util';
import { getUser } from '@/services/user-management.service';

const Funnel = async () => {
  const user = await getUser();
  const onboardingProgress = parseProgress(user.progresses);
  if (onboardingProgress === 'ONBOARDING_COMPLETE') {
    await removeOnboardingToken();
    return redirect('/mypage');
  }
  return (
    <OnboardingFunnel
      onboardingProgress={onboardingProgress}
      initialPhoneNumber={user?.phoneNumber}
    />
  );
};

export default Funnel;
