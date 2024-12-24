import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '온보딩',
};
interface Props {
  top: ReactNode;
  funnel: ReactNode;
}

const OnboardingLayout = async ({ top, funnel }: Readonly<Props>) => {
  return (
    <div className="relative flex h-full w-full grow flex-col">
      {top}
      {funnel}
    </div>
  );
};

export default OnboardingLayout;
