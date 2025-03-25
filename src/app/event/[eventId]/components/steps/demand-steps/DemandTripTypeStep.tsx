'use client';

import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { TripTypeEnum } from '@/types/shuttleRoute.type';

const DemandTripTypeStep = () => {
  return (
    <section>
      {TripTypeEnum.options.map((tripType) => (
        <button
          key={tripType}
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
