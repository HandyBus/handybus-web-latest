import { ReactNode } from 'react';

interface Props {
  title: string | ReactNode;
  description?: string | ReactNode;
}

const OnboardingTitle = ({ title, description }: Props) => {
  return (
    <div className="p-24">
      <h2 className="pb-[6px] text-22 font-700 leading-[140%] text-basic-black">
        {title}
      </h2>
      <p className="text-14 font-600 text-basic-grey-500">{description}</p>
    </div>
  );
};

export default OnboardingTitle;
