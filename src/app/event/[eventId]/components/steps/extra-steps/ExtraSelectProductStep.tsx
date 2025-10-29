'use client';

import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import {
  dailyEventIdsWithHubsAtom,
  HubWithInfo,
} from '../../../store/dailyEventIdsWithHubsAtom';
import { useAtomValue } from 'jotai';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { useMemo, useState } from 'react';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import dayjs from 'dayjs';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import HandyPartyIcon from '../../../icons/handy-party.svg';
import ShuttleBusIcon from '../../../icons/shuttle-bus.svg';
import HandyPartyModal from '../../handy-party/HandyPartyModal';

interface Props {
  toReservationHubsStep: () => void;
  closeBottomSheet: () => void;
}

const ExtraSelectProductStep = ({
  toReservationHubsStep,
  closeBottomSheet,
}: Props) => {
  const { getValues } = useFormContext<EventFormValues>();

  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);

  const {
    isHandyPartyAvailable,
    isShuttleBusAvailable,
    handyPartyMinPrice,
    shuttleBusMinPrice,
    handyPartyRoutes,
  } = useMemo(() => {
    if (!dailyEventIdsWithHubs) {
      return {
        isHandyPartyAvailable: false,
        isShuttleBusAvailable: false,
        handyPartyMinPrice: undefined,
        shuttleBusMinPrice: undefined,
        handyPartyRoutes: [],
      };
    }

    const [dailyEvent, sido, openSido] = getValues([
      'dailyEvent',
      'sido',
      'openSido',
    ]);

    const routes = dailyEventIdsWithRoutes?.[dailyEvent.dailyEventId];

    const handyPartyRoutes = routes.filter((route) =>
      route.name.includes(HANDY_PARTY_PREFIX),
    );

    const prioritySido = openSido ?? sido;
    const sidosWithGungus = dailyEventIdsWithHubs?.[dailyEvent.dailyEventId];
    const gungusWithHubs = sidosWithGungus?.[prioritySido];
    const flattenedHubs = Object.values(gungusWithHubs ?? {}).flatMap((hubs) =>
      hubs.flatMap((hubsOfRoute) => hubsOfRoute),
    );

    const handyPartyHubs = flattenedHubs.filter((hub) =>
      hub.name.includes(HANDY_PARTY_PREFIX),
    );
    const shuttleBusHubs = flattenedHubs.filter(
      (hub) => !hub.name.includes(HANDY_PARTY_PREFIX),
    );

    const isHandyPartyAvailable = handyPartyHubs.length > 0;
    const isShuttleBusAvailable = shuttleBusHubs.length > 0;

    const handyPartyMinPrice = calculateMinPrice(handyPartyHubs, routes);
    const shuttleBusMinPrice = calculateMinPrice(shuttleBusHubs, routes);

    return {
      isHandyPartyAvailable,
      isShuttleBusAvailable,
      handyPartyMinPrice,
      shuttleBusMinPrice,
      handyPartyRoutes,
    };
  }, [getValues, dailyEventIdsWithHubs, dailyEventIdsWithRoutes]);

  const [isHandyPartyModalOpen, setIsHandyPartyModalOpen] = useState(false);

  return (
    <>
      {isHandyPartyModalOpen && (
        <HandyPartyModal
          closeModal={() => setIsHandyPartyModalOpen(false)}
          closeBottomSheet={closeBottomSheet}
          handyPartyRoutes={handyPartyRoutes}
        />
      )}
      <section className="flex gap-8">
        <button
          onClick={() => setIsHandyPartyModalOpen(true)}
          type="button"
          className="flex flex-1 flex-col gap-20 rounded-8 bg-basic-grey-50 p-16 text-left active:bg-basic-grey-100 disabled:opacity-70"
          disabled={!isHandyPartyAvailable}
        >
          <HandyPartyIcon />
          <div>
            <h5 className="text-18 font-600 leading-[160%]">
              핸디팟 (집앞하차)
            </h5>
            <h6 className="text-18 font-600 leading-[160%]">
              {handyPartyMinPrice?.toLocaleString()}~
            </h6>
            <p className="text-14 font-500 text-basic-grey-700">
              5인 전용 소규모 셔틀
            </p>
          </div>
        </button>
        <button
          onClick={toReservationHubsStep}
          type="button"
          className="group relative flex flex-1 flex-col gap-20 overflow-hidden rounded-8 bg-basic-grey-50 p-16 text-left enabled:active:bg-basic-grey-100"
          disabled={!isShuttleBusAvailable}
        >
          <div className="relative group-disabled:opacity-40">
            <ShuttleBusIcon />
          </div>
          <div>
            <h5 className="text-18 font-600 leading-[160%] group-disabled:opacity-40">
              셔틀버스
            </h5>
            {isShuttleBusAvailable && (
              <h6 className="text-18 font-600 leading-[160%] group-disabled:opacity-40">
                {shuttleBusMinPrice?.toLocaleString()}~
              </h6>
            )}
            <p className="text-14 font-500 text-basic-grey-700 group-disabled:opacity-40">
              {isShuttleBusAvailable
                ? '수요 맞춤 대형버스'
                : '수요조사 인원 미달로 개설되지 않았어요.'}
            </p>
          </div>
        </button>
      </section>
    </>
  );
};

export default ExtraSelectProductStep;

const calculateMinPrice = (
  hubs: HubWithInfo[],
  routes: ShuttleRoutesViewEntity[],
) => {
  return hubs.reduce((minPrice, hub) => {
    const route = routes.find(
      (route) => route.shuttleRouteId === hub.shuttleRouteId,
    );
    const regularPrice = Math.min(
      route?.regularPriceRoundTrip ?? Infinity,
      route?.regularPriceToDestination ?? Infinity,
      route?.regularPriceFromDestination ?? Infinity,
    );
    const isEarlybird =
      route?.hasEarlybird &&
      route.earlybirdDeadline &&
      dayjs().isBefore(route.earlybirdDeadline);
    const earlybirdPrice = isEarlybird
      ? Math.min(
          route?.earlybirdPriceRoundTrip ?? Infinity,
          route?.earlybirdPriceToDestination ?? Infinity,
          route?.earlybirdPriceFromDestination ?? Infinity,
        )
      : Infinity;

    const price = Math.min(regularPrice, earlybirdPrice);
    return Math.min(minPrice, price);
  }, Infinity);
};
