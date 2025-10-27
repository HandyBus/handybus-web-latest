'use client';

import { ShuttleRouteAlertRequestsViewEntity } from '@/types/alertRequest.type';
import WrapperWithDivider from '../WrapperWithDivider';

interface Props {
  alertRequest: ShuttleRouteAlertRequestsViewEntity;
}

const ShuttleProgressSection = ({ alertRequest }: Props) => {
  const shuttleRoute = alertRequest.shuttleRoute;
  const hasEmptySeat =
    shuttleRoute.remainingSeatCount > 0 &&
    shuttleRoute.remainingSeatType === 'ROUND_TRIP';

  return (
    <WrapperWithDivider>
      <section className="flex flex-col gap-16 px-16">
        <h3 className="text-16 font-600">셔틀 진행 상황</h3>
        <div className="rounded-8 bg-basic-grey-50 px-16 py-12 text-center text-16 font-600">
          {hasEmptySeat ? (
            <span className="text-brand-primary-400">
              예약 가능한 자리가 생겼어요
            </span>
          ) : (
            <span>{alertRequest.queueIndex}번째로 대기중이에요</span>
          )}
        </div>
        <ul
          className="space-y-2 list-outside pl-4 text-14 font-500 text-basic-grey-500"
          style={{ listStyleType: 'none' }}
        >
          {hasEmptySeat ? (
            <>
              <li className="relative pl-12 before:absolute before:left-0 before:content-['*']">
                알림 요청 여부와 상관없이 예약은 선착순으로 진행되고 있어요.
              </li>
              <li className="relative pl-12 before:absolute before:left-0 before:content-['*']">
                빈자리가 사라지면 기존 대기 번호로 돌아가요.
              </li>
            </>
          ) : (
            <>
              <li className="relative pl-12 before:absolute before:left-0 before:content-['*']">
                대기 순서에 따라 알림을 보내드리고 있어요.
              </li>
              <li className="relative pl-12 before:absolute before:left-0 before:content-['*']">
                알림 요청 여부와 상관없이 예약은 선착순으로 진행되고 있어요.
              </li>
            </>
          )}
        </ul>
      </section>
    </WrapperWithDivider>
  );
};

export default ShuttleProgressSection;
