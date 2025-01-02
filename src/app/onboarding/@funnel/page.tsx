import { getUser } from '@/services/users';
import OnboardingFunnel from './components/OnboardingFunnel';
import { parseProgress } from '@/utils/parseProgress';
import { redirect } from 'next/navigation';
import { removeOnboardingToken } from '@/utils/handleToken';

const Funnel = async () => {
  const user = await getUser();
  const progress = parseProgress(user.progresses);
  if (progress === 'ONBOARDING_COMPLETE') {
    await removeOnboardingToken();
    return redirect('/mypage');
  }
  return (
    <OnboardingFunnel
      progress={progress}
      initialPhoneNumber={user?.phoneNumber}
    />
  );
};

export default Funnel;
