'use client';

import XIcon from 'public/icons/x.svg';
import { useEffect, useState } from 'react';
import MicrophoneIcon from 'public/icons/microphone.svg';
import SearchBar from '@/components/buttons/search-bar/SearchBar';
import SearchInput from '@/components/inputs/search-input/SearchInput';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import { useFormContext } from 'react-hook-form';
import { ArtistType } from '@/types/client.types';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { useGetArtists } from '@/services/shuttleOperation';
import useDebounce from '@/hooks/useDebounce';
import OnboardingTitle from './OnboardingTitle';

const ArtistContent = () => {
  const { data: artists } = useGetArtists();
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredArtists, setFilteredArtists] = useState<ArtistType[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<ArtistType[]>([]);

  const filterArtist = useDebounce(() => {
    const newFilteredArtists = artists?.filter((artist) =>
      artist.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredArtists(newFilteredArtists);
  }, 200);

  useEffect(() => {
    filterArtist();
  }, [searchValue, artists]);

  const handleSelectArtist = (artist: ArtistType) =>
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.filter((el) => el !== artist)
        : [...prev, artist],
    );

  const { getValues, setValue } = useFormContext<OnboardingFormValues>();

  useEffect(() => {
    const savedArtists = getValues('favoriteArtists');
    setSelectedArtists(savedArtists);
  }, []);

  useEffect(() => {
    if (selectedArtists.length !== 0) {
      setValue('favoriteArtists', selectedArtists);
    }
  }, [selectedArtists]);

  return (
    <>
      <div className="relative grow">
        <OnboardingTitle title="최애 가수를 찾아주세요" />
        <div className="px-28 pb-16">
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
                key={artist.id}
                className="flex items-center justify-between gap-16 px-32 py-12"
              >
                <span className="line-clamp-1 text-16 font-400 text-grey-800">
                  {artist.name}
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
      </div>
      {isListOpen && (
        <div className="absolute -top-44 bottom-0 left-0 right-0 z-[51] flex flex-col bg-white">
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
            handleBack={() => setIsListOpen(false)}
            placeholder="가수 이름으로 검색"
          />
          <div className="grow overflow-y-auto pt-12">
            {filteredArtists.map((artist) => (
              <button
                key={artist.id}
                type="button"
                onClick={() => handleSelectArtist(artist)}
                className="line-clamp-1 flex h-56 w-full items-center gap-16 px-32"
              >
                <CheckBox
                  isChecked={selectedArtists.includes(artist)}
                  setIsChecked={() => handleSelectArtist(artist)}
                />
                <span className="text-16 font-400 text-grey-800">
                  {artist.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistContent;
