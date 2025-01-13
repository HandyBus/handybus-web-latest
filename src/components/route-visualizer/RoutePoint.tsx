import { ShuttleRouteHub } from '@/types/v2-temp/shuttle-operation.type';
interface Props {
  hubs: ShuttleRouteHub[];
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
}

const RoutePoints = ({ hubs, type }: Props) => {
  return hubs.map((_, index) => {
    if (type === 'TO_DESTINATION') {
      return index === hubs?.length - 1 ? (
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

export default RoutePoints;

const CirclePoint = ({
  type,
}: {
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
}) => {
  return (
    <div
      className={`h-12 w-12 rounded-full border-[2px] ${type === 'TO_DESTINATION' ? 'border-primary-main' : 'border-grey-500'} bg-white`}
    />
  );
};

const ArrivalPoint = ({
  type,
}: {
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
}) => {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full ${type === 'TO_DESTINATION' ? 'bg-primary-main' : 'bg-grey-500'}`}
    >
      <span className="text-[8px] font-700 leading-[9.55px] text-white">
        {type === 'TO_DESTINATION' ? '도착' : '출발'}
      </span>
    </div>
  );
};
