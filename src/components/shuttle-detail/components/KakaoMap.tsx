'use client';

import { RefObject, useRef } from 'react';
import Script from 'next/script';
import LogoIcon from 'public/icons/logo-small.svg';
import KakaoMapIcon from 'public/icons/kakaomap-logo.svg';
import ChevronRightIcon from 'public/icons/chevron-right.svg';
import { KakaoMapsAPI } from './KakaoMap.types';

declare global {
  interface Window {
    kakao: {
      maps: KakaoMapsAPI;
    };
  }
}

interface KakaoMapProps {
  placeName: string;
  latitude: number;
  longitude: number;
}
const KakaoMap = ({ placeName, latitude, longitude }: KakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const address = '서울특별시 송파구 올림픽로 240';

  const initializeMap = () => {
    if (window.kakao && mapRef.current) {
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
      map.setDraggable(false);
      map.setZoomable(false);

      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  };

  return (
    <KakaoMapContent
      placeName={placeName}
      latitude={latitude}
      longitude={longitude}
      initializeMap={initializeMap}
      mapRef={mapRef}
      address={address}
    />
  );
};

export default KakaoMap;

interface KakaoMapContentProps extends KakaoMapProps {
  initializeMap: () => void;
  mapRef: RefObject<HTMLDivElement>;
  address: string;
}
const KakaoMapContent = ({
  placeName,
  latitude,
  longitude,
  address,
  initializeMap,
  mapRef,
}: KakaoMapContentProps) => {
  return (
    <article
      className="relative h-auto p-16 [&_div]:cursor-pointer"
      onClick={() => {
        window.open(
          `https://map.kakao.com/link/map/${placeName},${latitude},${longitude}`,
        );
      }}
    >
      <Script
        id="kakao-maps-sdk"
        strategy="afterInteractive"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initializeMap)}
      />
      <div className="absolute right-16 top-[-8px] flex items-center justify-end ">
        <KakaoMapIcon viewBox="0 0 12 13" width="12px" height="12px" />
        <p className="text-gray-500 text-12 font-400 leading-[19.2px]">
          카카오맵에서보기
        </p>
        <ChevronRightIcon viewBox="0 0 24 24" width="12px" height="12px" />
      </div>
      <div className="rounded-[12px] shadow-[0_4px_4px_0_rgba(0,0,0,0.075)]">
        <div ref={mapRef} className="z-0 h-[140px] w-full rounded-t-[12px]" />
        <div className="flex h-[65px] w-full items-center gap-[6px] rounded-b-[12px] p-12">
          <span className="flex h-[40px] w-[40px] items-center justify-center">
            <LogoIcon
              fill="#808080"
              viewBox="0 0 28 14"
              width="28px"
              height="14px"
            />
          </span>
          <span>
            <p className="text-14 font-600 leading-[22.4px]">{placeName}</p>
            <p className="text-12 font-400 leading-[19.2px]">{address}</p>
          </span>
        </div>
      </div>
    </article>
  );
};