'use client';

import Select from '@/components/select/Select';
import {
  BIG_REGIONS,
  BigRegionsType,
  REGION_TO_ID,
  SMALL_REGIONS,
} from '@/constants/regions';
import { DailyShuttleType, ShuttleType } from '@/types/shuttle.types';
import { parseDateString } from '@/utils/dateString';
import { SyntheticEvent, useMemo, useState } from 'react';
import DemandStats from './DemandStats';
import BottomBar from './BottomBar';
import { useRouter } from 'next/navigation';

interface Props {
  shuttle: ShuttleType;
}

const DemandForm = ({ shuttle }: Props) => {
  const [selectedBigRegion, setSelectedBigRegion] = useState<BigRegionsType>();
  const [selectedSmallRegion, setSelectedSmallRegion] = useState<string>();
  const [selectedDailyShuttle, setSelectedDailyShuttle] =
    useState<DailyShuttleType>();

  const regionId = useMemo(() => {
    if (!selectedBigRegion || !selectedSmallRegion) return undefined;
    return REGION_TO_ID[selectedBigRegion][selectedSmallRegion];
  }, [selectedBigRegion, selectedSmallRegion]);

  const router = useRouter();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    router.push(
      `/demand/${shuttle.shuttleId}/write?dailyShuttleId=${selectedDailyShuttle?.dailyShuttleId}&regionId=${regionId}`,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600-sub">
          운행일을 선택해주세요
        </h5>
        <Select
          options={shuttle.dailyShuttles}
          value={selectedDailyShuttle}
          setValue={(value) => {
            setSelectedDailyShuttle(value);
            setSelectedBigRegion(undefined);
            setSelectedSmallRegion(undefined);
          }}
          renderValue={(value) => parseDateString(value.date)}
          placeholder="운행일"
          isUnderLined
          bottomSheetTitle="운행일 선택"
        />
      </section>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600-sub">
          지역을 선택해주세요
        </h5>
        <Select
          options={BIG_REGIONS}
          value={selectedBigRegion}
          setValue={(value) => {
            setSelectedBigRegion(value);
            setSelectedSmallRegion(undefined);
          }}
          disabled={!selectedDailyShuttle}
          placeholder="도/광역시 선택"
          isUnderLined
          bottomSheetTitle="도/광역시 선택"
        />
        <Select
          options={SMALL_REGIONS?.[selectedBigRegion!] ?? []}
          value={selectedSmallRegion}
          setValue={(value) => {
            setSelectedSmallRegion(value);
          }}
          disabled={!selectedBigRegion}
          placeholder="시/군/구 선택"
          isUnderLined
          bottomSheetTitle="시/군/구 선택"
        />
      </section>
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {selectedDailyShuttle && (
        <DemandStats
          shuttleId={shuttle.shuttleId}
          dailyShuttle={selectedDailyShuttle}
          regionId={regionId}
          destination={shuttle.destination.name}
        />
      )}
      <BottomBar disabled={!selectedDailyShuttle || !regionId} />
    </form>
  );
};

export default DemandForm;
