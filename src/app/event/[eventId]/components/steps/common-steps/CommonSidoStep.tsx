'use client';

import { BIG_REGIONS, BigRegionsType } from '@/constants/regions';
import SidoButton from '../../SidoButton';
import { useAtomValue } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import {
  getRecentlyViewedBigRegion,
  setRecentlyViewedBigRegion,
} from '@/utils/localStorage';

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
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();

  const handleSidoClick = (sido: BigRegionsType) => {
    setValue('sido', sido);
    setValue('openSido', undefined);
    setRecentlyViewedBigRegion(sido);

    const dailyEvent = getValues('dailyEvent');
    const isDemandOpen = dailyEvent.status === 'OPEN';
    const sidosWithGungus = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];
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

  const recentlyViewedSido = getRecentlyViewedBigRegion();

  return (
    <section>
      {recentlyViewedSido && (
        <article>
          <h4 className="mb-8 text-16 font-600 text-basic-grey-700">
            최근에 본 지역
          </h4>
          <div className="grid grid-cols-3 gap-8">
            <SidoButton
              key={recentlyViewedSido}
              sido={recentlyViewedSido}
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
