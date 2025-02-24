'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Select from '@/components/select/Select';
import useStickyMenu from '@/hooks/useStickyMenu';
import { type DemandSortType, DEMAND_SORT } from '@/constants/demand';
import { toDemandSortSearchParams } from '../utils/param.util';

interface Props {
  length: number;
  sort: DemandSortType;
  children: ReactNode;
}

const DemandFilterContainer = ({ length, sort, children }: Props) => {
  const route = useRouter();
  const { ref: navRef, safeArea } = useStickyMenu();

  return (
    <main className="relative flex w-full flex-col">
      <div ref={navRef} className="sticky top-44 z-[1] w-full bg-white">
        <div className="flex flex-col px-16 py-12">
          <span className="text-14 font-500 text-grey-600-sub">정렬 기준</span>
          <Select
            options={DEMAND_SORT}
            value={sort}
            setValue={(s: DemandSortType) =>
              route.replace(`/demand?sort=${toDemandSortSearchParams(s)}`)
            }
          />
        </div>
        <div className={safeArea}>
          <div className="h-8 w-full bg-grey-50" />
          <div className="px-16 py-12">
            <span className="text-14 font-400 text-grey-500">
              수요조사 진행 중({length})
            </span>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </main>
  );
};

export default DemandFilterContainer;
