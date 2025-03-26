'use client';

import Badge from '@/components/badge/Badge';

interface Props {
  toNextStep: () => void;
}

const ExtraDuplicateHubStep = ({ toNextStep }: Props) => {
  return (
    <section className="flex w-full flex-col gap-8">
      {[1, 2, 3].map((_, index) => (
        <Hub key={index} toNextStep={toNextStep} />
      ))}
    </section>
  );
};

export default ExtraDuplicateHubStep;

interface HubProps {
  toNextStep: () => void;
}

const Hub = ({ toNextStep }: HubProps) => {
  return (
    <button
      type="button"
      onClick={toNextStep}
      className="flex flex-col gap-12 rounded-8 bg-basic-grey-50 p-16 text-left"
    >
      <div className="flex gap-8">
        <Badge className="bg-basic-white text-basic-grey-700">가는 편</Badge>
        <div className="flex-1">
          <p className="text-14 font-500 text-basic-grey-700">오전 09:30</p>
          <p className="text-16 font-500">갈매순환삼거리·갈매6단지</p>
        </div>
        <div className="shrink-0 text-14 font-500 text-basic-grey-500">
          20석 남음
        </div>
      </div>
      <div className="flex gap-8">
        <Badge className="bg-basic-grey-200 text-basic-grey-700">오는 편</Badge>
        <div className="flex-1">
          <p className="text-14 font-500 text-basic-grey-700">오후 10:30</p>
          <p className="text-16 font-500">KSPO DOME</p>
        </div>
        <div className="shrink-0 text-14 font-500 text-basic-grey-500">
          20석 남음
        </div>
      </div>
    </button>
  );
};
