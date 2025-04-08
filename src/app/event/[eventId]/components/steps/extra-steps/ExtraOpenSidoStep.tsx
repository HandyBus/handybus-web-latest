'use client';

import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';
import SidoButton from '../../SidoButton';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';

interface Props {
  toNextStep: () => void;
}

const ExtraOpenSidoStep = ({ toNextStep }: Props) => {
  const { setValue, getValues } = useFormContext<EventFormValues>();

  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const openRegions = useMemo(() => {
    const dailyEvent = getValues('dailyEvent');
    const sidosWithHubs = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];
    if (!sidosWithHubs) {
      return [];
    }
    const openSidos: BigRegionsType[] = Object.keys(
      sidosWithHubs,
    ) as BigRegionsType[];
    const sortedSidos = openSidos.sort((a, b) => {
      const aIndex = BIG_REGIONS.indexOf(a);
      const bIndex = BIG_REGIONS.indexOf(b);
      return aIndex - bIndex;
    });
    return sortedSidos;
  }, [dailyEventIdsWithHubs]);

  const handleOpenSidoClick = (sido: BigRegionsType) => {
    setValue('openSido', sido);
    toNextStep();
  };

  return (
    <section className="grid grid-cols-3 gap-8">
      {openRegions.map((sido) => (
        <SidoButton
          key={sido}
          sido={sido}
          onClick={() => handleOpenSidoClick(sido)}
        />
      ))}
    </section>
  );
};

export default ExtraOpenSidoStep;
