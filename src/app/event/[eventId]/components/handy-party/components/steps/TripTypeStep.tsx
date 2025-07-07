'use client';

import { TripTypeEnum } from '@/types/shuttleRoute.type';
import Header from '../Header';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import {
  HandyPartyModalFormValues,
  TripTypeWithoutRoundTrip,
} from '../../HandyPartyModal';
import { useFormContext } from 'react-hook-form';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const TripTypeStep = ({ onBack, onNext }: Props) => {
  const { setValue } = useFormContext<HandyPartyModalFormValues>();
  const tripTypesWithoutRoundTrip = TripTypeEnum.options.slice(
    0,
    2,
  ) as TripTypeWithoutRoundTrip[];

  return (
    <div className="flex grow flex-col">
      <Header onBack={onBack} title="이용 방향을 선택해 주세요" />
      <ul className="mb-24">
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
      <div className="h-8 w-full bg-basic-grey-50" />
    </div>
  );
};

export default TripTypeStep;
