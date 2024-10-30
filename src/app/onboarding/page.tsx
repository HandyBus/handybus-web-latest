import { FormProvider, useForm } from 'react-hook-form';
import OnboardingFunnel from './components/OnboardingFunnel';

const Onboarding = () => {
  const methods = useForm();

  return (
    <div className="h-full w-full bg-red-200">
      <div>hello</div>
      <FormProvider {...methods}>
        <OnboardingFunnel />
      </FormProvider>
    </div>
  );
};

export default Onboarding;
