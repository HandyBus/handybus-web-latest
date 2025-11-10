import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import TripCard from './components/TripCard';
import KakaoMap from './components/KakaoMap';
import Roadview from './components/Roadview';
import guideImage from './images/cheonan-asan-station-guide.png';
import Image from 'next/image';
import WrapperWithDivider from '../../WrapperWithDivider';

interface Props {
  reservation: ReservationsViewEntity;
  toDestinationHub:
    | ShuttleRouteHubsInShuttleRoutesViewEntity
    | null
    | undefined;
  fromDestinationHub:
    | ShuttleRouteHubsInShuttleRoutesViewEntity
    | null
    | undefined;
  shuttleRoute: ShuttleRoutesViewEntity;
  isHandyParty: boolean;
  isShuttleRouteEnded: boolean;
  isReservationCanceled: boolean;
}

const ShuttleInfoSection = ({
  reservation,
  toDestinationHub,
  fromDestinationHub,
  shuttleRoute,
  isHandyParty,
  isShuttleRouteEnded,
  isReservationCanceled,
}: Props) => {
  const tripType = reservation.type;
  const passengerCount = reservation.passengerCount;
  const desiredHubAddress =
    reservation.metadata?.desiredHubAddress ?? undefined;
  const desiredHubLatitude =
    reservation.metadata?.desiredHubLatitude ?? undefined;
  const desiredHubLongitude =
    reservation.metadata?.desiredHubLongitude ?? undefined;
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
    <WrapperWithDivider>
      <section className="px-16 py-24">
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

      {!isShuttleRouteEnded &&
        !isReservationCanceled &&
        (tripType === 'ROUND_TRIP' || tripType === 'TO_DESTINATION') &&
        toDestinationHub && (
          <>
            <div className="h-8 w-full bg-basic-grey-50" />
            <section className="flex flex-col gap-16 px-16 py-24">
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
                longitude={
                  isHandyParty && desiredHubLongitude
                    ? desiredHubLongitude
                    : toDestinationHub.longitude
                }
              />
              <div>
                <RoadviewContainer
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
                  longitude={
                    isHandyParty && desiredHubLongitude
                      ? desiredHubLongitude
                      : toDestinationHub.longitude
                  }
                  roadviewPan={toDestinationHub.roadViewPan}
                  roadviewTilt={toDestinationHub.roadViewTilt}
                />
                <ul className="list-disc pl-16 pt-12 text-14 font-500 leading-[160%] text-basic-grey-600">
                  <li>이미지를 돌려가며 주변을 확인해보세요.</li>
                  <li>
                    카카오맵에서 제공되는 이미지로, 현재와 다를 수 있습니다.
                  </li>
                </ul>
              </div>
              {toDestinationHub.regionHubId === '544768704622104610' && ( // 천안아산역의 경우에서만 부가 설명
                <div className="h-full rounded-8 bg-basic-grey-100">
                  <h3 className="px-12 py-8 text-12 font-600 leading-[160%] text-basic-grey-600">
                    *주차장 상세 이미지
                  </h3>
                  <article className="relative w-full">
                    <Image src={guideImage} alt="로드뷰" />
                  </article>
                  <p className="px-12 py-8 text-10 font-400 leading-[160%]">
                    천안아산역 3번출구 셔틀버스 정류장 1번 플랫폼(삼성디스플레이
                    · 도고온천 방향)입니다.
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      {!isShuttleRouteEnded &&
        !isReservationCanceled &&
        (tripType === 'ROUND_TRIP' || tripType === 'FROM_DESTINATION') &&
        fromDestinationDestinationHub && (
          <>
            <div className="h-8 w-full bg-basic-grey-50" />
            <section className="flex flex-col gap-16 px-16 py-24">
              <h3 className="text-16 font-600">귀가행 탑승 장소</h3>
              <div>
                <MapContainer
                  placeName={fromDestinationDestinationHub?.name}
                  latitude={fromDestinationDestinationHub?.latitude}
                  longitude={fromDestinationDestinationHub?.longitude}
                />
                <ul className="list-disc pl-20 pt-12 text-14 font-500 leading-[160%] text-basic-grey-600">
                  <li>
                    정확한 탑승 위치는 당일 공연 종료 직후 문자로 안내됩니다.
                  </li>
                  <li>
                    탑승 시각은 당일 공연 종료 시각이 반영되며, 변경 즉시 문자로
                    안내됩니다.
                  </li>
                </ul>
              </div>
            </section>
          </>
        )}
    </WrapperWithDivider>
  );
};

export default ShuttleInfoSection;

const MapContainer = ({
  placeName,
  latitude,
  longitude,
}: {
  placeName: string;
  latitude: number;
  longitude: number;
}) => {
  return (
    <section>
      <section className="rounded-t-8 border-[1px] border-basic-grey-200 px-12 py-8">
        <h4 className="text-14 font-600 leading-[160%] text-basic-black">
          지도
        </h4>
      </section>
      <section className="h-[195px] rounded-b-8 border-[1px] border-basic-grey-200">
        <KakaoMap
          placeName={placeName}
          latitude={latitude}
          longitude={longitude}
        />
      </section>
    </section>
  );
};

const RoadviewContainer = ({
  placeName,
  latitude,
  longitude,
  roadviewPan,
  roadviewTilt,
}: {
  placeName: string;
  latitude: number;
  longitude: number;
  roadviewPan: number | null;
  roadviewTilt: number | null;
}) => {
  return (
    <section>
      <section className="rounded-t-8 border-[1px] border-basic-grey-200 px-12 py-8">
        <h4 className="text-14 font-600 leading-[160%] text-basic-black">
          로드뷰
        </h4>
      </section>
      <section className="h-[195px] rounded-b-8 border-[1px] border-basic-grey-200">
        <Roadview
          placeName={placeName}
          latitude={latitude}
          longitude={longitude}
          roadviewPan={roadviewPan}
          roadviewTilt={roadviewTilt}
        />
      </section>
    </section>
  );
};
