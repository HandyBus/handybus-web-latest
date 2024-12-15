'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Select from '@/components/select/Select';
import { BIG_REGIONS, SMALL_REGIONS } from '@/constants/regions';
import { useEffect } from 'react';

const RouteInfo = () => {
  const { setValue, control } = useFormContext();
  const bigLocation = useWatch({
    control,
    name: 'bigLocation',
  });

  useEffect(() => {
    if (!bigLocation) return;
    setValue('smallLocation', '');
  }, [bigLocation]);

  return (
    <section
      aria-label="demand request by date, location, and route"
      className="flex flex-col gap-[16px] px-16 py-28"
    >
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        수요 신청하기 <span className="text-red-500">*</span>
      </h2>
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <Select
            isUnderLined={true}
            options={['2024-01-01', '2024-01-02', '2024-01-03']}
            value={field.value}
            setValue={field.onChange}
            placeholder="일자"
          />
        )}
      />
      <Controller
        control={control}
        name="bigLocation"
        render={({ field }) => (
          <Select
            isUnderLined={true}
            options={BIG_REGIONS}
            value={field.value}
            setValue={field.onChange}
            placeholder="시/도"
          />
        )}
      />
      <Controller
        control={control}
        name="smallLocation"
        render={({ field }) => (
          <Select
            isUnderLined={true}
            options={SMALL_REGIONS[bigLocation as keyof typeof SMALL_REGIONS]}
            value={field.value}
            setValue={field.onChange}
            placeholder="시/군/구"
          />
        )}
      />
      <Controller
        control={control}
        name="routeType"
        render={({ field }) => (
          <Select
            isUnderLined={true}
            options={['왕복행', '콘서트행', '귀가행']}
            value={field.value}
            setValue={field.onChange}
            placeholder="왕복/콘서트행/귀가행"
          />
        )}
      />
    </section>
  );
};

export default RouteInfo;
