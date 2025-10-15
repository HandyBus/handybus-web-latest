'use client';

import { useEffect, useRef } from 'react';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

interface Props {
  placeName: string;
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ placeName, latitude, longitude }: Props) => {
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
      Sentry.captureException(error, {
        tags: {
          component: 'ShuttleRouteDetailKakaoMap',
          page: 'event-detail',
          feature: 'map',
          action: 'initialize-kakao-map',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          placeName,
          latitude,
          longitude,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (!mapRef.current || isInitialized.current) {
      return;
    }
    isInitialized.current = true;
    window.kakao?.maps?.load(initializeMap);
  }, [mapRef]);

  return (
    <div
      ref={mapRef}
      className="relative h-full w-full cursor-pointer"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.open(
            `https://map.kakao.com/link/map/${placeName},${latitude},${longitude}`,
            '_blank',
            'noopener,noreferrer',
          );
        }
      }}
    ></div>
  );
};

export default KakaoMap;
