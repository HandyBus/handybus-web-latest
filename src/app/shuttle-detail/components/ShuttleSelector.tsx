'use client';

import { useState } from 'react';
import { BIG_REGIONS, SMALL_REGIONS } from '@/constants/regions';
import Select from '@/components/select/Select';

const ShuttleSelector = () => {
  const [date, setDate] = useState<string | undefined>(undefined);
  const [bigLocation, setBigLocation] = useState<string | undefined>(
    '서울특별시',
  );
  const [smallLocation, setSmallLocation] = useState<string | undefined>(
    '강남구',
  );
  // TODO: 이후 API 연동

  return (
    <div>
      <div className="flex flex-col gap-16 p-16">
        <p>운행일을 선택해주세요</p>
        <Select
          options={['2024-01-01', '2024-01-02', '2024-01-03']}
          value={date}
          setValue={setDate}
          placeholder="운행일"
        />
      </div>
      <div className="flex flex-col gap-16 p-16">
        <p>지역을 선택해주세요</p>
        <Select
          options={BIG_REGIONS}
          value={bigLocation}
          setValue={setBigLocation}
          placeholder="광역시/도"
        />
        <Select
          options={SMALL_REGIONS[bigLocation as keyof typeof SMALL_REGIONS]}
          value={smallLocation}
          setValue={setSmallLocation}
          placeholder="시/군/구"
        />
      </div>
    </div>
  );
};

export default ShuttleSelector;
