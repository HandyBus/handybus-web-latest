'use client';

import {
  BIG_REGIONS,
  BIG_REGIONS_TO_SHORT_NAME,
  BigRegionsType,
} from '@/constants/regions';

const CommonSidoStep = () => {
  return (
    <section className="grid grid-cols-3 gap-8">
      {BIG_REGIONS.map((sido) => (
        <SidoButton key={sido} sido={sido} onClick={() => {}} />
      ))}
    </section>
  );
};

export default CommonSidoStep;

interface SidoButtonProps {
  sido: BigRegionsType;
  onClick: () => void;
}

const SidoButton = ({ sido, onClick }: SidoButtonProps) => {
  return (
    <button
      type="button"
      className="h-[50px] flex-1 rounded-8 bg-basic-grey-100 text-16 font-600 text-basic-grey-700 active:bg-basic-grey-200"
      onClick={onClick}
    >
      {BIG_REGIONS_TO_SHORT_NAME[sido]}
    </button>
  );
};
