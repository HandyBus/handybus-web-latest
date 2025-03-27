'use client';

import { BIG_REGIONS } from '@/constants/regions';
import SidoButton from '../../SidoButton';

interface Props {
  toDemandHubsStep: () => void;
  toReservationHubsStep: () => void;
  toExtraSidoInfoStep: () => void;
}

const CommonSidoStep = ({
  toDemandHubsStep,
  toReservationHubsStep,
  toExtraSidoInfoStep,
}: Props) => {
  return (
    <section className="grid grid-cols-3 gap-8">
      {BIG_REGIONS.map((sido, index) => (
        <SidoButton
          key={sido}
          sido={sido}
          onClick={() => {
            if (index === 0) toDemandHubsStep();
            if (index === 1) toReservationHubsStep();
            if (index === 2) toExtraSidoInfoStep();
          }}
        />
      ))}
    </section>
  );
};

export default CommonSidoStep;
