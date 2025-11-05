'use client';

import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';
import SidoButton from '../components/SidoButton';
import { useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import {
  getRecentlyViewedBigRegion,
  setRecentlyViewedBigRegion,
} from '@/utils/localStorage';
import { HANDY_PARTY_PREFIX } from '@/constants/common';

interface Props {
  toDemandHubsStep: () => void;
  toReservationHubsStep: () => void;
  toExtraSidoInfoStep: () => void;
  toExtraSelectProductStep: () => void;
}

const CommonSidoStep = ({
  toDemandHubsStep,
  toReservationHubsStep,
  toExtraSidoInfoStep,
  toExtraSelectProductStep,
}: Props) => {
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const dailyEvent = getValues('dailyEvent');
  const isDemandOpen = dailyEvent.status === 'OPEN';
  const sidosWithGungus = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];
  const isReservationOpen = Object.keys(sidosWithGungus ?? {}).length > 0;

  const handleSidoClick = (sido: BigRegionsType) => {
    setValue('sido', sido);
    setValue('openSido', undefined);
    setRecentlyViewedBigRegion(sido);

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
    }

    const isHandyPartyAvailable = Object.values(gungusWithHubs ?? {}).some(
      (hubs) => {
        const flattenedHubs = hubs.flatMap((hub) => hub);
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

  const recentlyViewedSido = getRecentlyViewedBigRegion();

  const checkIsSidoDisabled = (sido: BigRegionsType) => {
    if (isDemandOpen) {
      return false;
    }

    const gungusWithHubs = sidosWithGungus?.[sido];
    const isRoutesAvailable = Object.keys(gungusWithHubs ?? {}).length > 0;

    return !isRoutesAvailable;
  };

  return (
    <section>
      {recentlyViewedSido && (
        <article>
          <h4 className="mb-8 text-16 font-600 text-basic-grey-600">
            최근에 본 지역
          </h4>
          <div className="grid grid-cols-3 gap-8">
            <SidoButton
              key={recentlyViewedSido}
              sido={recentlyViewedSido}
              disabled={checkIsSidoDisabled(recentlyViewedSido)}
              onClick={() => {
                handleSidoClick(recentlyViewedSido);
              }}
            />
          </div>
          <div className="my-16 h-[1px] w-full bg-basic-grey-100" />
        </article>
      )}
      <article className="grid grid-cols-3 gap-8">
        {BIG_REGIONS.map((sido) => (
          <SidoButton
            key={sido}
            sido={sido}
            disabled={checkIsSidoDisabled(sido)}
            onClick={() => {
              handleSidoClick(sido);
            }}
          />
        ))}
      </article>
    </section>
  );
};

export default CommonSidoStep;
