import { useCallback } from 'react';
import { DemandRequestFormValues } from '../components/writeForm.type';

export const useShuttleFormValidation = (
  formValues: DemandRequestFormValues,
) => {
  const isStopValidForRoute = useCallback((): boolean => {
    const to_destination = formValues.destinationStop?.isCustom
      ? formValues.destinationStop?.customHub
      : formValues.destinationStop?.hubId;
    const from_destination = formValues.returnStop?.isCustom
      ? formValues.returnStop?.customHub
      : formValues.returnStop?.hubId;

    if (formValues.routeType === '콘서트행') return !!to_destination;
    if (formValues.routeType === '귀가행') return !!from_destination;
    if (formValues.routeType === '왕복행')
      return !!to_destination && !!from_destination;
    return false;
  }, [formValues]);

  const determineVariant = useCallback((): 'primary' | 'secondary' => {
    if (
      formValues.dailyShuttle.dailyShuttleId !== 0 &&
      formValues.bigLocation &&
      formValues.smallLocation &&
      formValues.regionId &&
      formValues.passengerCount &&
      isStopValidForRoute()
    )
      return 'primary';
    return 'secondary';
  }, [formValues, isStopValidForRoute]);

  const determineDisabled = useCallback((): boolean => {
    const disabled = true;
    const abled = false;
    if (
      formValues.dailyShuttle.dailyShuttleId !== 0 &&
      formValues.bigLocation &&
      formValues.smallLocation &&
      formValues.regionId &&
      formValues.routeType &&
      formValues.passengerCount &&
      isStopValidForRoute()
    )
      return abled;
    return disabled;
  }, [formValues, isStopValidForRoute]);

  return { determineVariant, determineDisabled };
};
