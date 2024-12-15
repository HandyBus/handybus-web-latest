'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import RouteInfo from './RouteInfo';
import JourneyLocationPicker from './JourneyLocationPicker';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';

const WriteForm = () => {
  const [count, setCount] = useState(0);
  const methods = useForm();

  const onSubmit = () => {
    console.log();
    // TODO: API 연동
  };

  return (
    <FormProvider {...methods}>
      <RouteInfo />
      <PassengerCount count={count} setCount={setCount} />
      <JourneyLocationPicker routeType={methods.watch('routeType')} />
      <BottomBar
        type={'DEMAND_WRITE'}
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};

export default WriteForm;
