import { ROUTE_TYPE, ShuttleRouteHubObject } from '@/types/shuttle.types';
import { RouteType } from '@/types/shuttle.types';

interface Props {
  object: ShuttleRouteHubObject[];
  type: RouteType;
}

export const RenderPoints = ({ object, type }: Props) => {
  return object?.map((_, index) => {
    if (type === ROUTE_TYPE.DEPARTURE) {
      return index === object?.length - 1 ? (
        <ArrivalPoint key={index} type={type} />
      ) : (
        <CirclePoint key={index} type={type} />
      );
    } else {
      return index === 0 ? (
        <ArrivalPoint key={index} type={type} />
      ) : (
        <CirclePoint key={index} type={type} />
      );
    }
  });
};

const CirclePoint = ({ type }: { type: RouteType }) => {
  return (
    <div
      className={`h-12 w-12 rounded-full border-[2px] ${type === ROUTE_TYPE.DEPARTURE ? 'border-primary-main' : 'border-grey-500'} bg-white`}
    />
  );
};

const ArrivalPoint = ({ type }: { type: RouteType }) => {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full ${type === ROUTE_TYPE.DEPARTURE ? 'bg-primary-main' : 'bg-grey-500'}`}
    >
      <span className="text-[8px] font-700 leading-[9.55px] text-white">
        {type === ROUTE_TYPE.DEPARTURE ? '도착' : '출발'}
      </span>
    </div>
  );
};
