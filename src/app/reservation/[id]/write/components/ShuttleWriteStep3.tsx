import ApplyHandy from '../sections/ApplyHandy';
import PassengerInfo from '../sections/PassengerInfo';
import ReservationInfo from '../sections/ReservationInfo';
import TossPayment from '../sections/TossPayments';
import TotalPriceInfo from '../sections/TotalPriceInfo';
import { ReservationFormData } from '../page';
import { ShuttleRouteType } from '@/types/shuttle.types';
import { useFormContext } from 'react-hook-form';
interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  shuttleData: ShuttleRouteType[];
}

const ShuttleWriteStep3 = ({
  handleNextStep,
  handlePrevStep,
  shuttleData,
}: Props) => {
  const { watch } = useFormContext<ReservationFormData>();
  const watchPassengers = watch('passengers');
  const watchShuttleRoute = watch('shuttleRoute');
  const tripType = watch('tripType');
  const pickupHub = watch('toDestinationHubId');
  const dropoffHub = watch('fromDestinationHubId');

  return (
    <>
      <ReservationInfo shuttleData={shuttleData} />
      <Divider />
      <PassengerInfo />
      <Divider />
      <ApplyHandy />
      <Divider />
      <TotalPriceInfo shuttleData={shuttleData} />
      <Divider />
      <TossPayment
        shuttleRouteId={watchShuttleRoute?.value}
        type={
          tripType?.value as
            | 'ROUND_TRIP'
            | 'TO_DESTINATION'
            | 'FROM_DESTINATION'
        }
        toDestinationShuttleRouteHubId={pickupHub}
        fromDestinationShuttleRouteHubId={dropoffHub}
        passengers={watchPassengers}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        shuttleData={shuttleData}
      />
    </>
  );
};

export default ShuttleWriteStep3;

const Divider = () => <div className="h-[8px] bg-grey-50" />;
