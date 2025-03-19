'use client';

import ListButton from '../components/ListButton';
import Image from 'next/image';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/common';
import { ID_TO_REGION } from '@/constants/regions';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { parsePhoneNumber } from '@/utils/common.util';
import { useGetUser } from '@/services/user.service';
import Header from '@/components/header/Header';

const Profile = () => {
  const { data: user, isLoading } = useGetUser();

  const gender = user?.gender === 'MALE' ? '남성' : '여성';
  const region = user?.regionId ? ID_TO_REGION[user.regionId] : undefined;
  const phoneNumber = parsePhoneNumber(user?.phoneNumber ?? '');

  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <main>
            <section className="p-16">
              <div className="flex items-center gap-12">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={user.profileImage || DEFAULT_PROFILE_IMAGE}
                    alt="프로필 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-basic-grey-700 text-18 font-500">
                  {user.nickname}
                </span>
              </div>
              <ul className="flex flex-col gap-8 pt-16">
                <ProfileItem title="전화번호" description={phoneNumber} />
                <ProfileItem title="성별" description={gender} />
                <ProfileItem title="연령대" description={user.ageRange} />
                {user.regionId && (
                  <ProfileItem
                    title="거주 지역"
                    description={`${region?.bigRegion ?? ''} ${region?.smallRegion ?? ''}`}
                  />
                )}
              </ul>
            </section>
            <div className="bg-basic-grey-50 h-16 w-full" />
            <ListButton
              title="프로필 수정"
              href="/mypage/profile/edit?type=profile"
            />
            <ListButton
              title="거주 지역 수정"
              href="/mypage/profile/edit?type=region"
            />
            <ListButton
              title="마케팅 수신 동의"
              href="/mypage/profile/edit/marketing"
            />
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Profile;

interface ProfileItemProps {
  title: string;
  description: string;
}

const ProfileItem = ({ title, description }: ProfileItemProps) => {
  return (
    <li className="text-basic-grey-600 flex items-center gap-16">
      <div className="border-basic-grey-100 flex h-20 w-[78px] shrink-0 items-center justify-center rounded-full border text-12 font-500">
        {title}
      </div>
      <span className="text-14 font-400">{description}</span>
    </li>
  );
};
