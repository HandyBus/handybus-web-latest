'use client';

import { useMemo, useState } from 'react';
import Header from '../Header';
import SimpleRouteInfo from '../SimpleRouteInfo';
import SubtractIcon from '../../icons/subtract.svg';
import AddIcon from '../../icons/add.svg';
import Button from '@/components/buttons/button/Button';
import { useFormContext } from 'react-hook-form';
import { HandyPartyModalFormValues } from '../../HandyPartyModal';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { getHandyPartyArea } from '../../handyParty.util';
import dayjs from 'dayjs';

const MAX_PASSENGER_COUNT = 5;

interface Props {
  onBack: () => void;
  handyPartyRoutes: ShuttleRoutesViewEntity[];
}

const ReservationInfoStep = ({ onBack, handyPartyRoutes }: Props) => {
  const [passengerCount, setPassengerCount] = useState(1);

  const { getValues } = useFormContext<HandyPartyModalFormValues>();

  const {
    targetRoute,
    tripType,
    userAddress,
    regularPrice,
    earlybirdPrice,
    discountRate,
    isEarlybird,
  } = useMemo(() => {
    const [tripType, addressSearchResult] = getValues([
      'tripType',
      'addressSearchResult',
    ]);

    const handyPartyArea = getHandyPartyArea(addressSearchResult.address);

    const targetRoute = handyPartyRoutes.find((route) => {
      const handyPartyAreaOfItem = route.name.split('_')?.[1] ?? '';
      const tripTypeOfItem = route.name.split('_')?.[2] ?? '';
      const isSameArea = handyPartyAreaOfItem === handyPartyArea;
      const convertedTripTypeOfItem =
        tripTypeOfItem === '가는편' ? 'TO_DESTINATION' : 'FROM_DESTINATION';
      const isSameTripType = convertedTripTypeOfItem === tripType;
      return isSameArea && isSameTripType;
    });

    if (!targetRoute) {
      return {
        targetRoute: undefined,
        tripType: undefined,
        regularPrice: 0,
        earlybirdPrice: 0,
        discountRate: 0,
        isEarlybird: false,
      };
    }

    const isEarlybird =
      targetRoute.hasEarlybird &&
      targetRoute.earlybirdDeadline &&
      dayjs().isBefore(targetRoute.earlybirdDeadline);

    const regularPrice =
      (tripType === 'TO_DESTINATION'
        ? targetRoute.regularPriceToDestination
        : targetRoute.regularPriceFromDestination) ?? 0;

    const earlybirdPrice =
      (isEarlybird && tripType === 'TO_DESTINATION'
        ? targetRoute.earlybirdPriceToDestination
        : targetRoute.earlybirdPriceFromDestination) ?? 0;

    const discountRate = Math.floor(
      ((regularPrice - earlybirdPrice) / regularPrice) * 100,
    );

    return {
      targetRoute,
      tripType,
      userAddress: addressSearchResult.address,
      regularPrice,
      earlybirdPrice,
      discountRate,
      isEarlybird,
    };
  }, [handyPartyRoutes]);

  const handleSubmit = () => {
    const { addressSearchResult, tripType } = getValues();
    console.log(addressSearchResult, tripType);
  };

  const destinationHub =
    tripType === 'TO_DESTINATION'
      ? targetRoute?.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )
      : targetRoute?.fromDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        );

  return (
    <div className="flex grow flex-col">
      <Header onBack={onBack} title="이 셔틀로 예약을 진행할게요" />
      <div className="flex w-full flex-col gap-16 px-16">
        {destinationHub && tripType === 'TO_DESTINATION' && (
          <SimpleRouteInfo
            tripType="TO_DESTINATION"
            destinationHub={destinationHub}
            userAddress={userAddress}
          />
        )}
        {destinationHub && tripType === 'FROM_DESTINATION' && (
          <SimpleRouteInfo
            tripType="FROM_DESTINATION"
            destinationHub={destinationHub}
            userAddress={userAddress}
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
            disabled={passengerCount >= MAX_PASSENGER_COUNT}
            className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 disabled:text-basic-grey-300 active:[&:not([disabled])]:bg-basic-grey-200"
          >
            <AddIcon />
          </button>
        </article>
      </div>
      <div className="mt-auto flex flex-col gap-16 p-16">
        <article>
          <p className="flex h-[22px] items-center justify-between">
            <span className="text-14 font-500 text-basic-grey-700">
              {regularPrice?.toLocaleString()}원 x {passengerCount}
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
          onClick={handleSubmit}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default ReservationInfoStep;
