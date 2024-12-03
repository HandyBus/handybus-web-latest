'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Select from '@/components/select/Select';
import useStickyMenu from '@/hooks/useStickyMenu';
import useRegion, { Region } from '@/hooks/useRegion';
import { toSearchParams } from '@/utils/searchParams';

import SelectRegionsWithChips from './SelectRegionsWithChips';
import {
  SHUTTLE_SORT,
  shuttleSortToSearchParam,
  type ShuttleSortType,
} from '../constants/params';

interface Props {
  sort: ShuttleSortType;
  region: Region;
  header:
    | { type: 'REGION'; length: number }
    | { type: 'RELATED'; length: number; related: string };
  children: React.ReactNode;
}

const SubPage = ({ region: initialRegion, sort, header, children }: Props) => {
  const route = useRouter();
  const [region, setRegion] = useRegion(initialRegion);
  const { ref: navRef, safeArea, show: showBar } = useStickyMenu();

  const handleClose = useCallback(() => {
    const postfix = toSearchParams({
      ...region,
      sort: shuttleSortToSearchParam(sort),
    } as Record<string, string>).toString();
    route.replace(`/shuttle${postfix ? `?${postfix}` : ''}`);
  }, [region, sort, route]);

  return (
    <main className="w-full">
      <div ref={navRef} className="sticky top-44 z-[1] w-full bg-white">
        <SelectRegionsWithChips
          region={region}
          setRegion={setRegion}
          showBar={showBar}
          onClose={handleClose}
        />
        <div className="flex flex-col px-16 py-12">
          <span className="text-14 font-500 text-grey-600-sub">정렬 기준</span>
          <Select
            setValue={(s) => {
              const postfix = toSearchParams({
                ...region,
                sort: shuttleSortToSearchParam(s),
              } as Record<string, string | undefined>).toString();
              route.replace(`/shuttle${postfix ? `?${postfix}` : ''}`);
            }}
            options={SHUTTLE_SORT}
            value={sort}
          />
        </div>
        <div className="px-16 pb-16 text-12 font-400 text-grey-500">
          현재 셔틀이 있는 지역만 보여드려요.
          <br />
          거주 지역에 셔틀이 없는 경우 근처 지역으로 대신 보여드려요.
        </div>
        <div className={safeArea}>
          <div className="h-8 w-full bg-grey-50" />
          <div className="px-16 py-12">
            {header.type === 'REGION' ? (
              <>
                <span className="text-14 font-500 text-grey-500">
                  {region.bigRegion === undefined ? '전국' : region.bigRegion}
                  {region.smallRegion ? ` ${region.smallRegion}` : ''}
                </span>
                <span className="text-14 font-400 text-grey-500">
                  에서 예약 모집 중인 셔틀({header.length})
                </span>
              </>
            ) : (
              <>
                <span className="text-14 font-500 text-grey-500">
                  {region.bigRegion === undefined
                    ? '전국'
                    : String(region.bigRegion)}
                  {region.smallRegion ? ` ${region.smallRegion}` : ''}
                </span>
                <span className="text-14 font-400 text-grey-500">
                  에서 예약 모집 중인 셔틀이 없어{' '}
                  <span className="text-14 font-600 text-grey-500">
                    {header.related}
                  </span>
                  의 결과를 대신 보여드려요.
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      {children}
    </main>
  );
};

export default SubPage;
