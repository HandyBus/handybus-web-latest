'use client';

import { useRouter } from 'next/navigation';
import Select from '@/components/select/Select';
import ShuttleDetail from './ShuttleDetail';
import useStickyMenu from '@/hooks/useStickyMenu';
import type { EventDetailProps } from '@/types/event.types';
import { type DemandSortType, DEMAND_SORT } from '@/constants/demand';
import dynamic from 'next/dynamic';
import { toDemandSortSearchParams } from '../utils/param.util';
const Empty = dynamic(() => import('./Empty'));

const OpenShuttleDetails = ({
  data,
  sort,
}: {
  data: EventDetailProps[];
  sort: DemandSortType;
}) => {
  const route = useRouter();
  const { ref: navRef, safeArea } = useStickyMenu();

  if (data.length === 0) {
    return <Empty />;
  }

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
              수요 확인 중인 셔틀({data.length})
            </span>
          </div>
        </div>
      </div>

      <div>{data?.map((v) => <ShuttleDetail key={v.id} shuttle={v} />)}</div>
    </main>
  );
};

export default OpenShuttleDetails;
