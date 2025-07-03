'use client';

import Button from '@/components/buttons/button/Button';
import { useEffect, useRef, useState } from 'react';
import { KakaoMapsAPI } from '@/components/kakao-map/KakaoMap.type';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import Header from '../Header';

declare global {
  interface Window {
    kakao: {
      maps: KakaoMapsAPI;
    };
  }
}

interface Props {
  onBack: () => void;
}

const MapStep = ({ onBack }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [isKakaoMapScriptLoaded, setIsKakaoMapScriptLoaded] = useState(false);

  const initializeMap = () => {
    try {
      if (!window.kakao || !mapRef.current) {
        return;
      }
      const options = {
        center: new window.kakao.maps.LatLng(37.498085, 127.02761),
        level: 2,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
      map.setZoomable(false);

      const markerPosition = new window.kakao.maps.LatLng(37.498085, 127.02761);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    } catch (error) {
      console.error('지도를 불러오는 중 오류가 발생했습니다. \n' + error);
    }
  };

  useEffect(() => {
    if (isKakaoMapScriptLoaded) {
      window.kakao.maps.load(initializeMap);
    }
  }, [isKakaoMapScriptLoaded]);

  return (
    <>
      <KakaoMapScript onReady={() => setIsKakaoMapScriptLoaded(true)} />
      <div className="flex grow flex-col">
        <Header
          onBack={onBack}
          title="정확한 위치를 설정해주세요"
          description="예약 후에는 장소 변경이 어려우니 꼭 확인해 주세요."
        />
        <section className="relative m-12 mt-0 grow overflow-hidden rounded-6 border border-basic-grey-200 bg-brand-primary-50">
          <div ref={mapRef} className="h-full w-full" />
        </section>
        <section>
          <div className="mx-16 border-b border-basic-grey-200 p-12">
            <h5 className="text-16 font-500 leading-[160%]">
              바르다김선생 남부터미널점
            </h5>
            <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
              서울 서초구 서초동 1599-2
            </p>
          </div>
          <div className="p-16">
            <Button size="large" variant="primary">
              주소 입력하기
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default MapStep;
