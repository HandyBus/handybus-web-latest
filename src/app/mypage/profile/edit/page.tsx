'use client';

import { useGetUserStats } from '@/services/users';
import EditForm from './components/EditForm';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

export type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

interface Props {
  searchParams: { type: EditType };
}

const Edit = ({ searchParams }: Props) => {
  const { data: userStats, isLoading } = useGetUserStats();
  return (
    <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
      <EditForm type={searchParams.type} userStats={userStats!} />
    </DeferredSuspense>
  );
};

export default Edit;
