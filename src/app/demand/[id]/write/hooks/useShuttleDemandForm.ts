import { useForm } from 'react-hook-form';
import {
  DemandRequestFormValues,
  DemandWriteSearchParams,
} from '../components/writeForm.type';
import { getDefaultValues } from '../components/writeForm.util';
import { ShuttleType } from '@/types/shuttle.types';

export const useShuttleDemandForm = (
  searchParams: DemandWriteSearchParams,
  shuttle: ShuttleType,
) => {
  const methods = useForm<DemandRequestFormValues>({
    defaultValues: getDefaultValues(searchParams, shuttle),
    mode: 'onChange',
  });

  const formValues = methods.watch();
  const regionId = methods.watch('regionId');

  return {
    methods,
    formValues,
    regionId,
  };
};
