'use client';

import SpinnerIcon from '/public/icons/spinner.svg';
import dayjs from 'dayjs';
import RoutePoints from './RoutePoint';
import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';

type Props = {
  type: TripType;
  toDestinationHubs?: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  fromDestinationHubs?: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  isSelected?: boolean;
  selectedToDestinationHub?: ShuttleRouteHubsInShuttleRoutesViewEntity;
  selectedFromDestinationHub?: ShuttleRouteHubsInShuttleRoutesViewEntity;
  isLoading?: boolean;
};

const RouteVisualizer = ({
  type,
  toDestinationHubs,
  fromDestinationHubs,
  isSelected = false,
  selectedToDestinationHub,
  selectedFromDestinationHub,
  isLoading = false,
}: Props) => {
  if (isLoading)
    return (
      <div className="flex h-[200px] w-full items-center justify-center">
        <SpinnerIcon
          className="animate-spin"
          viewBox="0 0 24 24"
          width={19.5}
          height={19.5}
        />
      </div>
    );

  return (
    <section className="flex flex-col gap-16">
      <header>
        <h2 className="text-22 font-700 leading-[30.8px]">셔틀 노선</h2>
        <p className="text-basic-grey-500 text-14 font-500 leading-[22.4px]">
          예약 현황에 따라 추가 경유지가 발생하거나 시각이 변동될 수 있습니다.
        </p>
      </header>
      <section className="flex flex-col gap-40">
        {(type === 'ROUND_TRIP' || type === 'TO_DESTINATION') &&
          toDestinationHubs &&
          (isSelected && selectedToDestinationHub ? (
            <RouteCard
              isSelected={true}
              selectedHub={selectedToDestinationHub}
              type="TO_DESTINATION"
              hubs={toDestinationHubs}
            />
          ) : (
            <RouteCard
              isSelected={false}
              type="TO_DESTINATION"
              hubs={toDestinationHubs}
            />
          ))}
        {(type === 'ROUND_TRIP' || type === 'FROM_DESTINATION') &&
          fromDestinationHubs &&
          (isSelected && selectedFromDestinationHub ? (
            <RouteCard
              isSelected={true}
              selectedHub={selectedFromDestinationHub}
              type="FROM_DESTINATION"
              hubs={fromDestinationHubs}
            />
          ) : (
            <RouteCard
              isSelected={false}
              type="FROM_DESTINATION"
              hubs={fromDestinationHubs}
            />
          ))}
      </section>
    </section>
  );
};

export default RouteVisualizer;

type RouteCardProps = {
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
} & (
  | {
      isSelected: true;
      selectedHub: ShuttleRouteHubsInShuttleRoutesViewEntity;
    }
  | {
      isSelected: false;
    }
);

const RouteCard = (props: RouteCardProps) => {
  const { isSelected, type, hubs } = props;
  const sortedHubs = hubs.sort((a, b) => a.sequence - b.sequence);

  const destinationHub =
    type === 'TO_DESTINATION'
      ? sortedHubs[sortedHubs.length - 1]
      : sortedHubs[0];
  const routeTime = isSelected
    ? Math.abs(
        dayjs(destinationHub.arrivalTime).diff(
          dayjs(props.selectedHub.arrivalTime),
          'minutes',
        ),
      )
    : undefined;

  return (
    <article
      role="region"
      aria-label={`${type === 'TO_DESTINATION' ? '가는 편' : '오는 편'} 셔틀 노선`}
      className="flex flex-col gap-12"
    >
      <h3 className="text-16 font-700 leading-[22.4px]">
        {type === 'TO_DESTINATION' ? '가는 편' : '오는 편'}
        {type === 'FROM_DESTINATION' && (
          <p className="text-basic-grey-500 text-12 font-400 leading-[19.2px]">
            오는 편 노선의 출발 시각은 콘서트 앵콜 종료 시각으로부터 약 30분
            이후로 책정하였으며, 변동될 수 있습니다.
          </p>
        )}
      </h3>
      <section className="flex w-full gap-12">
        <div
          aria-label={`${type === 'TO_DESTINATION' ? '가는 편' : '오는 편'} 경로 표시`}
          className={`relative flex flex-col items-center ${type === 'TO_DESTINATION' ? 'pt-[6px]' : 'pb-[6px]'}`}
        >
          <hr
            className={`absolute h-[calc(100%-12px)] w-[2px] bg-${type === 'TO_DESTINATION' ? 'primary-400' : 'grey-500'} `}
          />
          <ol className="relative flex h-full flex-col items-center justify-between ">
            <RoutePoints hubs={sortedHubs} type={type} />
          </ol>
        </div>
        <ul className="flex w-full flex-col gap-16">
          {sortedHubs.map((hub, index) => (
            <li key={index}>
              {isSelected ? (
                <HubItem
                  isDestination={
                    destinationHub.shuttleRouteHubId === hub.shuttleRouteHubId
                  }
                  hub={hub}
                  isSelected={true}
                  selectedHub={props.selectedHub}
                />
              ) : (
                <HubItem
                  isDestination={
                    destinationHub.shuttleRouteHubId === hub.shuttleRouteHubId
                  }
                  hub={hub}
                  isSelected={false}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
      {isSelected && (
        <p className="text-basic-grey-500 text-12 font-500 leading-[19.2px]">
          {type === 'TO_DESTINATION'
            ? `${destinationHub.name}에서 `
            : `${destinationHub.name}까지 `}
          <span className="font-600">약 {routeTime}분</span> 소요
        </p>
      )}
    </article>
  );
};

type HubItemProps = {
  isDestination: boolean;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
} & (
  | {
      isSelected: true;
      selectedHub: ShuttleRouteHubsInShuttleRoutesViewEntity;
    }
  | {
      isSelected: false;
    }
);

const HubItem = (props: HubItemProps) => {
  const { isDestination, hub, isSelected } = props;

  return (
    <div className="flex w-full justify-between ">
      <div className="flex items-center gap-16 ">
        <p className="text-basic-grey-600 w-[36px] flex-shrink-0 text-12 font-400 leading-[19.2px]">
          {dayjs(hub.arrivalTime).format('HH:mm')}
        </p>
        <p
          className={`text-16 font-400 leading-[24px] ${
            isSelected
              ? isDestination
                ? 'text-basic-grey-700'
                : props.selectedHub?.shuttleRouteHubId === hub.shuttleRouteHubId
                  ? 'text-basic-grey-700'
                  : 'text-basic-grey-300'
              : 'text-basic-grey-700'
          }`}
        >
          {hub.name}
        </p>
      </div>
    </div>
  );
};
