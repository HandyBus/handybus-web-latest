'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '../Header';
import SearchIcon from '../../icons/search.svg';
import {
  AddressSearchResult,
  HandyPartyModalFormValues,
} from '../../HandyPartyModal';
import { useFormContext } from 'react-hook-form';
import { checkIsPossibleHandyPartyArea } from '@/utils/handyParty.util';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import { useIsApp } from '@/hooks/useEnvironment';

interface SearchResult extends AddressSearchResult {
  placeName: string;
}

interface Props {
  onBack: () => void;
  onNext: () => void;
  possibleHandyPartyAreas: HandyPartyRouteArea[];
  closeModal: () => void;
}

const AddressStep = ({
  onBack,
  onNext,
  possibleHandyPartyAreas,
  closeModal,
}: Props) => {
  const { setValue, getValues } = useFormContext<HandyPartyModalFormValues>();
  const selectedArea = getValues('selectedArea');
  const { setReservationTrackingStep } = useReservationTrackingGlobal();
  const [searchValue, setSearchValue] = useState('');
  const isApp = useIsApp();

  const kakaoPlace = useRef<kakao.maps.services.Places | null>(null);
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);

  // 카카오 키워드 검색 초기화
  const initialKakaoPlace = () => {
    if (!window.kakao || kakaoPlace.current) {
      return;
    }
    kakaoPlace.current = new window.kakao.maps.services.Places();
  };
  useEffect(() => {
    window.kakao.maps.load(initialKakaoPlace);
  }, []);

  // 주소 검색 함수
  const handleSearch = (value: string) => {
    if (!kakaoPlace.current || value.length < 2) {
      return;
    }

    kakaoPlace.current.keywordSearch(value, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const filteredResult = result.filter((item) =>
          checkIsPossibleHandyPartyArea(
            item.address_name,
            possibleHandyPartyAreas,
            selectedArea,
          ),
        );

        setSearchResult(() =>
          filteredResult.map((item) => ({
            placeName: item.place_name,
            address: item.address_name,
            x: Number(item.x),
            y: Number(item.y),
          })),
        );
      } else {
        console.error(status);
        setSearchResult([]);
      }
    });
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

  const handleSelectAddress = (searchResult: SearchResult) => {
    setValue('addressSearchResult', {
      address: searchResult.address,
      x: searchResult.x,
      y: searchResult.y,
    });
    onNext();
  };

  const tripType = getValues('tripType');
  const tripTypePrefix = '[' + TRIP_STATUS_TO_STRING[tripType] + ']';

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 주소 입력');
  }, [setReservationTrackingStep]);

  const displayedSelectedArea =
    selectedArea === '서울특별시'
      ? '서울특별시'
      : HANDY_PARTY_AREA_TO_ADDRESS[selectedArea].gungu.join(', ');

  const handleClose = () => {
    if (selectedArea === '서울특별시') onBack();
    closeModal();
  };

  return (
    <div className="flex h-full grow flex-col">
      <Header title={`주소 입력`} variant="address" closeModal={handleClose} />
      <div className={`px-16 pb-16 ${isApp ? 'pt-[28px]' : 'pt-16'}`}>
        <h2 className="text-16 font-600 leading-[160%]">
          {tripTypePrefix} 주소를 입력해주세요
        </h2>
        <p className="text-16 font-500 leading-[160%] text-basic-grey-600">
          원하는 승하차 장소를 정확하게 입력해 주세요.
        </p>
      </div>
      <DebouncedInput value={searchValue} setValue={setSearchValue} />
      <div className="h-8" />
      <ul className="w-full flex-1 overflow-y-auto px-16 pb-12">
        {searchResult &&
          (searchResult.length > 0 ? (
            searchResult.map((item) => (
              <button
                key={item.placeName + item.address}
                onClick={() => handleSelectAddress(item)}
                type="button"
                className="w-full border-b border-basic-grey-200 py-12 text-left"
              >
                <div className="text-14 font-500 leading-[160%] text-basic-grey-700">
                  {item.placeName}
                </div>
                <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
                  {item.address}
                </p>
              </button>
            ))
          ) : (
            <p className="mb-16 pt-12 text-14 font-500 leading-[160%] text-basic-red-400">
              해당 주소지를 찾을 수 없어요. {displayedSelectedArea} 내 주소지를
              입력해 주세요.
            </p>
          ))}
      </ul>
    </div>
  );
};

export default AddressStep;

interface DebouncedInputProps {
  value: string;
  setValue: (value: string) => void;
  delay?: number;
}

const DebouncedInput = ({
  value: debouncedValue,
  setValue: setDebouncedValue,
  delay = 200,
}: DebouncedInputProps) => {
  const [value, setValue] = useState(debouncedValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative mx-12">
      <input
        value={value}
        onChange={setValue && ((e) => setValue(e.target.value))}
        className="h-52 w-full rounded-12 border border-basic-grey-200 p-12 pl-44 text-16 font-500 leading-[160%] outline-none placeholder:text-basic-grey-400"
        placeholder="도로명, 지번, 건물명으로 검색"
      />
      <div className="absolute left-12 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </div>
    </div>
  );
};
