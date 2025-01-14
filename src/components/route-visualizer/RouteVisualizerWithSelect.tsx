'use client';

import dayjs from 'dayjs';
import RoutePoints from './RoutePoint';
import { ShuttleRouteHub } from '@/types/shuttle-operation.type';

type ToDestinationType = {
  type: 'TO_DESTINATION';
  toDestinationHubs: ShuttleRouteHub[];
  toDestinationHubValue: ShuttleRouteHub | undefined;
  setToDestinationHubValue: (value: ShuttleRouteHub | undefined) => void;
};

type FromDestinationType = {
  type: 'FROM_DESTINATION';
  fromDestinationHubs: ShuttleRouteHub[];
  fromDestinationHubValue: ShuttleRouteHub | undefined;
  setFromDestinationHubValue: (value: ShuttleRouteHub | undefined) => void;
};

type RoundTripType = {
  type: 'ROUND_TRIP';
  toDestinationHubs: ShuttleRouteHub[];
  toDestinationHubValue: ShuttleRouteHub | undefined;
  setToDestinationHubValue: (value: ShuttleRouteHub | undefined) => void;
  fromDestinationHubs: ShuttleRouteHub[];
  fromDestinationHubValue: ShuttleRouteHub | undefined;
  setFromDestinationHubValue: (value: ShuttleRouteHub | undefined) => void;
};

type Props = ToDestinationType | FromDestinationType | RoundTripType;

const RouteVisualizerWithSelect = (props: Props) => {
  return (
    <section className="flex flex-col gap-16">
      <header>
        <h2 className="text-22 font-700 leading-[30.8px]">
          탑승/하차 장소를 선택해주세요
        </h2>
        <p className="text-14 font-500 leading-[22.4px] text-grey-500">
          예약 현황에 따라 추가 경유지가 발생하거나 시각이 변동될 수 있습니다.
        </p>
      </header>
      <section className="flex flex-col gap-40">
        {(props.type === 'ROUND_TRIP' || props.type === 'TO_DESTINATION') && (
          <RouteCard
            type={'TO_DESTINATION'}
            hubs={props.toDestinationHubs}
            hubValue={props.toDestinationHubValue}
            setHubValue={props.setToDestinationHubValue}
          />
        )}
        {(props.type === 'ROUND_TRIP' || props.type === 'FROM_DESTINATION') && (
          <RouteCard
            type={'FROM_DESTINATION'}
            hubs={props.fromDestinationHubs}
            hubValue={props.fromDestinationHubValue}
            setHubValue={props.setFromDestinationHubValue}
          />
        )}
      </section>
    </section>
  );
};

export default RouteVisualizerWithSelect;

type RouteCardProps = {
  hubs: ShuttleRouteHub[];
  type: 'TO_DESTINATION' | 'FROM_DESTINATION';
  hubValue: ShuttleRouteHub | undefined;
  setHubValue: (value: ShuttleRouteHub | undefined) => void;
};

const RouteCard = ({ hubs, type, hubValue, setHubValue }: RouteCardProps) => {
  const sortedHubs = hubs.sort((a, b) => a.sequence - b.sequence);

  return (
    <article
      role="region"
      aria-label={`${type === 'TO_DESTINATION' ? '콘서트행' : '귀가행'} 셔틀 노선`}
      className="flex flex-col gap-12"
    >
      <h3 className="flex items-center justify-between text-16 font-700 leading-[22.4px]">
        {type === 'TO_DESTINATION' ? '콘서트행' : '귀가행'}
        <span className="text-12 font-400 leading-[19.2px] text-grey-500">
          선택
        </span>
      </h3>
      <section className="flex w-full gap-12">
        <div
          aria-label={`${type === 'TO_DESTINATION' ? '콘서트행' : '귀가행'} 경로 표시`}
          className={`relative flex flex-col items-center ${type === 'TO_DESTINATION' ? 'pt-[6px]' : 'pb-[6px]'}`}
        >
          <hr
            className={`absolute h-[calc(100%-12px)] w-[2px] bg-${type === 'TO_DESTINATION' ? 'primary-main' : 'grey-500'} `}
          />
          <ol className="relative flex h-full flex-col items-center justify-between ">
            <RoutePoints hubs={sortedHubs} type={type} />
          </ol>
        </div>
        <ul className="flex w-full flex-col gap-16">
          {sortedHubs.map((hub, index) => (
            <li key={index}>
              <HubItem
                isDestination={
                  type === 'TO_DESTINATION'
                    ? index === sortedHubs.length - 1
                    : index === 0
                }
                hub={hub}
                selectedHub={hubValue}
                setSelectedHub={setHubValue}
              />
            </li>
          ))}
        </ul>
      </section>
      <p className="text-12 font-500 leading-[19.2px] text-grey-500">
        {type === 'TO_DESTINATION'
          ? '탑승장소를 선택해주세요'
          : '하차장소를 선택해주세요'}
      </p>
    </article>
  );
};

interface HubItemProps {
  isDestination: boolean;
  hub: ShuttleRouteHub;
  selectedHub: ShuttleRouteHub | undefined;
  setSelectedHub: (value: ShuttleRouteHub | undefined) => void;
}

const HubItem = ({
  isDestination,
  hub,
  selectedHub,
  setSelectedHub,
}: HubItemProps) => {
  return (
    <div className="flex w-full justify-between ">
      <div className="flex items-center gap-16 ">
        <p className="w-[36px] flex-shrink-0 text-12 font-400 leading-[19.2px] text-grey-600-sub">
          {dayjs(hub.arrivalTime).format('HH:mm')}
        </p>
        <p
          className={`text-16 font-400 leading-[24px] ${
            isDestination
              ? 'text-grey-600'
              : selectedHub?.shuttleRouteHubId === hub.shuttleRouteHubId
                ? 'text-grey-900'
                : 'text-grey-300'
          }`}
        >
          {hub.name}
        </p>
      </div>
      {!isDestination && (
        <input
          type="radio"
          checked={selectedHub?.shuttleRouteHubId === hub.shuttleRouteHubId}
          onChange={() => {
            setSelectedHub(hub);
          }}
          className="h-20 w-20 cursor-pointer accent-grey-800"
        />
      )}
    </div>
  );
};
