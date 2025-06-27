'use client';

import { TAXI_HUB_PREFIX } from '@/utils/taxiRoute.util';
import { useEffect, useRef } from 'react';

interface Props {
  placeName: string;
  latitude: number;
  longitude: number;
  isKakaoMapScriptLoaded: boolean;
}

const KakaoMap = ({
  placeName,
  latitude,
  longitude,
  isKakaoMapScriptLoaded,
}: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  const initializeMap = () => {
    try {
      if (window.kakao && mapRef.current) {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 4,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        map.setDraggable(false);
        map.setZoomable(false);

        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mapRef.current || isInitialized.current || !isKakaoMapScriptLoaded) {
      return;
    }
    isInitialized.current = true;
    window.kakao.maps.load(initializeMap);
  }, [mapRef, isKakaoMapScriptLoaded]);

  // NOTE: 핸디팟인 경우 임시 처리
  const placeNameWithException = placeName.startsWith(TAXI_HUB_PREFIX ?? '')
    ? `핸디팟 ${placeName.split(TAXI_HUB_PREFIX ?? '')[1]} 지역`
    : placeName;

  return (
    <div
      ref={mapRef}
      className="relative h-full w-full cursor-pointer"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.open(
            `https://map.kakao.com/link/map/${placeNameWithException},${latitude},${longitude}`,
            '_blank',
            'noopener,noreferrer',
          );
        }
      }}
    ></div>
  );
};

export default KakaoMap;
