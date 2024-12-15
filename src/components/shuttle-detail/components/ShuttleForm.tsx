'use client';

import { FormProvider, useForm } from 'react-hook-form';
import ShuttleSelector from './ShuttleSelector';
import { useRouter } from 'next/navigation';
import BottomBar from '../bottom-bar/BottomBar';
export interface ShuttleFormValues {
  date: string;
  bigLocation: string;
  smallLocation: string;
  route: string;
}

interface Props {
  shuttleId: string;
  type: 'DEMAND' | 'RESERVATION';
}

const ShuttleForm = ({ shuttleId, type }: Props) => {
  const router = useRouter();

  const methods = useForm<ShuttleFormValues>({
    defaultValues: {
      date: '',
      bigLocation: '',
      smallLocation: '',
      route: '',
    },
  });

  const onSubmit = (data: ShuttleFormValues) => {
    const queryParams = new URLSearchParams({
      date: data.date,
      bigLocation: data.bigLocation,
      smallLocation: data.smallLocation,
      route: data.route,
    }).toString();

    if (type === 'DEMAND')
      router.push(`/demand/${shuttleId}/write?${queryParams}`);
    if (type === 'RESERVATION')
      router.push(`/shuttle/${shuttleId}/write?${queryParams}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ShuttleSelector control={methods.control} type={type} />
        <BottomBar onSubmit={methods.handleSubmit(onSubmit)} type={type} />
      </form>
    </FormProvider>
  );
};

export default ShuttleForm;
