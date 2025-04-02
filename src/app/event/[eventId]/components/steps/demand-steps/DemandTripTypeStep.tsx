'use client';

import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';

interface Props {
  toNextStep: () => void;
}

const DemandTripTypeStep = ({ toNextStep }: Props) => {
  const { setValue } = useFormContext<EventFormValues>();

  const handleTripTypeClick = (tripType: TripType) => {
    setValue('tripType', tripType);
    toNextStep();
  };

  return (
    <section>
      {TripTypeEnum.options.map((tripType) => (
        <button
          key={tripType}
          onClick={() => handleTripTypeClick(tripType)}
          type="button"
          className="block w-full py-12 text-left text-16 font-600 leading-[160%] text-basic-grey-700"
        >
          {TRIP_STATUS_TO_STRING[tripType]}
        </button>
      ))}
    </section>
  );
};

export default DemandTripTypeStep;
