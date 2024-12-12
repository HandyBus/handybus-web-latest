'use client';

import { ReactNode } from 'react';
import SmallBusIcon from 'public/icons/bus-small.svg';
import { ShuttleDemandType } from '@/types/client.types';
import DemandCard from '../DemandCard';
import { ID_TO_REGION } from '@/constants/regions';
import { getRoutes, useDeleteDemand } from '@/services/shuttleOperation';

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

  return (
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
          subButtonText="신청 취소"
          subButtonOnClick={() => {
            deleteDemand({
              shuttleID: demand.shuttle.id,
              dailyShuttleID: demand.dailyShuttleID,
              ID: demand.id,
            });
          }}
        />
      ))}
    </ul>
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
