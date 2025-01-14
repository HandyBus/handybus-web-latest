'use client';

import { ReactNode, useState } from 'react';
import SmallBusIcon from 'public/icons/bus-small.svg';
import DemandCard from '../DemandCard';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { ID_TO_REGION } from '@/constants/regions';
import { useGetUserDemands } from '@/services/user-management.service';
import { ShuttleDemand } from '@/types/user-management.type';
import {
  getShuttleRoutesOfDailyEvent,
  useDeleteDemand,
} from '@/services/shuttle-operation.service';
import { useQueries } from '@tanstack/react-query';
const EmptyView = dynamic(() => import('../EmptyView'));

const DemandTab = () => {
  const { data: demands, isLoading } = useGetUserDemands();

  const reservationOngoingDemands = useGetReservationOngoingDemands(
    demands ?? [],
  );
  const parsedReservationOngoingDemands = reservationOngoingDemands.every(
    (request) => request.isSuccess,
  )
    ? reservationOngoingDemands
        .filter((x) => x.data !== null)
        .map((x) => x.data as ShuttleDemand)
    : [];

  const { mutate: deleteDemand } = useDeleteDemand();
  const [isOpen, setIsOpen] = useState(false);
  const [demand, setDemand] = useState<ShuttleDemand | null>(null);

  return (
    <>
      <ul>
        {parsedReservationOngoingDemands.length > 0 && (
          <ReservationOngoingWrapper count={reservationOngoingDemands.length}>
            {parsedReservationOngoingDemands.map((demand) => {
              const region = ID_TO_REGION[demand.regionId];
              const href = `/demand/${demand.eventId}?dailyEventId=${demand.dailyEventId}&bigRegion=${region.bigRegion}&smallRegion=${region.smallRegion}`;
              return (
                <DemandCard
                  key={demand.shuttleDemandId}
                  demand={demand}
                  href={href}
                  buttonText="현재 예약이 진행되고 있는 셔틀이 있어요!"
                  buttonHref={href}
                />
              );
            })}
          </ReservationOngoingWrapper>
        )}
      </ul>
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {demands &&
          (demands.length === 0 ? (
            <EmptyView />
          ) : (
            <ul>
              {demands.map((demand) => (
                <DemandCard
                  key={demand.shuttleDemandId}
                  demand={demand}
                  subButtonText={
                    demand.status === 'OPEN'
                      ? '신청 취소'
                      : '수요조사 확인 종료'
                  }
                  subButtonOnClick={(e) => {
                    e.preventDefault();
                    setDemand(demand);
                    setIsOpen(true);
                  }}
                  subButtonDisabled={demand.status !== 'OPEN'}
                />
              ))}
            </ul>
          ))}
      </DeferredSuspense>
      <ConfirmModal
        title="정말 수요조사를 취소하시겠습니까?"
        buttonLabels={{
          back: '돌아가기',
          confirm: '수요조사 취소하기',
        }}
        isOpen={isOpen}
        onConfirm={() => {
          if (!demand) {
            setIsOpen(false);
            return;
          }
          deleteDemand({
            eventId: demand.eventId,
            dailyEventId: demand.dailyEventId,
            shuttleDemandId: demand.shuttleDemandId,
          });
          setDemand(null);
          setIsOpen(false);
        }}
        onClosed={() => {
          setDemand(null);
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default DemandTab;

interface ReservationOngoingWrapperProps {
  children: ReactNode;
  count: number;
}

const ReservationOngoingWrapper = ({
  children,
  count,
}: ReservationOngoingWrapperProps) => {
  return (
    <>
      <div className="line-clamp-1 flex h-40 w-full items-center gap-8 bg-grey-50 px-24">
        <SmallBusIcon />
        <span className="text-12 font-500 text-grey-600">
          수요신청 하신 셔틀 중{' '}
          <span className="font-600 text-grey-800">{count}개</span>의 셔틀이
          예약 진행 중입니다.
        </span>
      </div>
      {children}
      <div className="mt-12 h-8 w-full bg-grey-50" />
    </>
  );
};

const getReservationOngoingDemand = async (demand: ShuttleDemand) => {
  if (!demand.hasShuttleRoute) {
    return null;
  }
  const region = ID_TO_REGION[demand.regionId];
  const routes = await getShuttleRoutesOfDailyEvent(
    demand.eventId,
    demand.dailyEventId,
    {
      status: 'OPEN',
      provinceFullName: region.bigRegion,
      cityFullName: region.smallRegion,
    },
  );
  if (routes.length === 0) {
    return null;
  }
  return demand;
};

export const useGetReservationOngoingDemands = (demands: ShuttleDemand[]) =>
  useQueries<Array<ShuttleDemand | null>>({
    queries: demands.map((demand) => ({
      queryKey: [
        'user',
        'demands',
        'reservation-ongoing',
        demand.shuttleDemandId,
      ],
      queryFn: () => getReservationOngoingDemand(demand),
      enabled: !!demands,
    })),
  });
