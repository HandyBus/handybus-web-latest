'use client';

import { useEffect, useRef, useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

interface Props {
  placeName: string;
  latitude: number;
  longitude: number;
  roadviewPan: number | null;
}

const Roadview = ({ placeName, latitude, longitude, roadviewPan }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const initializeRoadview = () => {
    try {
      if (!mapRef.current || !window.kakao) return;

      const roadview = new window.kakao.maps.Roadview(mapRef.current);
      const roadviewClient = new window.kakao.maps.RoadviewClient();
      const position = new window.kakao.maps.LatLng(latitude, longitude);

      roadviewClient.getNearestPanoId(position, 50, (panoId) => {
        if (!panoId) {
          setIsAvailable(false);
          return;
        }
        roadview.setPanoId(panoId, position);

        // 로드뷰 초기화 완료 이벤트 대기
        window.kakao.maps.event.addListener(roadview, 'init', () => {
          roadview.setViewpoint({
            pan: roadviewPan ?? 0,
            tilt: 0,
            zoom: 1,
          });
        });
        setIsAvailable(true);
      });
    } catch (error) {
      setIsAvailable(false);
      Sentry.captureException(error, {
        tags: {
          component: 'ShuttleReservationRoadview',
          page: 'mypage-shuttle-reservation-detail',
          feature: 'kakao-roadview',
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
    if (!mapRef.current || isInitialized.current) return;
    isInitialized.current = true;
    window.kakao?.maps?.load(initializeRoadview);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapRef}
        aria-label={placeName + ' 로드뷰'}
        className="h-full w-full"
      />
      {!isAvailable && (
        <div className="absolute inset-0 flex items-center justify-center bg-basic-grey-50 text-12 font-500 text-basic-grey-600">
          로드뷰를 지원하지 않는 위치입니다.
        </div>
      )}
    </div>
  );
};

export default Roadview;

// kakaomap docs 로드뷰생성하기 : https://apis.map.kakao.com/web/sample/basicRoadview/
