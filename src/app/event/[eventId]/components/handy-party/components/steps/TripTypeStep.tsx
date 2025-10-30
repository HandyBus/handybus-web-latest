'use client';

import { TripTypeEnum } from '@/types/shuttleRoute.type';
import Header from '../Header';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import {
  HandyPartyModalFormValues,
  TripTypeWithoutRoundTrip,
} from '../../HandyPartyModal';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const TripTypeStep = ({ onBack, onNext }: Props) => {
  const { setValue } = useFormContext<HandyPartyModalFormValues>();
  const { setReservationTrackingStep } = useReservationTrackingGlobal();
  const tripTypesWithoutRoundTrip = TripTypeEnum.options.slice(
    0,
    2,
  ) as TripTypeWithoutRoundTrip[];

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 방향 선택');
  }, [setReservationTrackingStep]);

  return (
    <div className="flex grow flex-col">
      <Header onBack={onBack} title="이용 방향을 선택해 주세요" />
      <ul className="pt-16">
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
    </div>
  );
};

export default TripTypeStep;
