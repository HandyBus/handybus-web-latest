import { ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
  description?: string | ReactNode;
}

const OnboardingTitle = ({ title, description }: Props) => {
  return (
    <div className="px-28 py-16">
      <h2 className="pb-[6px] text-26 font-700 text-grey-700">{title}</h2>
      <p className="text-14 font-600 text-grey-500">{description}</p>
    </div>
  );
};

export default OnboardingTitle;
