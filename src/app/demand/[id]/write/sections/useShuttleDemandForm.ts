import { useForm } from 'react-hook-form';
import {
  DemandRequestFormValues,
  DemandWriteSearchParams,
} from './writeForm.type';
import { EventDetailProps } from '@/types/event.types';
import { getDefaultValues } from './writeForm.util';

export const useShuttleDemandForm = (
  searchParams: DemandWriteSearchParams,
  demandData: EventDetailProps,
) => {
  const methods = useForm<DemandRequestFormValues>({
    defaultValues: getDefaultValues(searchParams, demandData),
    mode: 'onChange',
  });

  const formValues = methods.watch();
  const regionId = methods.watch('regionID');

  return {
    methods,
    formValues,
    regionId,
  };
};
