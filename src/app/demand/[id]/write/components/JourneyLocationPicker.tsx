'use client';

import TextInput from '@/components/inputs/text-input/TextInput';
import Select from '@/components/select/Select';
import { RegionHubType } from '@/types/hub.type';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

const JourneyLocationPicker = ({
  routeType,
  regionHubsData,
}: {
  routeType: string;
  regionHubsData: { regionHubs: RegionHubType[] } | undefined;
}) => {
  const { control, setValue } = useFormContext();
  const [isDestinationCustom, setIsDestinationCustom] = useState(false);
  const [isReturnCustom, setIsReturnCustom] = useState(false);

  const renderLocationPicker = (
    type: string,
    fieldName: 'destinationStop' | 'returnStop',
    label: string,
    isCustom: boolean,
    setIsCustom: (value: boolean) => void,
  ) => {
    const options = [
      ...(regionHubsData?.regionHubs?.map((hub) => ({
        name: hub.name,
        hubId: hub.regionHubId,
        isCustom: false,
      })) ?? []),
      { name: '기타 (직접 입력)', id: null, isCustom: true, customHub: null },
    ];

    return (
      <div
        role="group"
        aria-labelledby={`${type}-location`}
        className="flex flex-col gap-8"
      >
        <h3 className="pb-8 text-16 font-500 leading-[25.6px] text-grey-600-sub">
          {label}
        </h3>
        <div className="flex flex-col gap-8">
          <Controller
            name={`${fieldName}`}
            control={control}
            render={({ field }) => (
              <Select
                options={options.map((option) => option.name)}
                value={field.value?.name ?? ''}
                setValue={(value) => {
                  const selectedOption = options.find(
                    (option) => option.name === value,
                  );
                  if (value === '기타 (직접 입력)') {
                    field.onChange(selectedOption);
                    setIsCustom(true);
                  } else {
                    field.onChange(selectedOption);
                    setIsCustom(false);
                  }
                }}
                isUnderLined={true}
                placeholder={`희망 ${type} 장소를 선택해주세요`}
              />
            )}
          />

          {isCustom && (
            <TextInput
              name={`${fieldName}.customHub`}
              control={control}
              setValue={(value) => {
                setValue(`${fieldName}.customHub`, value);
              }}
              placeholder={`희망 ${type} 장소를 입력해주세요`}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section
      className="flex flex-col gap-[16px] px-16 py-28"
      aria-label="desired boarding/disembarkation location"
    >
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        희망 탑승/하차 장소를 입력하세요
      </h2>
      {(routeType === '왕복행' || routeType === '콘서트행') &&
        renderLocationPicker(
          '하차',
          'destinationStop',
          '희망 하차 장소 (콘서트행)',
          isDestinationCustom,
          setIsDestinationCustom,
        )}
      {(routeType === '왕복행' || routeType === '귀가행') &&
        renderLocationPicker(
          '하차',
          'returnStop',
          '희망 하차 장소 (귀가행)',
          isReturnCustom,
          setIsReturnCustom,
        )}
    </section>
  );
};

export default JourneyLocationPicker;
