'use client';

import TextInput from '@/components/inputs/text-input/TextInput';
import Select from '@/components/select/Select';
import { Controller, useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './WriteForm';
import { useEffect, useMemo, useState } from 'react';
import { useGetHubsByRegionId } from '@/services/hub.service';

const JourneyLocationPicker = () => {
  const { control, setValue } = useFormContext<FormValues>();

  const [regionId, type] = useWatch({
    control,
    name: ['regionId', 'type'],
  });

  const { data: regionHubs } = useGetHubsByRegionId(regionId);

  const [isToDestinationCustom, setIsToDestinationCustom] = useState(false);
  const [isFromDestinationCustom, setIsFromDestinationCustom] = useState(false);

  const regionHubsExcludedTaxi = useMemo(
    () => regionHubs.filter((hub) => !hub.name.includes('[집앞하차]')),
    [regionHubs],
  );

  useEffect(() => {
    setIsToDestinationCustom(false);
    setIsFromDestinationCustom(false);
  }, [type]);

  if (!type || (!regionId && regionHubsExcludedTaxi.length === 0)) {
    return null;
  }

  return (
    <section className="flex flex-col gap-16 px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        희망 탑승/하차 장소를 입력해주세요
      </h2>
      {(type === 'ROUND_TRIP' || type === 'TO_DESTINATION') && (
        <div className="flex flex-col gap-8">
          <h3 className="text-16 font-400 text-grey-600-sub">
            희망 탑승 장소 (가는 편)
          </h3>
          <Controller
            control={control}
            name="toDestinationRegionHub"
            render={({ field: { value, onChange } }) => (
              <Select
                options={[
                  ...regionHubsExcludedTaxi,
                  { name: '기타 (직접 입력)', regionHubId: null },
                ]}
                value={value}
                setValue={(value) => {
                  onChange(value);
                  setIsToDestinationCustom(value.regionHubId === null);
                }}
                renderValue={(value) => value.name}
                isUnderLined
                placeholder="희망 탑승 장소를 선택해주세요"
                bottomSheetTitle="희망 탑승 장소를 선택해주세요"
              />
            )}
          />
          {isToDestinationCustom && (
            <TextInput
              control={control}
              setValue={setValue}
              name="toDestinationDesiredRegionHub"
              placeholder="희망 탑승 장소를 직접 입력해주세요"
            />
          )}
        </div>
      )}
      {(type === 'ROUND_TRIP' || type === 'FROM_DESTINATION') && (
        <div className="flex flex-col gap-8">
          <h3 className="pb-[6px] text-16 font-400 text-grey-600-sub">
            희망 하차 장소 (오는 편)
          </h3>
          <Controller
            control={control}
            name="fromDestinationRegionHub"
            render={({ field: { value, onChange } }) => (
              <Select
                options={[
                  ...regionHubsExcludedTaxi,
                  { name: '기타 (직접 입력)', regionHubId: null },
                ]}
                value={value}
                setValue={(value) => {
                  onChange(value);
                  setIsFromDestinationCustom(value.regionHubId === null);
                }}
                renderValue={(value) => value.name}
                isUnderLined
                placeholder="희망 탑승 장소를 선택해주세요"
                bottomSheetTitle="희망 탑승 장소를 선택해주세요"
              />
            )}
          />
          {isFromDestinationCustom && (
            <TextInput
              control={control}
              setValue={setValue}
              name="fromDestinationDesiredRegionHub"
              placeholder="희망 하차 장소를 직접 입력해주세요"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default JourneyLocationPicker;
