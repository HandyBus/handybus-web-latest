import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { TripType } from '@/types/shuttleRoute.type';
import TripCard from './components/TripCard';
import KakaoMap from './components/KakaoMap';
import Roadview from './components/Roadview';

interface Props {
  tripType: TripType;
  toDestinationHub:
    | ShuttleRouteHubsInShuttleRoutesViewEntity
    | null
    | undefined;
  fromDestinationHub:
    | ShuttleRouteHubsInShuttleRoutesViewEntity
    | null
    | undefined;
  shuttleRoute: ShuttleRoutesViewEntity;
  passengerCount: number;
  isHandyParty: boolean;
  desiredHubAddress?: string;
  desiredHubLatitude?: number;
  desiredHubLongitude?: number;
}

const ShuttleInfoSection = ({
  tripType,
  toDestinationHub,
  fromDestinationHub,
  shuttleRoute,
  passengerCount,
  isHandyParty,
  desiredHubAddress,
  desiredHubLatitude,
  desiredHubLongitude,
}: Props) => {
  const toDestinationDestinationHub =
    tripType === 'TO_DESTINATION' || tripType === 'ROUND_TRIP'
      ? shuttleRoute.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )
      : null;
  const fromDestinationDestinationHub =
    tripType === 'FROM_DESTINATION' || tripType === 'ROUND_TRIP'
      ? shuttleRoute.fromDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )
      : null;

  return (
    <>
      <section className="px-16">
        <h3 className="pb-16 text-16 font-600">셔틀 정보</h3>
        <div className="flex flex-col gap-16">
          {(tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') &&
            toDestinationHub &&
            toDestinationDestinationHub && (
              <TripCard
                tripType="TO_DESTINATION"
                hub={toDestinationHub}
                destinationHub={toDestinationDestinationHub}
                withRoundTrip={tripType === 'ROUND_TRIP'}
                passengerCount={passengerCount}
                isHandyParty={isHandyParty}
                desiredHubAddress={desiredHubAddress ?? '[집앞승차]'}
                desiredHubLatitude={desiredHubLatitude}
                desiredHubLongitude={desiredHubLongitude}
              />
            )}
          {(tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') &&
            fromDestinationHub &&
            fromDestinationDestinationHub && (
              <TripCard
                tripType="FROM_DESTINATION"
                hub={fromDestinationHub}
                destinationHub={fromDestinationDestinationHub}
                withRoundTrip={tripType === 'ROUND_TRIP'}
                passengerCount={passengerCount}
                isHandyParty={isHandyParty}
                desiredHubAddress={desiredHubAddress ?? '[집앞하차]'}
                desiredHubLatitude={desiredHubLatitude}
                desiredHubLongitude={desiredHubLongitude}
              />
            )}
        </div>
      </section>

      {(tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') &&
        toDestinationHub && (
          <>
            <div className="h-8 w-full bg-basic-grey-50" />
            <section className="flex flex-col gap-16 px-16">
              <h3 className="text-16 font-600">행사장행 탑승 장소</h3>
              {isHandyParty && (
                <p className="rounded-8 bg-basic-red-100 p-8 text-12 font-500 leading-[160%] text-basic-red-400">
                  이면도로·주차장·주정차금지구역 등으로 운행이 어려울 경우, 탑승
                  장소가 조정될 수 있습니다. 탑승 전 꼭 기사님의 연락을
                  확인해주세요.
                </p>
              )}
              <MapContainer
                placeName={
                  isHandyParty && desiredHubAddress
                    ? desiredHubAddress
                    : toDestinationHub.name
                }
                latitude={
                  isHandyParty && desiredHubLatitude
                    ? desiredHubLatitude
                    : toDestinationHub.latitude
                }
                longitude={toDestinationHub.longitude}
                type="MAP"
              />
              <div>
                <MapContainer
                  placeName={
                    isHandyParty && desiredHubAddress
                      ? desiredHubAddress
                      : toDestinationHub.name
                  }
                  latitude={
                    isHandyParty && desiredHubLatitude
                      ? desiredHubLatitude
                      : toDestinationHub.latitude
                  }
                  longitude={toDestinationHub.longitude}
                  type="LOAD_VIEW"
                />
                <div className="pt-8 text-14 font-500 leading-[160%] text-basic-grey-600">
                  이미지를 돌려가며 주변을 확인해보세요.
                  <div className="text-12 font-500 leading-[160%] text-basic-grey-600">
                    카카오맵에서 제공되는 이미지로, 현재와 다를 수 있습니다.
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      {(tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') &&
        fromDestinationDestinationHub && (
          <>
            <div className="h-8 w-full bg-basic-grey-50" />
            <section className="flex flex-col gap-16 px-16">
              <h3 className="text-16 font-600">귀가행 탑승 장소</h3>
              <div>
                <MapContainer
                  placeName={fromDestinationDestinationHub?.name}
                  latitude={fromDestinationDestinationHub?.latitude}
                  longitude={fromDestinationDestinationHub?.longitude}
                  type="MAP"
                />
                <ul className="list-disc pl-20 pt-8 text-14 font-500 leading-[160%] text-basic-grey-600">
                  <li>
                    정확한 탑승 위치는 당일 공연 종료 직후 문자로 안내됩니다.
                  </li>
                  <li>
                    귀가행 탑승 시간은 공연 종료 시간에 따라 지연되며, 변경된
                    탑승 시간은 당일에 문자로 안내됩니다.
                  </li>
                </ul>
              </div>
            </section>
          </>
        )}
    </>
  );
};

export default ShuttleInfoSection;

const MapContainer = ({
  placeName,
  latitude,
  longitude,
  type,
}: {
  placeName: string;
  latitude: number;
  longitude: number;
  type: 'MAP' | 'LOAD_VIEW';
}) => {
  return (
    <section>
      <section className="rounded-t-8 border-[1px] border-basic-grey-200 px-12 py-8">
        <h4 className="text-14 font-600 leading-[160%] text-basic-black">
          {type === 'MAP' ? '지도' : '로드뷰'}
        </h4>
      </section>
      <section className="h-[195px] rounded-b-8 border-[1px] border-basic-grey-200">
        {type === 'MAP' ? (
          <KakaoMap
            placeName={placeName}
            latitude={latitude}
            longitude={longitude}
          />
        ) : (
          <Roadview
            placeName={placeName}
            latitude={latitude}
            longitude={longitude}
          />
        )}
      </section>
    </section>
  );
};
