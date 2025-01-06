'use client';

import { ShuttleRouteType } from '@/types/shuttle.types';
import { HubsType } from '@/types/hub.type';
import { formatDate } from '../shuttleDetailPage.utils';
import LoadingSpinner from './LoadingSpinner';
import { useMemo } from 'react';
import {
  displayRouteInfo,
  displayRouteInfoForReservation,
} from './shuttleDemandStatus.util';
import { useGetShuttleDemandStats } from '@/services/shuttleOperation';

interface Props {
  type: 'DEMAND_SURVEY' | 'SELECT_SHUTTLE';
  shuttleId: number;
  dailyShuttle: {
    dailyShuttleId: number;
    date: string;
  };
  shuttleLocation: string;
  destination: string;
  regionId: number | undefined;
}
export const ShuttleDemandStats = ({
  type,
  shuttleId,
  dailyShuttle,
  shuttleLocation,
  destination,
  regionId,
}: Props) => {
  const { data: demandStats, isLoading } = useGetShuttleDemandStats(
    shuttleId,
    dailyShuttle.dailyShuttleId,
    regionId,
  );

  if (!demandStats) return;
  if (isLoading) return <LoadingSpinner />;
  switch (type) {
    case 'DEMAND_SURVEY':
      return (
        <DemandSurvey
          shuttle_date={dailyShuttle.date}
          shuttleLocation={shuttleLocation}
          demand_data={demandStats.count}
          destination={destination}
        />
      );
  }
};

interface DemandSurveyProps {
  shuttle_date: string;
  shuttleLocation: string;
  demand_data: {
    fromDestinationCount: number;
    roundTripCount: number;
    toDestinationCount: number;
  };
  destination: string;
}
const DemandSurvey = ({
  shuttle_date,
  shuttleLocation,
  demand_data,
  destination,
}: DemandSurveyProps) => {
  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          수요 신청한 사람들
        </h2>
        <p className="pb-16 pt-4 text-14 font-500 leading-[22.4px] text-grey-500">
          이번 콘서트를 위해{' '}
          <span className="text-grey-700">{formatDate(shuttle_date)}</span>
          {shuttleLocation ? '에 ' : ' '}
          <span className="text-grey-700">{shuttleLocation}</span>
          {shuttleLocation ? '를 지나는 ' : ''}
          셔틀에 대한 수요 신청 현황을 보여드려요.
        </p>
      </header>
      <section className="flex flex-col gap-12">
        <ShuttleCard
          type="DEMAND_SURVEY"
          tripType="왕복"
          highlighted={true}
          count={demand_data.roundTripCount}
          shuttleLocation={shuttleLocation}
          destination={destination}
        />
        <ShuttleCard
          type="DEMAND_SURVEY"
          tripType="콘서트행"
          count={demand_data.fromDestinationCount}
          shuttleLocation={shuttleLocation}
          destination={destination}
        />
        <ShuttleCard
          type="DEMAND_SURVEY"
          tripType="귀가행"
          count={demand_data.toDestinationCount}
          shuttleLocation={shuttleLocation}
          destination={destination}
        />
      </section>
    </article>
  );
};

interface ShuttlePriceStatusProps {
  destination: string;
  reservData: ShuttleRouteType[] | [];
  shuttleRouteId: number | undefined;
}
export const ShuttlePriceStatus = ({
  destination,
  reservData,
  shuttleRouteId,
}: ShuttlePriceStatusProps) => {
  const PriceInfo = useMemo(
    () => reservData.find((route) => route.shuttleRouteId === shuttleRouteId),
    [reservData, shuttleRouteId],
  );
  const isEarlybirdSeason = useMemo(() => {
    if (!PriceInfo?.earlybirdDeadline) return false;
    return new Date(PriceInfo?.earlybirdDeadline) > new Date();
  }, [PriceInfo?.earlybirdDeadline]);

  if (!shuttleRouteId || !destination) return;
  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          셔틀 가격
        </h2>
      </header>
      <section className="flex flex-col gap-12">
        <ShuttleCard
          type="PREDICT_PRICE"
          tripType="왕복"
          hubs={PriceInfo?.hubs}
          highlighted={true}
          destination={destination}
          price={
            reservData.find((route) => route.shuttleRouteId === shuttleRouteId)
              ?.regularPriceRoundTrip
          }
          isEarlybirdSeason={isEarlybirdSeason}
          earlybirdPrice={PriceInfo?.earlybirdPriceRoundTrip}
        />
        <ShuttleCard
          type="PREDICT_PRICE"
          tripType="콘서트행"
          hubs={PriceInfo?.hubs}
          destination={destination}
          price={
            reservData.find((route) => route.shuttleRouteId === shuttleRouteId)
              ?.regularPriceToDestination
          }
          isEarlybirdSeason={isEarlybirdSeason}
          earlybirdPrice={PriceInfo?.earlybirdPriceToDestination}
        />
        <ShuttleCard
          type="PREDICT_PRICE"
          tripType="귀가행"
          hubs={PriceInfo?.hubs}
          destination={destination}
          price={
            reservData.find((route) => route.shuttleRouteId === shuttleRouteId)
              ?.regularPriceFromDestination
          }
          isEarlybirdSeason={isEarlybirdSeason}
          earlybirdPrice={PriceInfo?.earlybirdPriceFromDestination}
        />
      </section>
    </article>
  );
};

const ShuttleCard = ({
  type,
  tripType,
  highlighted = false,
  hubs,
  count,
  shuttleLocation,
  price,
  isEarlybirdSeason,
  earlybirdPrice,
  destination,
}: {
  type?: 'PREDICT_PRICE' | 'DEMAND_SURVEY';
  tripType?: '왕복' | '콘서트행' | '귀가행';
  highlighted?: boolean;
  hubs?: HubsType;
  count?: number;
  shuttleLocation?: string;
  price?: number;
  isEarlybirdSeason?: boolean;
  earlybirdPrice?: number;
  destination: string;
}) => {
  if (isEarlybirdSeason)
    return (
      <div
        className={`flex items-center justify-between rounded-xl px-16 py-20 ${
          highlighted
            ? 'bg-gradient-to-r from-[#E5FFF8] to-transparent'
            : 'bg-[#F8F8F8]'
        }`}
      >
        <div>
          <span>
            <p className="text-16 font-600 leading-[25.6px] text-grey-800">
              {tripType}
            </p>
          </span>
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              {displayRouteInfoForReservation(tripType, hubs)}
            </p>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex w-[140px] flex-shrink-0 items-baseline justify-end gap-[5px]">
            <span className="text-10 font-600 leading-[16px] text-red-700">
              얼리버드
            </span>
            <span className="text-16 font-700 leading-[25.6px] text-red-600">
              {earlybirdPrice &&
                price &&
                Math.floor(100 - (earlybirdPrice / price) * 100)}
              %
            </span>
            <span className="text-12 font-400 leading-[19.2px] text-grey-500 line-through">
              {price?.toLocaleString()}원
            </span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-24 font-700 leading-[38.4px] text-grey-900">
              {earlybirdPrice?.toLocaleString()}
            </span>
            <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
              원
            </span>
          </div>
        </div>
      </div>
    );

  if (type === 'PREDICT_PRICE')
    return (
      <div
        className={`flex items-center justify-between rounded-xl px-16 py-20 ${
          highlighted
            ? 'bg-gradient-to-r from-[#E5FFF8] to-transparent'
            : 'bg-[#F8F8F8]'
        }`}
      >
        <div>
          <span>
            <p className="text-16 font-600 leading-[25.6px] text-grey-800">
              {tripType}
            </p>
          </span>
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              {displayRouteInfoForReservation(tripType, hubs)}
            </p>
          </span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            {price?.toLocaleString()}
          </span>
          <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
            원
          </span>
        </div>
      </div>
    );

  if (type === 'DEMAND_SURVEY')
    return (
      <div
        className={`flex items-center justify-between rounded-xl px-16 py-20 ${
          highlighted
            ? 'bg-gradient-to-r from-[#E5FFF8] to-transparent'
            : 'bg-[#F8F8F8]'
        }`}
      >
        <div>
          <span>
            <p className="text-16 font-600 leading-[25.6px] text-grey-800">
              {tripType}
            </p>
          </span>
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              {displayRouteInfo(tripType, destination, shuttleLocation)}
            </p>
          </span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            {count}
          </span>
          <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
            명
          </span>
        </div>
      </div>
    );
};
