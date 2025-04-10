'use client';

import { ReactNode, useMemo, useState } from 'react';
import SmallBusIcon from 'public/icons/bus-small.svg';
import DemandCard from '../DemandCard';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import dynamic from 'next/dynamic';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { ID_TO_REGION } from '@/constants/regions';
import { useGetUserDemandsV2 } from '@/services/demand.service';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import { useDeleteDemand } from '@/services/demand.service';
const EmptyView = dynamic(() => import('../EmptyView'));

const DemandTab = () => {
  const { data: demands, isLoading } = useGetUserDemandsV2();

  const demandsWithReservationOngoing = useMemo(
    () =>
      demands?.filter(
        (demand) =>
          demand.hasShuttleRoute &&
          (demand.status === 'OPEN' || demand.status === 'CLOSED'),
      ),
    [demands],
  );
  const demandsWithoutReservationOngoing = useMemo(
    () => demands?.filter((demand) => !demand.hasShuttleRoute),
    [demands],
  );

  const { mutate: deleteDemand } = useDeleteDemand();
  const [isOpen, setIsOpen] = useState(false);
  const [demand, setDemand] = useState<ShuttleDemandsViewEntity | null>(null);

  return (
    <>
      <ul>
        {demandsWithReservationOngoing &&
          demandsWithReservationOngoing.length > 0 && (
            <ReservationOngoingWrapper
              count={demandsWithReservationOngoing.length}
            >
              {demandsWithReservationOngoing.map((demand) => {
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
              {demandsWithoutReservationOngoing?.map((demand) => (
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
      <div className="line-clamp-1 flex h-40 w-full items-center gap-8 bg-basic-grey-50 px-24">
        <SmallBusIcon />
        <span className="text-12 font-500 text-basic-grey-600">
          수요신청 하신 셔틀 중{' '}
          <span className="font-600 text-basic-grey-700">{count}개</span>의
          셔틀이 예약 진행 중입니다.
        </span>
      </div>
      {children}
      <div className="mt-12 h-8 w-full bg-basic-grey-50" />
    </>
  );
};
