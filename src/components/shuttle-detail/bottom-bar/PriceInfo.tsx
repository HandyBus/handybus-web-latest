import { totalPrice } from '@/app/shuttle/[id]/write/sections/priceDetail.util';
import { ShuttleRoute } from '@/types/shuttle.types';

interface Props {
  currentShuttleData: ShuttleRoute;
  tripType: { value: string; label: string };
  passengerCount: number;
}

const PriceInfo = ({ currentShuttleData, passengerCount, tripType }: Props) => {
  return (
    <section className="flex items-center justify-between">
      <span className="text-14 font-400 leading-[22.4px] text-grey-900 ">
        총 금액
      </span>
      <div className="flex items-center text-12 font-400 leading-[19.2px] text-grey-600-sub ">
        <span>
          (
          {totalPrice({
            currentShuttleData,
            tripType,
            passengerCount: 1,
          })?.toLocaleString()}{' '}
          원 * {passengerCount}인)
        </span>
        <span className="ml-12 text-22 font-700 leading-[35.2px] text-grey-900">
          총{' '}
          {totalPrice({
            currentShuttleData,
            tripType,
            passengerCount,
          })?.toLocaleString()}
        </span>
        <span className="ml-4 text-14 font-400 leading-[22.4px] text-grey-900">
          원
        </span>
      </div>
    </section>
  );
};

export default PriceInfo;
