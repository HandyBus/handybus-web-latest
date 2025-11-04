import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import { TripTypeEnum } from '@/types/shuttleRoute.type';
import { useEffect } from 'react';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { HandyPartyTripType } from './HandyPartyModal';

interface Props {
  toHandyPartySiGunGuStep: () => void;
}

const HandyPartyTripTypeStep = ({ toHandyPartySiGunGuStep }: Props) => {
  const { setValue } = useFormContext<EventFormValues>();
  const { setReservationTrackingStep } = useReservationTrackingGlobal();
  const tripTypesWithoutRoundTrip = TripTypeEnum.options.slice(
    0,
    2,
  ) as HandyPartyTripType[];

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 방향 선택');
  }, [setReservationTrackingStep]);

  return (
    <section className="flex grow flex-col">
      <ul>
        {tripTypesWithoutRoundTrip.map((tripType) => (
          <button
            key={tripType}
            type="button"
            className="flex w-full items-center py-12 text-16 font-600 text-basic-grey-700 first-line:text-left"
            onClick={() => {
              setValue('handyPartyTripType', tripType);
              toHandyPartySiGunGuStep();
            }}
          >
            {TRIP_STATUS_TO_STRING[tripType]}
          </button>
        ))}
      </ul>
    </section>
  );
};
export default HandyPartyTripTypeStep;
