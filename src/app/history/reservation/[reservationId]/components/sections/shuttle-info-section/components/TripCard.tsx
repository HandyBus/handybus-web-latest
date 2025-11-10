import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { CustomError } from '@/services/custom-error';
import { TripType } from '@/types/shuttleRoute.type';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import DotIcon from '../icons/dot-primary.svg';
import PinIcon from '../icons/pin-primary.svg';
import HubItem from './HubItem';

interface Props {
  tripType: Exclude<TripType, 'ROUND_TRIP'>;
  hub: ShuttleRouteHubsInShuttleRoutesViewEntity;
  destinationHub: ShuttleRouteHubsInShuttleRoutesViewEntity | undefined;
  withRoundTrip: boolean;
  passengerCount: number;
  isHandyParty: boolean;
  desiredHubAddress?: string;
  desiredHubLatitude?: number;
  desiredHubLongitude?: number;
}

const TripCard = ({
  tripType,
  hub,
  destinationHub,
  withRoundTrip,
  passengerCount,
  isHandyParty,
  desiredHubAddress,
  desiredHubLatitude,
  desiredHubLongitude,
}: Props) => {
  const tripTypeText = isHandyParty
    ? '[핸디팟] ' + TRIP_STATUS_TO_STRING[tripType]
    : withRoundTrip
      ? '[왕복] ' + TRIP_STATUS_TO_STRING[tripType]
      : TRIP_STATUS_TO_STRING[tripType];
  const formattedDate = dateString(hub.arrivalTime);
  const formattedTime = dateString(hub.arrivalTime, {
    showYear: false,
    showDate: false,
    showTime: true,
    showWeekday: false,
  });

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
        <div className="flex w-full flex-col gap-24">
          {tripType === 'TO_DESTINATION' && (
            <>
              <HubItem
                date={formattedDate}
                time={formattedTime}
                hub={hub}
                hideTime={isHandyParty}
                isHandyParty={isHandyParty}
                desiredHubAddress={desiredHubAddress}
                desiredHubLatitude={desiredHubLatitude}
                desiredHubLongitude={desiredHubLongitude}
              />
              <HubItem
                date={formattedDestinationDate}
                time={formattedDestinationTime}
                hub={destinationHub}
              />
            </>
          )}
          {tripType === 'FROM_DESTINATION' && (
            <>
              <HubItem
                date={formattedDestinationDate}
                time={formattedDestinationTime}
                hub={destinationHub}
              />
              <HubItem
                date={formattedDate}
                time={formattedTime}
                hub={hub}
                hideTime={isHandyParty}
                isHandyParty={isHandyParty}
                desiredHubAddress={desiredHubAddress}
                desiredHubLatitude={desiredHubLatitude}
                desiredHubLongitude={desiredHubLongitude}
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

export default TripCard;
