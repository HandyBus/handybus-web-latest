'use client';

import Button from '@/components/buttons/button/Button';
import { useEffect, useState } from 'react';
import SimpleRouteInfo from '../../SimpleRouteInfo';
import AddIcon from '../../../icons/add.svg';
import SubtractIcon from '../../../icons/subtract.svg';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { calculatePriceOfTripType } from '@/utils/event.util';
import { EventFormValues } from '../../../form.type';
import { getRouteOfHubWithInfo } from '../../../store/dailyEventIdsWithHubsAtom';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { MAX_PASSENGER_COUNT } from '@/constants/common';
import { createPaymentPageUrl } from '../../../dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/payment.const';
import { eventAtom } from '../../../store/eventAtom';
import { useRouter } from 'next/navigation';

interface Props {
  closeBottomSheet: () => void;
}

const ReservationInfoStep = ({ closeBottomSheet }: Props) => {
  const router = useRouter();
  const event = useAtomValue(eventAtom);
  const { getValues } = useFormContext<EventFormValues>();
  const [selectedHubWithInfo, tripType, dailyEvent] = getValues([
    'selectedHubWithInfo',
    'tripType',
    'dailyEvent',
  ]);

  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);
  const route = getRouteOfHubWithInfo({
    hubWithInfo: selectedHubWithInfo,
    dailyEventIdsWithRoutes,
    dailyEventId: dailyEvent.dailyEventId,
  });
  const toDestinationHubs = route?.toDestinationShuttleRouteHubs ?? [];
  const fromDestinationHubs = route?.fromDestinationShuttleRouteHubs ?? [];

  const [passengerCount, setPassengerCount] = useState(1);
  const maxPassengerCount = Math.min(
    selectedHubWithInfo.remainingSeat[tripType] ?? 0,
    MAX_PASSENGER_COUNT,
  );

  const priceOfTripType = route ? calculatePriceOfTripType(route) : null;
  const price = priceOfTripType?.[tripType];
  const regularPrice = price?.regularPrice ?? 0;
  const earlybirdPrice = price?.earlybirdPrice ?? 0;
  const discountRate = Math.floor(
    ((regularPrice - earlybirdPrice) / regularPrice) * 100,
  );

  const isRoundTrip = tripType === 'ROUND_TRIP';
  const isEarlybird = price?.isEarlybird;

  // 가는 편 및 오는 편의 탑승하는 정류장 관리
  const [toDestinationShuttleRouteHubId, setToDestinationShuttleRouteHubId] =
    useState<string | undefined>(undefined);
  const [
    fromDestinationShuttleRouteHubId,
    setFromDestinationShuttleRouteHubId,
  ] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!route) {
      return;
    }

    const toDestinationHubId = route.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.regionHubId === selectedHubWithInfo.regionHubId,
    )?.shuttleRouteHubId;
    const fromDestinationHubId = route.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.regionHubId === selectedHubWithInfo.regionHubId,
    )?.shuttleRouteHubId;

    setToDestinationShuttleRouteHubId(toDestinationHubId);
    setFromDestinationShuttleRouteHubId(fromDestinationHubId);
  }, [route, selectedHubWithInfo.regionHubId]);

  const handleReservationClick = () => {
    if (!event || !route) {
      return;
    }

    const url = createPaymentPageUrl({
      eventId: event.eventId,
      dailyEventId: dailyEvent.dailyEventId,
      shuttleRouteId: route.shuttleRouteId,
      tripType,
      toDestinationHubId: toDestinationShuttleRouteHubId,
      fromDestinationHubId: fromDestinationShuttleRouteHubId,
      passengerCount,
    });

    closeBottomSheet();
    router.push(url);
  };

  return (
    <section className="flex w-full flex-col gap-16">
      {(isRoundTrip || tripType === 'TO_DESTINATION') &&
        toDestinationShuttleRouteHubId && (
          <SimpleRouteInfo
            tripType="TO_DESTINATION"
            isRoundTrip={isRoundTrip}
            hubs={toDestinationHubs}
            selectedShuttleRouteHubId={toDestinationShuttleRouteHubId}
            setSelectedShuttleRouteHubId={setToDestinationShuttleRouteHubId}
          />
        )}
      {(isRoundTrip || tripType === 'FROM_DESTINATION') &&
        fromDestinationShuttleRouteHubId && (
          <SimpleRouteInfo
            tripType="FROM_DESTINATION"
            isRoundTrip={isRoundTrip}
            hubs={fromDestinationHubs}
            selectedShuttleRouteHubId={fromDestinationShuttleRouteHubId}
            setSelectedShuttleRouteHubId={setFromDestinationShuttleRouteHubId}
          />
        )}
      <article className="flex items-center justify-between rounded-12 border border-basic-grey-100 p-8">
        <button
          type="button"
          onClick={() => setPassengerCount((prev) => prev - 1)}
          disabled={passengerCount <= 1}
          className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 disabled:text-basic-grey-300 active:[&:not([disabled])]:bg-basic-grey-200"
        >
          <SubtractIcon />
        </button>
        <span className="text-16 font-500">{passengerCount}</span>
        <button
          type="button"
          onClick={() => setPassengerCount((prev) => prev + 1)}
          disabled={passengerCount >= maxPassengerCount}
          className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 disabled:text-basic-grey-300 active:[&:not([disabled])]:bg-basic-grey-200"
        >
          <AddIcon />
        </button>
      </article>
      <article>
        <p className="flex h-[22px] items-center justify-between">
          <span className="text-14 font-500 text-basic-grey-700">
            {regularPrice.toLocaleString()}원 x {passengerCount}
          </span>
          <span
            className={`font-600 ${isEarlybird ? 'text-14 text-basic-grey-300 line-through' : 'text-16'}`}
          >
            {(regularPrice * passengerCount).toLocaleString()} 원
          </span>
        </p>
        {isEarlybird && (
          <p className="flex h-[26px] items-center justify-end gap-4">
            <span className="text-10 font-600 text-basic-grey-700">
              얼리버드 할인
            </span>
            <span className="text-16 font-600 text-basic-red-400">
              {discountRate}%
            </span>
            <span className="text-16 font-600">
              {(earlybirdPrice * passengerCount).toLocaleString()}원
            </span>
          </p>
        )}
      </article>
      <Button
        variant="primary"
        size="large"
        type="button"
        onClick={handleReservationClick}
      >
        예약하기
      </Button>
    </section>
  );
};

export default ReservationInfoStep;
