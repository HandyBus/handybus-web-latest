'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import useEnvironment from '@/hooks/useEnvironment';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Button from '@/components/buttons/button/Button';
import ArtistHero from './components/ArtistHero';
import MemberSection from './components/MemberSection';
import GroupSection from './components/GroupSection';
import ArtistInfoSection from './components/ArtistInfoSection';
import ConcertSection, { ConcertItem } from './components/ConcertSection';
import ArtistNotificationModal from './components/ArtistNotificationModal';

interface MockArtist {
  artistId: string;
  artistName: string;
  artistEnglishName?: string;
  imageUrl?: string | null;
  artistDescription: { description: string } | null;
  parentArtists: { artistId: string; artistName: string }[] | null;
  childArtists: { artistId: string; artistName: string }[] | null;
}

const MOCK_ARTISTS: MockArtist[] = [
  {
    artistId: '1',
    artistName: 'aespa',
    artistEnglishName: 'AESPA',
    artistDescription: {
      description:
        'aespa는 SM엔터테인먼트 소속 4인조 걸그룹으로, 2020년 11월 데뷔했습니다. 카리나, 지젤, 윈터, 닝닝으로 구성되어 있으며, 현실과 가상 세계를 넘나드는 독특한 세계관이 특징입니다.',
    },
    parentArtists: null,
    childArtists: [
      { artistId: '1-1', artistName: '카리나' },
      { artistId: '1-2', artistName: '지젤' },
      { artistId: '1-3', artistName: '윈터' },
      { artistId: '1-4', artistName: '닝닝' },
    ],
  },
  {
    artistId: '2',
    artistName: 'NewJeans',
    artistDescription: {
      description:
        'NewJeans는 어도어 소속 5인조 걸그룹으로, 2022년 8월 데뷔했습니다. 하니, 민지, 다니엘, 해린, 혜인으로 구성되어 있습니다.',
    },
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
    artistEnglishName: '(G)I-DLE',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  {
    artistId: '6',
    artistName: '투모로우바이투게더',
    artistEnglishName: 'TOMORROW X TOGETHER',
    artistDescription: null,
    parentArtists: null,
    childArtists: null,
  },
  // 모든 항목이 채워진 케이스
  {
    artistId: 'full',
    artistName: 'BLACKPINK',
    artistEnglishName: 'BLACKPINK',
    artistDescription: {
      description:
        'BLACKPINK는 YG엔터테인먼트 소속 4인조 걸그룹으로, 2016년 8월 데뷔했습니다. 지수, 제니, 로제, 리사로 구성되어 있으며, 전 세계적으로 가장 인기 있는 K-POP 그룹 중 하나입니다.',
    },
    parentArtists: [{ artistId: 'full-parent', artistName: 'YG Family' }],
    childArtists: [
      { artistId: 'full-1', artistName: '지수' },
      { artistId: 'full-2', artistName: '제니' },
      { artistId: 'full-3', artistName: '로제' },
      { artistId: 'full-4', artistName: '리사' },
    ],
  },
  // 멤버 솔로 케이스
  {
    artistId: '1-1',
    artistName: '카리나',
    artistDescription: null,
    parentArtists: [{ artistId: '1', artistName: 'aespa' }],
    childArtists: null,
  },
];

const MOCK_CONCERTS: ConcertItem[] = [
  {
    eventId: 'c1',
    eventName: '2026 TXT MOA CON',
    eventImageUrl: null,
    concertStatus: 'UPCOMING',
    startDate: '2026.02.01',
    endDate: '02.03',
  },
  {
    eventId: 'c2',
    eventName: 'TOMORROW X TOGETHER WORLD TOUR',
    eventImageUrl: null,
    concertStatus: 'NORMAL',
    startDate: '2026.03.15',
    endDate: '03.16',
  },
  {
    eventId: 'c3',
    eventName: 'TXT ACT: TOMORROW',
    eventImageUrl: null,
    concertStatus: 'NORMAL',
    startDate: '2025.12.01',
    endDate: '12.03',
  },
];

const Page = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const { isApp } = useEnvironment();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  // TODO: 실제 구현 시 앱에 메시지를 보내서 푸시알림 설정 여부를 받아옴
  const [isPushEnabled] = useState(false);

  const artist = MOCK_ARTISTS.find((a) => a.artistId === artistId) ?? null;

  const hasMembers = !!artist?.childArtists?.length;
  const hasParentGroup = !!artist?.parentArtists?.length;

  return (
    <>
      <DeferredSuspense fallback={<Loading />} isLoading={false}>
        {artist && (
          <main className="grow pb-[80px]">
            <ArtistHero
              artistName={artist.artistName}
              artistEnglishName={artist.artistEnglishName}
              imageUrl={artist.imageUrl}
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
            <ArtistInfoSection
              description={artist.artistDescription?.description ?? null}
            />
            <Divider />
            <ConcertSection concerts={MOCK_CONCERTS} />
          </main>
        )}
      </DeferredSuspense>
      <div className="fixed-centered-layout fixed bottom-0 z-40 border-t border-basic-grey-100 bg-basic-white px-16 py-12">
        {isApp || true ? (
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
      <ArtistNotificationModal
        isOpen={isNotificationModalOpen}
        isPushEnabled={isPushEnabled}
        onClose={() => setIsNotificationModalOpen(false)}
        onEnableNotification={() => {
          // TODO: 앱 설정으로 이동
          setIsNotificationModalOpen(false);
        }}
      />
    </>
  );
};

export default Page;

const Divider = () => <div className="h-[8px] bg-basic-grey-50" />;
