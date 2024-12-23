'use client';

import { ReactNode, useState } from 'react';
import SmallBusIcon from 'public/icons/bus-small.svg';
import { ShuttleDemandType } from '@/types/client.types';
import DemandCard from '../DemandCard';
import { ID_TO_REGION } from '@/constants/regions';
import { getRoutes, useDeleteDemand } from '@/services/shuttleOperation';
import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import dynamic from 'next/dynamic';
const EmptyView = dynamic(() => import('../EmptyView'));

interface Props {
  demands: ShuttleDemandType[];
}

const DemandTab = ({ demands }: Props) => {
  const reservationOngoingDemands = demands.filter(async (demand) => {
    if (demand.status !== 'SHUTTLE_ASSIGNED') {
      return false;
    }
    const region = ID_TO_REGION[demand.regionID];
    const routes = await getRoutes(
      demand.shuttle.id,
      demand.dailyShuttleID,
      region,
    );
    if (routes.length === 0) {
      return false;
    }
    return true;
  });

  const { mutate: deleteDemand } = useDeleteDemand();
  const [isOpen, setIsOpen] = useState(false);
  const [demand, setDemand] = useState<ShuttleDemandType | null>(null);

  if (demands.length === 0) {
    return <EmptyView />;
  }

  return (
    <>
      <ul>
        <ReservationOngoingWrapper>
          {reservationOngoingDemands.map((demand) => (
            <DemandCard
              key={demand.id}
              demand={demand}
              buttonText="현재 예약이 진행되고 있는 셔틀이 있어요!"
              buttonHref={`/shuttle-detail/${demand.shuttle.id}`}
            />
          ))}
        </ReservationOngoingWrapper>
        {demands.map((demand) => (
          <DemandCard
            key={demand.id}
            demand={demand}
            subButtonText={
              demand.status === 'OPEN' ? '신청 취소' : '수요조사 확인 종료'
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
            shuttleID: demand.shuttle.id,
            dailyShuttleID: demand.dailyShuttleID,
            ID: demand.id,
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
}

const ReservationOngoingWrapper = ({
  children,
}: ReservationOngoingWrapperProps) => {
  return (
    <>
      <div className="line-clamp-1 flex h-40 w-full items-center gap-8 bg-grey-50 px-24">
        <SmallBusIcon />
        <span className="text-12 font-500 text-grey-600">
          수요신청 하신 셔틀 중{' '}
          <span className="font-600 text-grey-800">1개</span>의 셔틀이 예약 진행
          중입니다.
        </span>
      </div>
      {children}
      <div className="mt-12 h-8 w-full bg-grey-50" />
    </>
  );
};
