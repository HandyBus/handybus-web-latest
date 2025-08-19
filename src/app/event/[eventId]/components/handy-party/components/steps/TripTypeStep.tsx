'use client';

import {
  ShuttleRoutesViewEntity,
  TripTypeEnum,
} from '@/types/shuttleRoute.type';
import Header from '../Header';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import {
  HandyPartyModalFormValues,
  TripTypeWithoutRoundTrip,
} from '../../HandyPartyModal';
import { useFormContext } from 'react-hook-form';
import { createFullAvailableHandyPartyAreaGuideString } from '@/utils/handyParty.util';
import { useEffect } from 'react';
import { useReservationTrackingGlobal } from '@/hooks/analytics/store/useReservationTrackingGlobal';

interface Props {
  onBack: () => void;
  onNext: () => void;
  handyPartyRoutes: ShuttleRoutesViewEntity[];
}

const TripTypeStep = ({ onBack, onNext, handyPartyRoutes }: Props) => {
  const { setValue } = useFormContext<HandyPartyModalFormValues>();
  const { setReservationTrackingStep } = useReservationTrackingGlobal();
  const tripTypesWithoutRoundTrip = TripTypeEnum.options.slice(
    0,
    2,
  ) as TripTypeWithoutRoundTrip[];

  const availableHandyPartyAreaGuideString =
    createFullAvailableHandyPartyAreaGuideString(handyPartyRoutes);

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 방향 선택');
  }, [setReservationTrackingStep]);

  return (
    <div className="flex grow flex-col">
      <Header onBack={onBack} title="이용 방향을 선택해 주세요" />
      <ul className="">
        {tripTypesWithoutRoundTrip.map((tripType) => (
          <button
            key={tripType}
            type="button"
            className="flex h-[55px] w-full items-center px-16 text-left text-16 font-600 text-basic-grey-700"
            onClick={() => {
              setValue('tripType', tripType);
              onNext();
            }}
          >
            {TRIP_STATUS_TO_STRING[tripType]}
          </button>
        ))}
      </ul>
      <div className="my-24 h-8 w-full bg-basic-grey-50" />
      <div className="mx-16 rounded-8 bg-basic-grey-50 p-8 text-14 font-500 text-basic-grey-500">
        {availableHandyPartyAreaGuideString}
      </div>
    </div>
  );
};

export default TripTypeStep;
