'use client';

import Profile from './components/Profile';
import Activity from './components/Activity';
import FavoriteArtists from './components/FavoriteArtists';
import Settings from './components/Settings';
import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import { useGetUser } from '@/services/user.service';
import NavBar from '@/components/nav-bar/NavBar';

const MyPage = () => {
  const { data: user, isLoading: isLoadingUser } = useGetUser();
  const isLoading = isLoadingUser;

  return (
    <>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <main className="grow pb-48">
            <Profile user={user} />
            <Activity />
            <FavoriteArtists
              // favoriteArtists={user.favoriteArtists ?? null}
              favoriteArtists={[
                { artistId: '1', artistName: 'aespa' },
                { artistId: '2', artistName: 'NewJeans' },
                { artistId: '3', artistName: 'IVE' },
                { artistId: '4', artistName: 'SEVENTEEN' },
                { artistId: '5', artistName: '(여자)아이들' },
                { artistId: '6', artistName: 'tomorrow x together' },
              ]}
            />
            <Settings />
          </main>
        )}
      </DeferredSuspense>
      <NavBar />
    </>
  );
};

export default MyPage;
