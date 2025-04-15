import Section from '../Section';
import DotIcon from '../../icons/dot-primary.svg';
import PinIcon from '../../icons/pin-primary.svg';
import {
  TripType,
  ShuttleRoutesViewEntity,
  ShuttleRouteHubsInShuttleRoutesViewEntity,
} from '@/types/shuttleRoute.type';
import { CustomError } from '@/services/custom-error';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { dateString } from '@/utils/dateString.util';

interface Props {
  tripType: TripType;
  shuttleRoute: ShuttleRoutesViewEntity;
  toDestinationHubId: string | null;
  fromDestinationHubId: string | null;
  passengerCount: number;
}

const ShuttleRouteInfoSection = ({
  tripType,
  shuttleRoute,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
}: Props) => {
  const toDestinationHub = shuttleRoute.toDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === toDestinationHubId,
  );
  const fromDestinationHub = shuttleRoute.fromDestinationShuttleRouteHubs?.find(
    (hub) => hub.shuttleRouteHubId === fromDestinationHubId,
  );

  if (
    (tripType === 'ROUND_TRIP' && (!toDestinationHub || !fromDestinationHub)) ||
    (tripType === 'TO_DESTINATION' && !toDestinationHub) ||
    (tripType === 'FROM_DESTINATION' && !fromDestinationHub)
  ) {
    throw new CustomError(404, '정류장을 찾을 수 없습니다.');
  }

  return (
    <Section heading="셔틀 정보">
      {(tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') &&
        toDestinationHub && (
          <TripCard
            tripType="TO_DESTINATION"
            hub={toDestinationHub}
            shuttleRoute={shuttleRoute}
            withRoundTrip={tripType === 'ROUND_TRIP'}
            passengerCount={passengerCount}
          />
        )}
      {(tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') &&
        fromDestinationHub && (
          <TripCard
            tripType="FROM_DESTINATION"
            hub={fromDestinationHub}
            shuttleRoute={shuttleRoute}
            withRoundTrip={tripType === 'ROUND_TRIP'}
            passengerCount={passengerCount}
          />
        )}
    </Section>
  );
};

export default ShuttleRouteInfoSection;

interface TripCardProps {
  tripType: Exclude<TripType, 'ROUND_TRIP'>;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
  shuttleRoute: ShuttleRoutesViewEntity;
  withRoundTrip: boolean;
  passengerCount: number;
}

const TripCard = ({
  tripType,
  hub,
  shuttleRoute,
  withRoundTrip,
  passengerCount,
}: TripCardProps) => {
  const tripTypeText = withRoundTrip
    ? '[왕복] ' + TRIP_STATUS_TO_STRING[tripType]
    : TRIP_STATUS_TO_STRING[tripType];
  const formattedDate = dateString(hub.arrivalTime);
  const formattedTime = dateString(hub.arrivalTime, {
    showYear: false,
    showDate: false,
    showTime: true,
    showWeekday: false,
  });
  const destinationHub =
    tripType === 'TO_DESTINATION'
      ? shuttleRoute.toDestinationShuttleRouteHubs
          ?.sort((a, b) => a.sequence - b.sequence)
          ?.at(-1)
      : shuttleRoute.fromDestinationShuttleRouteHubs?.sort(
          (a, b) => a.sequence - b.sequence,
        )?.[0];

  if (!destinationHub) {
    throw new CustomError(404, '도착지를 찾을 수 없습니다.');
  }

  const formattedDestinationDate = dateString(destinationHub.arrivalTime);
  const formattedDestinationTime = dateString(destinationHub.arrivalTime, {
    showYear: false,
    showDate: false,
    showTime: true,
    showWeekday: false,
  });

  return (
    <article className="w-full overflow-hidden rounded-16 border-[1.5px] border-basic-grey-100">
      <div className="w-full bg-basic-grey-50 p-8 text-center text-14 font-600 leading-[160%]">
        {tripTypeText}
      </div>
      <div className="flex gap-16 p-16">
        <div className="flex w-12 shrink-0 flex-col items-center py-[10px]">
          <DotIcon />
          <div className="-my-[2px] h-[54px] w-[2px] bg-brand-primary-400" />
          <PinIcon />
        </div>
        <div className="flex flex-col gap-24">
          {tripType === 'TO_DESTINATION' && (
            <>
              <HubItem
                date={formattedDate}
                time={formattedTime}
                name={hub.name}
              />
              <HubItem
                date={formattedDestinationDate}
                time={formattedDestinationTime}
                name={destinationHub.name}
              />
            </>
          )}
          {tripType === 'FROM_DESTINATION' && (
            <>
              <HubItem
                date={formattedDestinationDate}
                time={formattedDestinationTime}
                name={destinationHub.name}
              />
              <HubItem
                date={formattedDate}
                time={formattedTime}
                name={hub.name}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex w-full border-t-[1.5px] border-basic-grey-100">
        <div className="flex flex-1 flex-col items-center gap-4 border-r-[1px] border-basic-grey-100 py-8">
          <p className="text-12 font-600 leading-[160%] text-basic-grey-500">
            인원
          </p>
          <span className="text-16 font-600 leading-[160%]">
            {passengerCount}명
          </span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 border-l-[1px] border-basic-grey-100 py-8">
          <p className="text-12 font-600 leading-[160%] text-basic-grey-500">
            좌석
          </p>
          <span className="text-16 font-600 leading-[160%]">자유석</span>
        </div>
      </div>
    </article>
  );
};

interface HubItemProps {
  date: string;
  time: string;
  name: string;
}

const HubItem = ({ date, time, name }: HubItemProps) => {
  return (
    <li className="flex h-36 items-center gap-16">
      <div className="w-80 shrink-0">
        <p className="text-10 font-400 text-basic-grey-700">{date}</p>
        <p className="text-12 font-600">{time}</p>
      </div>
      <div className="h-16 w-[1px] bg-basic-grey-100" />
      <div className="text-16 font-600">{name}</div>
    </li>
  );
};
