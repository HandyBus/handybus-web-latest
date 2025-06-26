import {
  ShuttleRouteHubsInShuttleRoutesViewEntity,
  TripType,
} from '@/types/shuttleRoute.type';
import { getHubType } from '../shuttleRouteDetailView.util';
import Hub from './Hub';
import { useState } from 'react';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';

interface Props {
  hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
  selectedHubIndex: number;
  tripType: Exclude<TripType, 'ROUND_TRIP'>;
  addOpenedHubIndex: (index: number) => void;
  removeOpenedHubIndex: (index: number) => void;
  isTaxiRoute: boolean;
}

const Hubs = ({
  hubs,
  selectedHubIndex,
  tripType,
  addOpenedHubIndex,
  removeOpenedHubIndex,
  isTaxiRoute,
}: Props) => {
  const [isKakaoMapScriptLoaded, setIsKakaoMapScriptLoaded] = useState(false);
  return (
    <>
      <KakaoMapScript onReady={() => setIsKakaoMapScriptLoaded(true)} />
      {hubs.map((hub, index) => {
        const type = getHubType({
          index,
          selectedHubIndex,
          tripType,
          length: hubs.length,
        });
        const isLastHub = index === hubs.length - 1;
        const hideTime = type !== 'eventDestination' && isTaxiRoute;
        return (
          <Hub
            key={hub.shuttleRouteHubId}
            type={type}
            tripType={tripType}
            hub={hub}
            isLastHub={isLastHub}
            index={index}
            addOpenedHubIndex={addOpenedHubIndex}
            removeOpenedHubIndex={removeOpenedHubIndex}
            isKakaoMapScriptLoaded={isKakaoMapScriptLoaded}
            hideTime={hideTime}
          />
        );
      })}
    </>
  );
};

export default Hubs;
