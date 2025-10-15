'use client';

import WrapperWithDivider from '../../WrapperWithDivider';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const ShuttleProgressSection = ({ demand }: Props) => {
  const isDemandFulfilled = demand.status === 'FULFILLED';
  return (
    <WrapperWithDivider>
      <section className="flex flex-col gap-16 px-16 py-24">
        <h3 className="text-16 font-600">셔틀 진행 상황</h3>
        <div className="h-[50px] w-full rounded-8 bg-basic-grey-50 py-12 text-center text-16 font-600">
          {isDemandFulfilled ? (
            <span className="text-basic-grey-600">예약한 셔틀이에요</span>
          ) : (
            <>
              지금까지{' '}
              <span className="text-brand-primary-400">
                {demand.demandCountOnRegion}
              </span>
              명이 이 지역을 요청했어요
            </>
          )}
        </div>
        <ul className="space-y-2 text-12 font-500 text-basic-grey-500">
          <li>* 셔틀 오픈을 위한 최소 인원 기준은 매번 상이합니다.</li>
          <li>
            * 수요조사 참여 인원 외에도 행사장 주차 여건, 주최 측 협의 등
            복합적인 요 인에 따라 개설 여부가 결정됩니다. 수요 충족 시에도 셔틀
            개설이 불가할 수 있습니다.
          </li>
        </ul>
      </section>
    </WrapperWithDivider>
  );
};

export default ShuttleProgressSection;
