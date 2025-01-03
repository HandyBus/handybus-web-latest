'use client';

import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import PassengerForm from '../sections/PassengerForm';
import { Controller, useFormContext } from 'react-hook-form';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import { ReservationFormData } from '../page';
import { ShuttleRoute } from '@/types/shuttle.types';
import { toast } from 'react-toastify';

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
  const { control, setValue, watch, trigger } =
    useFormContext<ReservationFormData>();
  const passengerCount = watch('passengerCount');

  const onHandleClickNext = async () => {
    console.log('💵 (CLIENT) onHandleClickNext');

    const isValid = await trigger('passengers')
      .then((res) => {
        console.log('💵 (CLIENT) isValid', res);
        return res;
      })
      .catch((err) => {
        console.log('💵 (CLIENT) err', err);
        toast.error('탑승객 정보를 확인해주세요');
        return false;
      });

    if (passengerCount > 0 && isValid) {
      handleNextStep();
    }
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
