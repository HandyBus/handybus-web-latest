'use client';

import Profile from './components/Profile';
import Activity from './components/Activity';
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
            <Settings />
          </main>
        )}
      </DeferredSuspense>
      <NavBar />
    </>
  );
};

export default MyPage;
