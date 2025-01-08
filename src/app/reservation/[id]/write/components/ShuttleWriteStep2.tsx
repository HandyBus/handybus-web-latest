'use client';

import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import PassengerForm from '../sections/PassengerForm';
import { Controller, useFormContext } from 'react-hook-form';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import { ReservationFormData } from '../page';
import { ShuttleRouteType } from '@/types/shuttle.types';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  currentShuttleData?: ShuttleRouteType;
}
const ShuttleWriteStep2 = ({
  handleNextStep,
  handlePrevStep,
  currentShuttleData,
}: Props) => {
  const { control, setValue, watch, trigger } =
    useFormContext<ReservationFormData>();
  const passengerCount = watch('passengerCount');

  const onHandleClickNext = async () => {
    const validations = Array(passengerCount)
      .fill(null)
      .map((_, index) => [
        trigger(`passengers.${index}.name`),
        trigger(`passengers.${index}.phoneNumber`),
      ])
      .flat();

    const results = await Promise.all(validations);
    const isValid = results.every(Boolean);
    if (!isValid) return;
    handleNextStep();
  };

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
        handleNextStep={onHandleClickNext}
        handlePrevStep={handlePrevStep}
        currentShuttleData={currentShuttleData}
      />
    </>
  );
};

export default ShuttleWriteStep2;
