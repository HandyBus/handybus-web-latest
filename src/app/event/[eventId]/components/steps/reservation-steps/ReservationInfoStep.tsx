'use client';

import Button from '@/components/buttons/button/Button';
import { useEffect, useState } from 'react';
import SimpleRouteInfo from '../components/SimpleRouteInfo';
import AddIcon from '../../../icons/add.svg';
import SubtractIcon from '../../../icons/subtract.svg';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { calculatePriceOfTripType } from '@/utils/event.util';
import { EventFormValues } from '../../../form.type';
import { getRouteOfHubWithInfo } from '../../../store/dailyEventIdsWithHubsAtom';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { MAX_PASSENGER_COUNT } from '@/constants/common';
import {
  createPaymentPageUrl,
  PAYMENT_PARAMS_KEYS,
} from '../../../dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/payment.const';
import { eventAtom } from '../../../store/eventAtom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetUser } from '@/services/user.service';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import { cheerCampaignFinalDiscountRateAtom } from '../../../store/cheerAtom';

interface Props {
  closeBottomSheet: () => void;
  toExtraRealNameInputStep: () => void;
}

const ReservationInfoStep = ({
  closeBottomSheet,
  toExtraRealNameInputStep,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { markAsIntentionalNavigation, getReservationStartTime } =
    useReservationTrackingGlobal();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser();
  const event = useAtomValue(eventAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();
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

  const isRoundTrip = tripType === 'ROUND_TRIP';
  const isEarlybird = price?.isEarlybird;

  // 응원하기 할인 로직
  const cheerCampaignFinalDiscountRate = useAtomValue(
    cheerCampaignFinalDiscountRateAtom,
  );
  const isDiscounted = cheerCampaignFinalDiscountRate !== null || isEarlybird;
  const calculateDiscountedPrice = () => {
    if (isEarlybird && earlybirdPrice) {
      if (cheerCampaignFinalDiscountRate !== null) {
        return Math.floor(
          earlybirdPrice * (1 - cheerCampaignFinalDiscountRate / 100),
        );
      }
      return earlybirdPrice;
    } else {
      if (cheerCampaignFinalDiscountRate !== null) {
        return Math.floor(
          regularPrice * (1 - cheerCampaignFinalDiscountRate / 100),
        );
      }
      return regularPrice;
    }
  };
  const discountedPrice = calculateDiscountedPrice();
  const discountRate = Math.floor(
    ((regularPrice - discountedPrice) / regularPrice) * 100,
  );

  // 행사장행 및 귀가행의 탑승하는 정류장 관리
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

    if (!user?.name) {
      setValue('passengerCount', passengerCount);
      toExtraRealNameInputStep();
      return;
    }

    markAsIntentionalNavigation();
    const url = createPaymentPageUrl({
      eventId: event.eventId,
      dailyEventId: dailyEvent.dailyEventId,
      shuttleRouteId: route.shuttleRouteId,
      tripType,
      toDestinationHubId: toDestinationShuttleRouteHubId,
      fromDestinationHubId: fromDestinationShuttleRouteHubId,
      passengerCount,
      reservationStartTime: getReservationStartTime() ?? undefined, // 예약 시작 시간 전달
      referralCode:
        searchParams.get(PAYMENT_PARAMS_KEYS.referralCode) ?? undefined,
    });

    closeBottomSheet();
    router.push(url);
  };

  return (
    <section className="flex w-full flex-col gap-16">
      {(isRoundTrip || tripType === 'TO_DESTINATION') &&
        toDestinationShuttleRouteHubId && (
          <SimpleRouteInfo
            eventId={event?.eventId ?? ''}
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
            eventId={event?.eventId ?? ''}
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
            className={`font-600 ${isDiscounted ? 'text-14 text-basic-grey-300 line-through' : 'text-16'}`}
          >
            {(regularPrice * passengerCount).toLocaleString()} 원
          </span>
        </p>
        {isDiscounted && (
          <p className="flex h-[26px] items-center justify-end gap-4">
            <span className="text-10 font-600 text-basic-grey-700">
              최대 할인가
            </span>
            <span className="text-16 font-600 text-basic-red-400">
              {discountRate}%
            </span>
            <span className="text-16 font-600">
              {(discountedPrice * passengerCount).toLocaleString()}원
            </span>
          </p>
        )}
      </article>
      <Button
        variant="primary"
        size="large"
        type="button"
        onClick={handleReservationClick}
        disabled={isUserLoading || isUserError}
      >
        예약하기
      </Button>
    </section>
  );
};

export default ReservationInfoStep;
