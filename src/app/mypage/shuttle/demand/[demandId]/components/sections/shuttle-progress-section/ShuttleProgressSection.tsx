'use client';

import useText from './hooks/useText';

import { ShuttleDemandsViewEntity } from '@/types/demand.type';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const ShuttleProgressSection = ({ demand }: Props) => {
  const text = useText({ demand });
  return (
    <section className="flex flex-col gap-16 px-16">
      <h3 className="text-16 font-600">셔틀 진행 상황</h3>
      <h5 className="text-16 font-600">{text.progressText}</h5>
      <p className="text-14 font-500 text-basic-grey-700">
        {text.descriptionText}
      </p>
    </section>
  );
};

export default ShuttleProgressSection;
