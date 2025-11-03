'use client';

import Button from '@/components/buttons/button/Button';
import { useEffect, useRef, useState, useCallback } from 'react';
import Header from '../Header';
import { HandyPartyModalFormValues } from '../../HandyPartyModal';
import { useFormContext } from 'react-hook-form';
import { checkIsPossibleHandyPartyArea } from '@/utils/handyParty.util';
import { toast } from 'react-toastify';
import { HandyPartyRouteArea } from '@/constants/handyPartyArea.const';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

const DEFAULT_MAP_CENTER = {
  x: 127.02761,
  y: 37.498085,
  address: '서울 강남구 역삼동 858',
};

interface Props {
  onBack: () => void;
  onNext: () => void;
  possibleHandyPartyAreas: HandyPartyRouteArea[];
  closeModal: () => void;
}

const MapStep = ({
  onBack,
  onNext,
  possibleHandyPartyAreas,
  closeModal,
}: Props) => {
  const { setValue, getValues } = useFormContext<HandyPartyModalFormValues>();
  const { setReservationTrackingStep } = useReservationTrackingGlobal();

  const mapRef = useRef<HTMLDivElement>(null);
  const kakaoMarker = useRef<kakao.maps.Marker | null>(null);
  const kakaoGeocoder = useRef<kakao.maps.services.Geocoder | null>(null);
  const selectedArea = getValues('selectedArea');
  // 주소 검색 오류 or 운행하지 않는 지역
  const [addressSearchError, setAddressSearchError] = useState<boolean>(false);

  const [displayedAddress, setDisplayedAddress] = useState<string | null>(null);

  const searchAddressAndSetResult = useCallback(
    (lat: number, lng: number) => {
      if (!kakaoMarker.current || !kakaoGeocoder.current) {
        return;
      }
      const coord = new window.kakao.maps.LatLng(lat, lng);
      kakaoMarker.current.setPosition(coord);

      kakaoGeocoder.current.coord2Address(
        coord.getLng(),
        coord.getLat(),
        (result, status) => {
          if (
            status === window.kakao.maps.services.Status.OK &&
            result.length > 0
          ) {
            setAddressSearchError(false);
            const address = result[0].address;

            setValue('addressSearchResult', {
              address: address.address_name,
              x: coord.getLng(),
              y: coord.getLat(),
            });
            setDisplayedAddress(address.address_name);

            const isPossibleHandyPartyArea = checkIsPossibleHandyPartyArea(
              address.address_name,
              possibleHandyPartyAreas,
              selectedArea,
            );
            if (!isPossibleHandyPartyArea) {
              setAddressSearchError(true);
            }
          } else {
            console.error('좌표 검색 오류: ', status, result);
            setAddressSearchError(true);
          }
        },
      );
    },
    [kakaoMarker, kakaoGeocoder, setValue, possibleHandyPartyAreas],
  );

  // 카카오 지도 초기화
  const isInitialized = useRef<boolean>(false);
  const initializeMap = useCallback(() => {
    try {
      if (!window.kakao || !mapRef.current) {
        return;
      }

      const { addressSearchResult } = getValues();
      setDisplayedAddress(
        addressSearchResult?.address ?? DEFAULT_MAP_CENTER.address,
      );
      setValue('addressSearchResult', {
        address: addressSearchResult?.address ?? DEFAULT_MAP_CENTER.address,
        x: addressSearchResult?.x ?? DEFAULT_MAP_CENTER.x,
        y: addressSearchResult?.y ?? DEFAULT_MAP_CENTER.y,
      });

      const center = new window.kakao.maps.LatLng(
        addressSearchResult?.y ?? DEFAULT_MAP_CENTER.y,
        addressSearchResult?.x ?? DEFAULT_MAP_CENTER.x,
      );
      const options = {
        center,
        level: 2,
        draggable: true,
        scrollwheel: true,
        disableDoubleClick: true,
        disableDoubleTap: true,
        disableTwoFingerTap: false,
        keyboardShortcuts: false,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      const marker = new window.kakao.maps.Marker({
        position: center,
      });
      marker.setMap(map);
      kakaoMarker.current = marker;

      window.kakao.maps.event.addListener(
        map,
        'click',
        (mouseEvent: kakao.maps.event.MouseEvent) => {
          searchAddressAndSetResult(
            mouseEvent.latLng.getLat(),
            mouseEvent.latLng.getLng(),
          );
        },
      );

      kakaoGeocoder.current = new kakao.maps.services.Geocoder();
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: 'HandyPartyMapStep',
          page: 'event-detail',
          feature: 'handy-party',
          action: 'initialize-kakao-map',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(error);
    }
  }, [getValues, searchAddressAndSetResult]);
  useEffect(() => {
    if (isInitialized.current) {
      return;
    }
    isInitialized.current = true;
    window.kakao.maps.load(initializeMap);
  }, [initializeMap]);

  const handleNext = () => {
    if (addressSearchError) {
      toast.error('운행이 가능한 지역을 입력해주세요.');
      return;
    }
    onNext();
  };

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 지도');
  }, [setReservationTrackingStep]);

  return (
    <div className="flex grow flex-col">
      <Header
        onBack={onBack}
        title="주소 입력"
        variant="address"
        closeModal={closeModal}
      />
      <section className="px-16 pb-16 pt-12">
        <h2 className="text-18 font-600 leading-[140%]">
          정확한 위치를 설정해 주세요
        </h2>
        <p className="text-16 font-500 leading-[160%] text-basic-grey-600">
          {addressSearchError ? (
            <span className="text-basic-red-500">
              이 곳은 핸디팟 운행이 어려운 지역이에요.
            </span>
          ) : (
            '원하는 위치로 지도를 움직여 핀을 놓아주세요. 예약 후에는 장소 변경이 어려우니 꼭 확인해 주세요.'
          )}
        </p>
      </section>
      <section className="relative mx-16 my-0 grow overflow-hidden rounded-6 border border-basic-grey-200">
        <div ref={mapRef} className="h-full w-full" />
      </section>
      <section
        className={`mx-16 line-clamp-2 flex h-[82px] w-full items-end border-b border-basic-grey-200 p-12 text-18 font-600 ${
          addressSearchError ? 'text-basic-grey-600' : ''
        }`}
      >
        {addressSearchError ? '주소를 못 찾았어요.' : displayedAddress}
      </section>
      <section className="mt-[6px] p-16">
        <Button
          size="large"
          variant="primary"
          type="button"
          onClick={handleNext}
        >
          주소 입력하기
        </Button>
      </section>
    </div>
  );
};

export default MapStep;
