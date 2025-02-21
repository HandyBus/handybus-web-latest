'use client';

import EditForm from './components/EditForm';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUser } from '@/services/user-management.service';

export type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

interface Props {
  searchParams: { type: EditType | undefined };
}

const Edit = ({ searchParams }: Props) => {
  const { data: user, isLoading } = useGetUser();
  return (
    <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
      {user && <EditForm type={searchParams.type} user={user} />}
    </DeferredSuspense>
  );
};

export default Edit;
