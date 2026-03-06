'use client';

import { useMemo, useState } from 'react';
// import { useGetArtists } from '@/services/artist.service';
import ArtistSearchBar from './components/ArtistSearchBar';
import ArtistGrid from './components/ArtistGrid';
import EmptyResult from './components/EmptyResult';
import DeferredSuspense from '@/components/loading/DeferredSuspense';

const MOCK_ARTISTS = [
  {
    artistId: '1',
    artistName: 'aespa',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '2',
    artistName: 'NewJeans',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '3',
    artistName: 'IVE',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '4',
    artistName: 'SEVENTEEN',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '5',
    artistName: '(여자)아이들',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '6',
    artistName: '투모로우바이투게더',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: 'full',
    artistName: 'BLACKPINK',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '7',
    artistName: 'BTS',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '8',
    artistName: 'TWICE',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '9',
    artistName: 'Stray Kids',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '10',
    artistName: 'EXO',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '11',
    artistName: 'NCT 127',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
];

const Page = () => {
  const [query, setQuery] = useState('');
  // const { data: artists, isLoading } = useGetArtists();
  const isLoading = false;
  const artists = MOCK_ARTISTS;

  const filteredArtists = useMemo(() => {
    if (!artists) return [];
    if (!query.trim()) return artists;
    const lowerQuery = query.trim().toLowerCase();
    return artists.filter((artist) =>
      artist.artistName.toLowerCase().includes(lowerQuery),
    );
  }, [artists, query]);

  const isEmptyResult =
    !isLoading && query.trim() !== '' && filteredArtists.length === 0;

  return (
    <main className="flex flex-1 flex-col px-16 pb-48">
      <ArtistSearchBar query={query} onChangeQuery={setQuery} />
      <DeferredSuspense isLoading={isLoading} fallback={<ArtistGridSkeleton />}>
        {isEmptyResult ? (
          <EmptyResult />
        ) : (
          <ArtistGrid artists={filteredArtists} />
        )}
      </DeferredSuspense>
    </main>
  );
};

export default Page;

const ArtistGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-x-8 gap-y-16 pt-16">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-8">
          <div className="aspect-square w-full animate-pulse rounded-8 bg-basic-grey-100" />
          <div className="h-[20px] w-[60px] animate-pulse rounded-4 bg-basic-grey-100" />
        </div>
      ))}
    </div>
  );
};
