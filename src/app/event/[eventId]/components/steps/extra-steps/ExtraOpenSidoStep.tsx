'use client';

import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';
import SidoButton from '../components/SidoButton';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import { HANDY_PARTY_PREFIX } from '@/constants/common';

interface Props {
  toReservationHubsStep: () => void;
  toExtraSelectProductStep: () => void;
}

const ExtraOpenSidoStep = ({
  toReservationHubsStep,
  toExtraSelectProductStep,
}: Props) => {
  const { setValue, getValues } = useFormContext<EventFormValues>();

  const dailyEvent = getValues('dailyEvent');
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const sidosWithGungus = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];

  const openRegions = useMemo(() => {
    if (!sidosWithGungus) {
      return [];
    }
    const openSidos: BigRegionsType[] = Object.keys(
      sidosWithGungus,
    ) as BigRegionsType[];
    const sortedSidos = openSidos.sort((a, b) => {
      const aIndex = BIG_REGIONS.indexOf(a);
      const bIndex = BIG_REGIONS.indexOf(b);
      return aIndex - bIndex;
    });
    return sortedSidos;
  }, [sidosWithGungus]);

  const handleOpenSidoClick = (sido: BigRegionsType) => {
    setValue('openSido', sido);

    const gungusWithHubs = sidosWithGungus?.[sido];
    const isRoutesAvailable = Object.keys(gungusWithHubs ?? {}).length > 0;

    if (!isRoutesAvailable) {
      return;
    }

    const isHandyPartyAvailable = Object.values(gungusWithHubs ?? {}).some(
      (hubs) => {
        const flattenedHubs = hubs.flatMap((hubsOfRoute) => hubsOfRoute);
        return flattenedHubs.some((hub) =>
          hub.name.includes(HANDY_PARTY_PREFIX),
        );
      },
    );

    if (isHandyPartyAvailable) {
      toExtraSelectProductStep();
    } else {
      toReservationHubsStep();
    }
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
