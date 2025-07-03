'use client';

import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithHubsAtom } from '../../../store/dailyEventIdsWithHubsAtom';
import { useAtomValue } from 'jotai';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { useMemo } from 'react';

interface Props {
  toReservationHubsStep: () => void;
}

const ExtraSelectProductStep = ({ toReservationHubsStep }: Props) => {
  const { getValues } = useFormContext<EventFormValues>();

  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);

  const { isHandyPartyAvailable, isShuttleBusAvailable } = useMemo(() => {
    if (!dailyEventIdsWithHubs) {
      return {
        isHandyPartyAvailable: false,
        isShuttleBusAvailable: false,
      };
    }

    const [dailyEvent, sido, openSido] = getValues([
      'dailyEvent',
      'sido',
      'openSido',
    ]);
    const prioritySido = openSido ?? sido;
    const sidosWithGungus = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];
    const gungusWithHubs = sidosWithGungus?.[prioritySido];

    const isHandyPartyAvailable = Object.values(gungusWithHubs ?? {}).some(
      (hubs) => {
        const flattenedHubs = hubs.flatMap((hubsOfRoute) => hubsOfRoute);
        return flattenedHubs.some((hub) =>
          hub.name.includes(HANDY_PARTY_PREFIX),
        );
      },
    );

    const isShuttleBusAvailable = Object.values(gungusWithHubs ?? {}).some(
      (hubs) => {
        const flattenedHubs = hubs.flatMap((hubsOfRoute) => hubsOfRoute);
        return flattenedHubs.some(
          (hub) => !hub.name.includes(HANDY_PARTY_PREFIX),
        );
      },
    );

    return { isHandyPartyAvailable, isShuttleBusAvailable };
  }, [dailyEventIdsWithHubs, getValues]);

  return (
    <section className="flex gap-8">
      <button
        type="button"
        className="h-100 flex-1 rounded-6 border disabled:bg-basic-grey-200"
        disabled={!isHandyPartyAvailable}
      >
        핸디팟
      </button>
      <button
        onClick={toReservationHubsStep}
        type="button"
        className="h-100 flex-1 rounded-6 border disabled:bg-basic-grey-200"
        disabled={!isShuttleBusAvailable}
      >
        셔틀버스
      </button>
    </section>
  );
};

export default ExtraSelectProductStep;
