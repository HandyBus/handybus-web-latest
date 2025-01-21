'use client';

import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { TripType } from '@/types/shuttle-operation.type';
import { dateString } from '@/utils/dateString.util';

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
  earlybirdDeadline?: string | null;
  earlybirdPrice: {
    toDestination: number;
    fromDestination: number;
    roundTrip: number;
  };
  remainingSeat: {
    toDestination: number;
    fromDestination: number;
  };
  maxSeat: number;
}

const PriceStats = ({
  tripType,
  region,
  destination,
  regularPrice,
  isEarlybird,
  earlybirdDeadline,
  earlybirdPrice,
  remainingSeat,
  maxSeat,
}: Props) => {
  const roundTripRemainingSeat = Math.min(
    remainingSeat.toDestination,
    remainingSeat.fromDestination,
  );
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
            regularPrice={regularPrice.roundTrip}
            isEarlybird={isEarlybird}
            earlybirdPrice={earlybirdPrice.roundTrip}
            remainingSeat={roundTripRemainingSeat}
            maxSeat={maxSeat}
          />
        )}
        {(tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') && (
          <Card
            tripType="TO_DESTINATION"
            region={region}
            destination={destination}
            regularPrice={regularPrice.toDestination}
            isEarlybird={isEarlybird}
            earlybirdPrice={earlybirdPrice.toDestination}
            remainingSeat={remainingSeat.toDestination}
            maxSeat={maxSeat}
          />
        )}
        {(tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') && (
          <Card
            tripType="FROM_DESTINATION"
            region={region}
            destination={destination}
            regularPrice={regularPrice.fromDestination}
            isEarlybird={isEarlybird}
            earlybirdPrice={earlybirdPrice.fromDestination}
            remainingSeat={remainingSeat.fromDestination}
            maxSeat={maxSeat}
          />
        )}
      </section>
    </article>
  );
};

export default PriceStats;

interface CardProps {
  tripType: TripType;
  region?: string;
  destination?: string;
  regularPrice: number;
  isEarlybird: boolean;
  earlybirdPrice?: number;
  remainingSeat: number;
  maxSeat: number;
}

const Card = ({
  tripType,
  region,
  destination,
  regularPrice,
  isEarlybird,
  earlybirdPrice,
  remainingSeat,
  maxSeat,
}: CardProps) => {
  const parsedRegularPrice = regularPrice.toLocaleString();
  const parsedEarlybirdPrice = earlybirdPrice?.toLocaleString();
  const discountRate = Math.round(
    ((regularPrice - (earlybirdPrice ?? 0)) / regularPrice) * 100,
  );

  return (
    <div className="flex items-center justify-between gap-8 rounded-xl bg-[#F8F8F8] px-16 py-20">
      <div>
        <p className="flex gap-8 text-16 font-600 leading-[25.6px] text-grey-800">
          <span>{TRIP_STATUS_TO_STRING[tripType]}</span>
          <span className="text-12 font-400 text-grey-500">
            ({remainingSeat}/{maxSeat}석)
          </span>
        </p>
        {region && destination && (
          <span>
            <p className="break-keep text-12 font-400 leading-[19.2px] text-grey-500">
              {displayRouteInfo(tripType, destination, region)}
            </p>
          </span>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end">
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
