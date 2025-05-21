import { useFormContext, UseFormGetValues } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { EVENT_STEPS, EVENT_STEPS_TO_TEXT } from '../../../form.const';
import { useMemo } from 'react';
import { BIG_REGIONS_TO_SHORT_NAME } from '@/constants/regions';

const useBottomSheetText = (stepName: (typeof EVENT_STEPS)[number]) => {
  const { getValues } = useFormContext<EventFormValues>();
  const text = useMemo(
    () => getBottomSheetText(stepName, getValues),
    [stepName, getValues],
  );
  return text;
};

export default useBottomSheetText;

const getBottomSheetText = (
  stepName: (typeof EVENT_STEPS)[number],
  getValues: UseFormGetValues<EventFormValues>,
) => {
  const text = EVENT_STEPS_TO_TEXT[stepName];

  let titleInput = '';
  let descriptionInput = '';

  switch (stepName) {
    case '[기타] 시/도 정보':
      const sido = getValues('sido');
      titleInput = BIG_REGIONS_TO_SHORT_NAME[sido];
      break;
    case '[기타] 복수 노선':
      const hubsWithInfoForDuplicates = getValues('hubsWithInfoForDuplicates');
      titleInput = hubsWithInfoForDuplicates?.length.toString() ?? '';
      descriptionInput = hubsWithInfoForDuplicates?.[0].name ?? '';
      break;
    case '[기타] 빈자리 알림':
      const selectedRouteForSeatAlarm = getValues('selectedRouteForSeatAlarm');
      descriptionInput = selectedRouteForSeatAlarm?.name ?? '';
      break;
  }

  const title =
    typeof text.title === 'function' ? text.title(titleInput) : text.title;
  const description =
    typeof text.description === 'function'
      ? text.description(descriptionInput)
      : text.description;
  return {
    title,
    description,
  };
};
