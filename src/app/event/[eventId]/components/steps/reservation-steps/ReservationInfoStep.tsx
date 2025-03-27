'use client';

import Button from '@/components/buttons/button/Button';
import { ReactNode, useState } from 'react';
import { customTwMerge } from 'tailwind.config';
import SimpleRouteInfo from '../../SimpleRouteInfo';
import AddIcon from '../../../icons/add.svg';
import SubtractIcon from '../../../icons/subtract.svg';
import { EventFormValues } from '../../EventForm';
import { useFormContext } from 'react-hook-form';
import { getRouteOfHubWithInfo } from '../../../store/datesWithHubsAtom';
import { datesWithRoutesAtom } from '../../../store/datesWithRoutesAtom';
import { useAtomValue } from 'jotai';
import { calculatePriceOfTripType } from '../../../event.util';
import { toast } from 'react-toastify';

const ROUND_TRIP_TEXT = '[왕복]';
const MAX_PASSENGER_COUNT = 9;

const ReservationInfoStep = () => {
  const { getValues } = useFormContext<EventFormValues>();
  const [selectedHubWithInfo, tripType, date] = getValues([
    'selectedHubWithInfo',
    'tripType',
    'date',
  ]);

  const datesWithRoutes = useAtomValue(datesWithRoutesAtom);
  const route = getRouteOfHubWithInfo({
    hubWithInfo: selectedHubWithInfo,
    datesWithRoutes,
    date,
  });
  const toDestinationHubs = route?.toDestinationShuttleRouteHubs ?? [];
  const fromDestinationHubs = route?.fromDestinationShuttleRouteHubs ?? [];

  const isRoundTrip = tripType === 'ROUND_TRIP';

  const [passengerCount, setPassengerCount] = useState(1);
  const maxPassengerCount = Math.min(
    selectedHubWithInfo.remainingSeat[tripType] ?? 0,
    MAX_PASSENGER_COUNT,
  );

  const priceOfTripType = calculatePriceOfTripType(route);
  const singlePrice =
    (priceOfTripType?.[tripType].isEarlybird
      ? priceOfTripType?.[tripType].earlybirdPrice
      : priceOfTripType?.[tripType].regularPrice) ?? 0;

  const handleReservationClick = () => {
    toast.success('개발 중 . . .');
  };

  return (
    <section className="flex w-full flex-col gap-16">
      {(isRoundTrip || tripType === 'TO_DESTINATION') && (
        <Container className="flex flex-col gap-12">
          <div className="flex h-[31px] w-full items-center justify-between">
            <span className="text-16 font-600">
              {isRoundTrip && ROUND_TRIP_TEXT} 가는 편
            </span>
            <Button variant="tertiary" size="small" type="button">
              변경
            </Button>
          </div>
          <div className="h-[1px] w-full bg-basic-grey-100" />
          <SimpleRouteInfo
            tripType="TO_DESTINATION"
            hubs={toDestinationHubs}
            selectedRegionHubId={selectedHubWithInfo.regionHubId}
          />
        </Container>
      )}
      {(isRoundTrip || tripType === 'FROM_DESTINATION') && (
        <Container className="flex flex-col gap-12">
          <div className="flex h-[31px] w-full items-center justify-between">
            <span className="text-16 font-600">
              {isRoundTrip && ROUND_TRIP_TEXT} 오는 편
            </span>
            <Button variant="tertiary" size="small">
              변경
            </Button>
          </div>
          <div className="h-[1px] w-full bg-basic-grey-100" />
          <SimpleRouteInfo
            tripType="FROM_DESTINATION"
            hubs={fromDestinationHubs}
            selectedRegionHubId={selectedHubWithInfo.regionHubId}
          />
        </Container>
      )}
      <Container className="flex items-center justify-between p-8">
        <button
          type="button"
          onClick={() => setPassengerCount((prev) => prev - 1)}
          disabled={passengerCount <= 1}
          className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 active:bg-basic-grey-200 disabled:text-basic-grey-300"
        >
          <SubtractIcon />
        </button>
        <span className="text-16 font-500">{passengerCount}</span>
        <button
          type="button"
          onClick={() => setPassengerCount((prev) => prev + 1)}
          disabled={passengerCount >= maxPassengerCount}
          className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 active:bg-basic-grey-200 disabled:text-basic-grey-300"
        >
          <AddIcon />
        </button>
      </Container>
      <article className="flex h-[26px] items-center justify-between">
        <span className="text-14 font-500 text-basic-grey-700">
          {singlePrice.toLocaleString()}원 x {passengerCount}
        </span>
        <span className="text-16 font-500">
          {(singlePrice * passengerCount).toLocaleString()}원
        </span>
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

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <article
      className={customTwMerge(
        'rounded-12 border border-basic-grey-100 p-12',
        className,
      )}
    >
      {children}
    </article>
  );
};
