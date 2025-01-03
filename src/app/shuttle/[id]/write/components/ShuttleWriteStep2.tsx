'use client';

import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import PassengerForm from '../sections/PassengerForm';
import { Controller, useFormContext } from 'react-hook-form';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import { ReservationFormData } from '../page';
import { ShuttleRoute } from '@/types/shuttle.types';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  currentShuttleData?: ShuttleRoute;
}
const ShuttleWriteStep2 = ({
  handleNextStep,
  handlePrevStep,
  currentShuttleData,
}: Props) => {
  const {
    control,
    setValue,
    watch,
    // getValues,
    // trigger,
    // formState: { errors },
  } = useFormContext<ReservationFormData>();
  const passengerCount = watch('passengerCount');

  if (!currentShuttleData) return;
  return (
    <>
      <Controller
        control={control}
        name="passengerCount"
        render={({ field: { value, onChange } }) => (
          <PassengerCount
            count={value}
            setCount={(newValue) => onChange(newValue)}
          />
        )}
      />
      {Array(passengerCount)
        .fill(null)
        .map((_, index) => (
          <PassengerForm
            key={index}
            index={index}
            control={control}
            setValue={setValue}
          />
        ))}
      <BottomBar
        type={`RESERVATION_WRITE_2` as BottomBarType}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
        // disabled={!isValid}
        currentShuttleData={currentShuttleData}
      />
    </>
  );
};

export default ShuttleWriteStep2;
