'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Button from '@/components/buttons/button/Button';
import { useGetArtist } from '@/services/artist.service';
import ArtistHero from './components/ArtistHero';
import MemberSection from './components/MemberSection';
import GroupSection from './components/GroupSection';
import ArtistInfoSection from './components/ArtistInfoSection';
import ArtistNotificationModal from './components/ArtistNotificationModal';

const Page = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { isApp } = useEnvironment();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isPushEnabled] = useState(false);

  const { data: artist, isLoading } = useGetArtist(artistId);

  const hasMembers = !!artist?.childArtists?.length;
  const hasParentGroup = !!artist?.parentArtists?.length;

  return (
    <>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {artist && (
          <main className="grow pb-[80px]">
            <ArtistHero
              artistDisplayName={artist.artistDisplayName}
              artistSubDisplayName={artist.artistSubDisplayName}
              imageUrl={artist.artistMainImageUrl}
            />
            {hasMembers && (
              <>
                <MemberSection members={artist.childArtists ?? []} />
                <Divider />
              </>
            )}
            {hasParentGroup && (
              <>
                <GroupSection groups={artist.parentArtists ?? []} />
                <Divider />
              </>
            )}
            <ArtistInfoSection description={artist.artistDescription} />
          </main>
        )}
      </DeferredSuspense>
      <div className="fixed-centered-layout fixed bottom-0 z-40 border-t border-basic-grey-100 bg-basic-white px-16 py-12">
        {isApp ? (
          <Button
            type="button"
            onClick={() => setIsNotificationModalOpen(true)}
          >
            아티스트 알림 받기
          </Button>
        ) : (
          <Button type="button" variant="tertiary" disabled>
            앱 전용 기능이에요
          </Button>
        )}
      </div>
      {isNotificationModalOpen && (
        <ArtistNotificationModal
          isOpen={isNotificationModalOpen}
          isPushEnabled={isPushEnabled}
          onClose={() => setIsNotificationModalOpen(false)}
          onEnableNotification={() => {
            setIsNotificationModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Page;

const Divider = () => <div className="h-[8px] bg-basic-grey-50" />;
