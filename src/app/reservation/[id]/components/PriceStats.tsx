'use client';

import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { TripType } from '@/types/v2-temp/shuttle-operation.type';
import { dateString } from '@/utils/dateString';

interface Props {
  tripType: TripType;
  region: string;
  destination: string;
  regularPrice: {
    toDestination: number;
    fromDestination: number;
    roundTrip: number;
  };
  isEarlybird: boolean;
  earlybirdDeadline?: Date | null;
  earlybirdPrice: {
    toDestination: number;
    fromDestination: number;
    roundTrip: number;
  };
}

const PriceStats = ({
  tripType,
  region,
  destination,
  regularPrice,
  isEarlybird,
  earlybirdDeadline,
  earlybirdPrice,
}: Props) => {
  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="relative text-22 font-700 leading-[30.8px] text-grey-900">
          셔틀 가격
          {isEarlybird && earlybirdDeadline && (
            <span className="absolute -top-4 translate-x-8 text-14 font-500 text-red-600">
              {dateString(earlybirdDeadline, false)}까지 얼리버드 🔥
            </span>
          )}
        </h2>
      </header>
      <section className="flex flex-col gap-12">
        {tripType === 'ROUND_TRIP' && (
          <Card
            tripType="ROUND_TRIP"
            highlighted={true}
            regularPrice={regularPrice.roundTrip}
            isEarlybird={isEarlybird}
            earlybirdPrice={earlybirdPrice.roundTrip}
          />
        )}
        {(tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') && (
          <Card
            tripType="TO_DESTINATION"
            highlighted={tripType === 'TO_DESTINATION'}
            region={region}
            destination={destination}
            regularPrice={regularPrice.toDestination}
            isEarlybird={isEarlybird}
            earlybirdPrice={earlybirdPrice.toDestination}
          />
        )}
        {(tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') && (
          <Card
            tripType="FROM_DESTINATION"
            highlighted={tripType === 'FROM_DESTINATION'}
            region={region}
            destination={destination}
            regularPrice={regularPrice.fromDestination}
            isEarlybird={isEarlybird}
            earlybirdPrice={earlybirdPrice.fromDestination}
          />
        )}
      </section>
    </article>
  );
};

export default PriceStats;

interface CardProps {
  tripType: TripType;
  highlighted?: boolean;
  region?: string;
  destination?: string;
  regularPrice: number;
  isEarlybird: boolean;
  earlybirdPrice?: number;
}

const Card = ({
  tripType,
  highlighted = false,
  region,
  destination,
  regularPrice,
  isEarlybird,
  earlybirdPrice,
}: CardProps) => {
  const parsedRegularPrice = regularPrice.toLocaleString();
  const parsedEarlybirdPrice = earlybirdPrice?.toLocaleString();
  const discountRate = Math.round(
    ((regularPrice - (earlybirdPrice ?? 0)) / regularPrice) * 100,
  );

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
            {TRIP_STATUS_TO_STRING[tripType]}
          </p>
        </span>
        {region && destination && (
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              {displayRouteInfo(tripType, destination, region)}
            </p>
          </span>
        )}
      </div>
      <div className="flex flex-col items-end">
        {isEarlybird && (
          <div>
            <span className="text-14 font-600 text-red-700">얼리버드 </span>
            <span className="text-16 font-700 text-red-600">
              {discountRate}%
            </span>
            <span className="pl-[5px] text-12 font-400 text-grey-500 line-through">
              {parsedRegularPrice} 원
            </span>
          </div>
        )}
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            {isEarlybird ? parsedEarlybirdPrice : parsedRegularPrice}
          </span>
          <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
            원
          </span>
        </div>
      </div>
    </div>
  );
};

export const displayRouteInfo = (
  tripType: TripType,
  destination: string,
  region?: string,
) => {
  if (!region) return;
  if (tripType === 'ROUND_TRIP') return `${region} ↔ ${destination}`;
  if (tripType === 'TO_DESTINATION') return `${region} → ${destination}`;
  if (tripType === 'FROM_DESTINATION') return `${destination} → ${region}`;
};
