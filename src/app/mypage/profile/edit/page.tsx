'use client';

import EditForm from './components/EditForm';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUser } from '@/services/user.service';

// NOTE: 현재 v2에서 profile 타입만 수정 가능. 추후 확장을 위해 다른 타입들을 유지.
export type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

const Edit = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();

  const isLoading = isUserLoading;

  return (
    <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
      {user && <EditForm user={user} type="profile" />}
    </DeferredSuspense>
  );
};

export default Edit;
