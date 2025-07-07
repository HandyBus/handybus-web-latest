'use client';

import { useState } from 'react';
import Header from '../Header';
import SimpleRouteInfo from '../SimpleRouteInfo';
import { MAX_PASSENGER_COUNT } from '@/constants/common';
import SubtractIcon from '../../icons/subtract.svg';
import AddIcon from '../../icons/add.svg';
import Button from '@/components/buttons/button/Button';
import { useFormContext } from 'react-hook-form';
import { HandyPartyModalFormValues } from '../../HandyPartyModal';

interface Props {
  onBack: () => void;
}

const ReservationInfoStep = ({ onBack }: Props) => {
  const [passengerCount, setPassengerCount] = useState(1);

  const regularPrice = 10000;
  const earlybirdPrice = 8000;
  const discountRate = 20;
  const isEarlybird = true;

  const { getValues } = useFormContext<HandyPartyModalFormValues>();
  const handleSubmit = () => {
    const { addressSearchResult, tripType } = getValues();
    console.log(addressSearchResult, tripType);
  };

  return (
    <div className="flex grow flex-col">
      <Header onBack={onBack} title="이 셔틀로 예약을 진행할게요" />
      <div className="flex w-full flex-col gap-16 px-16">
        <SimpleRouteInfo tripType="TO_DESTINATION" destinationHub={MOCK_HUB} />
        <SimpleRouteInfo
          tripType="FROM_DESTINATION"
          destinationHub={MOCK_HUB}
        />
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
        <Button variant="primary" size="large" onClick={handleSubmit}>
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default ReservationInfoStep;

const MOCK_HUB = {
  shuttleRouteHubId: '595172465961865484',
  regionHubId: '545046713346297880',
  regionId: '60',
  name: '인스파이어 아레나',
  address: '인천 중구 운서동 2955-74',
  latitude: 37.466693876545094,
  longitude: 126.39057917718644,
  type: 'FROM_DESTINATION',
  role: 'DESTINATION',
  sequence: 1,
  arrivalTime: '2025-09-11T13:30:00.000Z',
  status: 'ACTIVE',
} as const;
