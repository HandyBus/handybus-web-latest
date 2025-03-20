import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';

interface Props {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  type: Exclude<TripType, 'ROUND_TRIP'>;
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
      className={`h-12 w-12 rounded-full border-[2px] ${type === 'TO_DESTINATION' ? 'border-brand-primary-400' : 'border-basic-grey-500'} bg-basic-white`}
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
      className={`relative flex h-24 w-24 items-center justify-center rounded-full ${type === 'TO_DESTINATION' ? 'bg-brand-primary-400' : 'bg-basic-grey-500'}`}
    >
      <span className="text-[8px] font-700 leading-[9.55px] text-basic-white">
        {type === 'TO_DESTINATION' ? '도착' : '출발'}
      </span>
    </div>
  );
};
