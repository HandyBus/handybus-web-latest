'use client';

import EditForm from './components/EditForm';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUser } from '@/services/user.service';
import { useEffect, useState } from 'react';

export type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

interface Props {
  searchParams: { type: EditType | undefined };
}

const Edit = ({ searchParams }: Props) => {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const [currentType, setCurrentType] = useState<EditType | undefined>(
    searchParams.type,
  );

  useEffect(() => {
    setCurrentType(searchParams.type);
  }, [searchParams.type]);

  const isLoading = isUserLoading || !currentType;

  return (
    <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
      {user && currentType && <EditForm type={currentType} user={user} />}
    </DeferredSuspense>
  );
};

export default Edit;
