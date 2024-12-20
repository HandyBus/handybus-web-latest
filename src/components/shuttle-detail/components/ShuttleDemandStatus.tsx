'use client';

import { ShuttleDemandStatusCount } from '@/types/shuttle.types';
import { formatDate } from '../shuttleDetailPage.utils';
import LoadingSpinner from './LoadingSpinner';
import { useGetShuttleDemandStatus } from '@/services/shuttleOperation';

interface Props {
  type: 'DEMAND_SURVEY' | 'SELECT_SHUTTLE';
  shuttleId: number;
  dailyShuttle: {
    id: number;
    date: string;
  };
  shuttle_location: string;
  destination: string;
  regionId: number | undefined;
}
const ShuttleDemandStatus = ({
  type,
  shuttleId,
  dailyShuttle,
  shuttle_location,
  destination,
  regionId,
}: Props) => {
  const { data: demandStatsData, isLoading } = useGetShuttleDemandStatus(
    shuttleId,
    dailyShuttle.id,
    regionId,
  );

  if (!demandStatsData) return;
  if (isLoading) return <LoadingSpinner />;
  switch (type) {
    case 'DEMAND_SURVEY':
      return (
        <DemandSurvey
          shuttle_date={dailyShuttle.date}
          shuttle_location={shuttle_location}
          demand_data={demandStatsData.count}
          destination={destination}
        />
      );
    case 'SELECT_SHUTTLE':
      return (
        <SelectShuttle
          shuttle_date={dailyShuttle.date}
          shuttle_location={shuttle_location}
          destination={destination}
        />
      );
  }
};

export default ShuttleDemandStatus;

interface DemandSurveyProps {
  shuttle_date: string;
  shuttle_location: string;
  demand_data: ShuttleDemandStatusCount;
  destination: string;
}
const DemandSurvey = ({
  shuttle_date,
  shuttle_location,
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
          {shuttle_location ? '에 ' : ' '}
          <span className="text-grey-700">{shuttle_location}</span>
          {shuttle_location ? '를 지나는 ' : ''}
          셔틀에 대한 수요 신청 현황을 보여드려요.
        </p>
      </header>
      <section className="flex flex-col gap-12">
        <ShuttleCard
          type="DEMAND_SURVEY"
          tripType="왕복"
          highlighted={true}
          count={demand_data.roundTripCount}
          shuttleLocation={shuttle_location}
          destination={destination}
        />
        <ShuttleCard
          type="DEMAND_SURVEY"
          tripType="콘서트행"
          count={demand_data.fromDestinationCount}
          shuttleLocation={shuttle_location}
          destination={destination}
        />
        <ShuttleCard
          type="DEMAND_SURVEY"
          tripType="귀가행"
          count={demand_data.toDestinationCount}
          shuttleLocation={shuttle_location}
          destination={destination}
        />
      </section>
    </article>
  );
};

interface SelectShuttleProps {
  shuttle_date: string;
  shuttle_location: string;
  destination: string;
}
const SelectShuttle = ({
  // shuttle_date,
  // shuttle_location,
  destination,
}: SelectShuttleProps) => {
  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          셔틀 예상 가격
        </h2>
      </header>
      <section className="flex flex-col gap-12">
        <ShuttleCard
          type="PREDICT_PRICE"
          highlighted={true}
          destination={destination}
        />
        <ShuttleCard type="PREDICT_PRICE" destination={destination} />
        <ShuttleCard type="PREDICT_PRICE" destination={destination} />
      </section>
    </article>
  );
};
const ShuttleCard = ({
  type,
  tripType,
  highlighted = false,
  count,
  shuttleLocation,
  destination,
}: {
  type?: 'PREDICT_PRICE' | 'DEMAND_SURVEY';
  tripType?: '왕복' | '콘서트행' | '귀가행';
  highlighted?: boolean;
  count?: number;
  shuttleLocation?: string;
  destination: string;
}) => {
  const 경로표기 = (
    tripType: '왕복' | '콘서트행' | '귀가행' | undefined,
    destination: string,
    shuttleLocation?: string,
  ) => {
    if (!shuttleLocation) return '';
    if (tripType === '왕복') return `${shuttleLocation} ↔ ${destination}`;
    if (tripType === '콘서트행') return `${shuttleLocation} → ${destination}`;
    if (tripType === '귀가행') return `${destination} → ${shuttleLocation}`;
  };

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
              왕복
            </p>
          </span>
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              충청북도 청주시 ↔ 잠실실내체육관
            </p>
          </span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            50,000
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
              {경로표기(tripType, destination, shuttleLocation)}
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
