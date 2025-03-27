'use client';

import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';
import SidoButton from '../../SidoButton';
import { datesWithHubsAtom } from '../../../store/datesWithHubsAtom';
import { useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../EventForm';

interface Props {
  toDemandHubsStep: () => void;
  toReservationHubsStep: () => void;
  toExtraSidoInfoStep: () => void;
  isReservationOpen: boolean;
}

const CommonSidoStep = ({
  toDemandHubsStep,
  toReservationHubsStep,
  toExtraSidoInfoStep,
  isReservationOpen,
}: Props) => {
  const datesWithHubs = useAtomValue(datesWithHubsAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();

  const handleSidoClick = (sido: BigRegionsType) => {
    setValue('sido', sido);

    if (!isReservationOpen) {
      toDemandHubsStep();
      return;
    }

    const date = getValues('date');
    const hubsWithInfo = datesWithHubs?.[date]?.[sido];
    if (!hubsWithInfo) {
      toExtraSidoInfoStep();
      return;
    }

    toReservationHubsStep();
  };

  return (
    <section className="grid grid-cols-3 gap-8">
      {BIG_REGIONS.map((sido) => (
        <SidoButton
          key={sido}
          sido={sido}
          onClick={() => {
            handleSidoClick(sido);
          }}
        />
      ))}
    </section>
  );
};

export default CommonSidoStep;
