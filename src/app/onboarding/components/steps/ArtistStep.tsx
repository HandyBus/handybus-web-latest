'use client';

import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import XIcon from 'public/icons/x.svg';
import { useEffect, useState } from 'react';
import MicrophoneIcon from 'public/icons/microphone.svg';
import SearchBar from '@/components/buttons/search-bar/SearchBar';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '../../page';

const MOCK_ALL_ARTISTS = [
  '아이유',
  '뉴진스',
  '트와이스',
  '방탄소년단',
  'NCT',
  '레드벨벳',
  '엔믹스',
  '아이브',
  '임영웅',
  '보넥도',
  '투어스',
  '엔하이픈',
  '에이티즈',
  '있지',
  '에스파',
  '스테이씨',
];

interface Props {
  handlePrevStep: () => void;
}

const ArtistStep = ({ handlePrevStep }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const { getValues, setValue } = useFormContext<OnboardingFormValues>();

  useEffect(() => {
    const savedArtists = getValues('artists');
    setSelectedArtists(savedArtists);
  }, []);

  useEffect(() => {
    if (selectedArtists.length !== 0) {
      setValue('artists', selectedArtists);
    }
  }, [selectedArtists]);

  return (
    <>
      <div className="relative h-full w-full grow">
        <h2 className="p-28 text-26 font-700 text-grey-900">
          최애 가수를 찾아주세요
        </h2>
        <div className="px-28 pb-28">
          <SearchBar type="button" onClick={() => setIsListOpen(true)}>
            가수 이름으로 검색
          </SearchBar>
        </div>
        <div className="px-28 py-12 text-16 font-600 text-grey-600-sub">
          나의 최애 가수
        </div>
        {selectedArtists.length !== 0 ? (
          <div className="max-h-400 overflow-y-auto">
            {selectedArtists.map((artist) => (
              <div
                key={artist}
                className="flex items-center justify-between gap-16 px-32 py-12"
              >
                <span className="line-clamp-1 text-16 font-400 text-grey-800">
                  {artist}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedArtists((prev) =>
                      prev.filter((e) => e !== artist),
                    )
                  }
                >
                  <XIcon />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-[30px] flex w-full flex-col items-center justify-center gap-4">
            <MicrophoneIcon />
            <span className="text-16 font-400 text-grey-300">
              최애 가수가 없어요
            </span>
          </div>
        )}
        <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
          <div className="py-16">
            <Indicator max={4} value={4} />
          </div>
          <div className="w-full px-32 pb-4 pt-8">
            <Button type="submit">핸디버스 만나러 가기</Button>
          </div>
          <button
            type="button"
            onClick={handlePrevStep}
            className="text-center text-12 text-grey-400 underline underline-offset-2"
          >
            이전으로
          </button>
        </div>
      </div>
      {isListOpen && (
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col bg-white">
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
            handleBack={() => setIsListOpen(false)}
            placeholder="가수 이름으로 검색"
          />
          <div className="grow overflow-y-auto pt-12">
            {MOCK_ALL_ARTISTS.map((artist) => (
              <button
                key={artist}
                type="button"
                onClick={() =>
                  setSelectedArtists((prev) =>
                    prev.includes(artist)
                      ? prev.filter((e) => e !== artist)
                      : [...prev, artist],
                  )
                }
                className="line-clamp-1 flex h-56 w-full items-center gap-16 px-32"
              >
                <CheckBox isChecked={selectedArtists.includes(artist)} />
                <span className="text-16 font-400 text-grey-800">{artist}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistStep;
