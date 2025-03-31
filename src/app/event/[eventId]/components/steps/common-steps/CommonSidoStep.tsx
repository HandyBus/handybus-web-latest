'use client';

import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';
import SidoButton from '../../SidoButton';
import { useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdWithHubsAtom } from '../../../store/dailyEventIdWithHubsAtom';

interface Props {
  toDemandHubsStep: () => void;
  toReservationHubsStep: () => void;
  toExtraSidoInfoStep: () => void;
  toExtraUnreservableRegionStep: () => void;
}

const CommonSidoStep = ({
  toDemandHubsStep,
  toReservationHubsStep,
  toExtraSidoInfoStep,
  toExtraUnreservableRegionStep,
}: Props) => {
  const dailyEventIdWithHubs = useAtomValue(dailyEventIdWithHubsAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();

  const handleSidoClick = (sido: BigRegionsType) => {
    setValue('sido', sido);
    setValue('openSido', undefined);

    const dailyEvent = getValues('dailyEvent');
    const isDemandOpen = dailyEvent.status === 'OPEN';
    const sidosWithGungus = dailyEventIdWithHubs?.[dailyEvent.dailyEventId];
    const isReservationOpen = Object.keys(sidosWithGungus ?? {}).length > 0;

    if (!isReservationOpen && !isDemandOpen) {
      return;
    }

    if (!isReservationOpen && isDemandOpen) {
      toDemandHubsStep();
      return;
    }

    const gungusWithHubs = sidosWithGungus?.[sido];
    const isRoutesAvailable = Object.keys(gungusWithHubs ?? {}).length > 0;

    if (!isRoutesAvailable && isDemandOpen) {
      toExtraSidoInfoStep();
      return;
    } else if (!isRoutesAvailable && !isDemandOpen) {
      toExtraUnreservableRegionStep();
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
