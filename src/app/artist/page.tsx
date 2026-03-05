'use client';

import { useState } from 'react';
import { useGetArtists } from '@/services/artist.service';
import useDebouncedValue from '@/hooks/useDebouncedValue';
import ArtistSearchBar from './components/ArtistSearchBar';
import ArtistGrid from './components/ArtistGrid';
import EmptyResult from './components/EmptyResult';
import DeferredSuspense from '@/components/loading/DeferredSuspense';

const Page = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query);
  const { data, isLoading } = useGetArtists({
    searchKeyword: debouncedQuery || undefined,
  });

  const artists = data?.pages.flatMap((page) => page.artists) ?? [];

  const isEmptyResult =
    !isLoading && query.trim() !== '' && artists.length === 0;

  return (
    <main className="flex flex-1 flex-col px-16 pb-48">
      <ArtistSearchBar query={query} onChangeQuery={setQuery} />
      <DeferredSuspense isLoading={isLoading} fallback={<ArtistGridSkeleton />}>
        {isEmptyResult ? <EmptyResult /> : <ArtistGrid artists={artists} />}
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
