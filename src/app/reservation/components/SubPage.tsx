'use client';

import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Select from '@/components/select/Select';
import useStickyMenu from '@/hooks/useStickyMenu';
import useRegion, { Region } from '@/hooks/useRegion';
import { regionToString } from '@/utils/region.util';
import { toSearchParams } from '@/utils/searchParams.util';

import SelectRegionsWithChips from './SelectRegionsWithChips';
import {
  SHUTTLE_SORT,
  shuttleSortToSearchParam,
  type ShuttleSortType,
} from '../constants/params';

interface Props {
  sort: ShuttleSortType;
  region: Region;
  length: number;
  children: ReactNode;
}

const SubPage = ({ region: initialRegion, sort, length, children }: Props) => {
  const route = useRouter();
  const [region, setRegion] = useRegion(initialRegion);
  const { ref: navRef, safeArea, show: showBar } = useStickyMenu();

  const handleClose = useCallback(() => {
    const postfix = toSearchParams({
      ...(region.bigRegion ? region : {}),
      sort: shuttleSortToSearchParam(sort),
    } as Record<string, string>).toString();
    route.replace(`/reservation${postfix ? `?${postfix}` : ''}`);
  }, [region, sort, route]);

  return (
    <main className="w-full">
      <div ref={navRef} className="sticky top-44 z-[1] w-full bg-basic-white">
        <SelectRegionsWithChips
          region={region}
          setRegion={setRegion}
          showBar={showBar}
          onClose={handleClose}
        />
        <div className="flex flex-col px-16 py-12">
          <span className="text-basic-grey-600 text-14 font-500">
            정렬 기준
          </span>
          <Select
            setValue={(s) => {
              const postfix = toSearchParams({
                ...region,
                sort: shuttleSortToSearchParam(s),
              } as Record<string, string | undefined>).toString();
              route.replace(`/reservation${postfix ? `?${postfix}` : ''}`);
            }}
            options={SHUTTLE_SORT}
            value={sort}
          />
        </div>
        <div className={safeArea}>
          <div className="bg-basic-grey-50 h-8 w-full" />
          <div className="px-16 py-12">
            <span className="text-basic-grey-500 text-14 font-500">
              {regionToString(region)}
            </span>
            <span className="text-basic-grey-500 text-14 font-400">
              에서 예약 모집 중인 셔틀({length})
            </span>
          </div>
        </div>
      </div>
      {children}
    </main>
  );
};

export default SubPage;
