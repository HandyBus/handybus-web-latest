'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Button from '@/components/buttons/button/Button';
import useWebViewMessage from '@/hooks/webview/useWebViewMessage';
import { useGetArtist } from '@/services/artist.service';
import { useGetEventsByArtistId } from '@/services/event.service';
import { useGetUser, usePutUser } from '@/services/user.service';
import ArtistHero from './components/ArtistHero';
import ConcertSection from './components/ConcertSection';
import MemberSection from './components/MemberSection';
import GroupSection from './components/GroupSection';
import ArtistInfoSection from './components/ArtistInfoSection';
import ArtistNotificationModal from './components/ArtistNotificationModal';

const Page = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { isApp } = useEnvironment();
  const { sendMessage, sendRequest } = useWebViewMessage();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isCheckingNotificationPermission, setIsCheckingNotificationPermission] =
    useState(false);

  const { data: artist, isLoading } = useGetArtist(artistId);
  const { data: eventList = [] } = useGetEventsByArtistId(artistId);
  const { data: user } = useGetUser({ enabled: isApp });

  const isFavorite =
    user?.favoriteArtists?.some((artist) => artist.artistId === artistId) ??
    false;

  const { mutate: updateUser, isPending } = usePutUser({
    onSuccess: () => {
      setIsNotificationModalOpen(false);
    },
  });

  const addFavoriteArtist = () => {
    if (!user || isPending) return;

    const currentIds =
      user.favoriteArtists?.map((artist) => artist.artistId) ?? [];
    const nextIds = Array.from(new Set([...currentIds, artistId]));
    updateUser({ favoriteArtistsIds: nextIds });
  };

  const removeFavoriteArtist = () => {
    if (!user || isPending) return;

    const currentIds =
      user.favoriteArtists?.map((artist) => artist.artistId) ?? [];
    updateUser({
      favoriteArtistsIds: currentIds.filter((id) => id !== artistId),
    });
  };

  const handleEnableNotification = async () => {
    if (!isApp || !user || isPending || isCheckingNotificationPermission) {
      return;
    }

    setIsCheckingNotificationPermission(true);
    try {
      const permissionResult = await sendRequest(
        'REQUEST_PERMISSION',
        { permission: 'notification' },
        'PERMISSION_RESULT',
        5000,
      );

      if (permissionResult.permission !== 'notification') return;

      if (!permissionResult.granted) {
        const didNavigate = sendMessage('NAVIGATE', {
          screen: 'app_notification_settings',
        });

        if (didNavigate) {
          setIsNotificationModalOpen(false);
        }
        return;
      }

      addFavoriteArtist();
    } catch (error) {
      console.error('[ArtistNotification] Failed to check permission', error);
    } finally {
      setIsCheckingNotificationPermission(false);
    }
  };

  const hasMembers = !!artist?.childArtists?.length;
  const hasParentGroup = !!artist?.parentArtists?.length;
  const hasDescription = !!artist?.artistDescription;

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
            {hasDescription && (
              <>
                <ArtistInfoSection description={artist.artistDescription} />
                <Divider />
              </>
            )}
            {eventList.length > 0 && <ConcertSection eventList={eventList} />}
          </main>
        )}
      </DeferredSuspense>
      <div className="fixed-centered-layout fixed bottom-0 z-40 border-t border-basic-grey-100 bg-basic-white px-16 py-12">
        {isApp ? (
          isFavorite ? (
            <Button
              type="button"
              variant="tertiary"
              onClick={removeFavoriteArtist}
              disabled={isPending}
            >
              알림 그만 받기
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setIsNotificationModalOpen(true)}
              disabled={isPending}
            >
              아티스트 알림 받기
            </Button>
          )
        ) : (
          <Button type="button" variant="tertiary" disabled>
            앱 전용 기능이에요
          </Button>
        )}
      </div>
      {isNotificationModalOpen && (
        <ArtistNotificationModal
          isOpen={isNotificationModalOpen}
          isLoading={isCheckingNotificationPermission || isPending}
          onClose={() => setIsNotificationModalOpen(false)}
          onEnableNotification={handleEnableNotification}
        />
      )}
    </>
  );
};

export default Page;

const Divider = () => <div className="h-[8px] bg-basic-grey-50" />;
