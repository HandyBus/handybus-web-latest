'use client';

import { BIG_REGIONS } from '@/constants/regions';
import SidoButton from '../../SidoButton';

interface Props {
  toNextStep: () => void;
}

const ExtraOpenSidoStep = ({ toNextStep }: Props) => {
  const openRegions = BIG_REGIONS.slice(0, 8);
  return (
    <section className="grid grid-cols-3 gap-8">
      {openRegions.map((sido) => (
        <SidoButton key={sido} sido={sido} onClick={toNextStep} />
      ))}
    </section>
  );
};

export default ExtraOpenSidoStep;
