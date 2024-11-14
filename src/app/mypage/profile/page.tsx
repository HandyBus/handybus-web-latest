'use client';

import AppBar from '@/components/app-bar/AppBar';
import ListButton from '../components/ListButton';
import Image from 'next/image';
import { useGetUser } from '@/services/users';
import { ID_TO_REGION } from '@/constants/regions';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/common';

const Profile = () => {
  const { data: user } = useGetUser();

  const nickname = user?.nickname ?? '';
  const profileImage = user?.profileImage ?? '';
  const gender = user?.gender === 'MALE' ? '남성' : '여성';
  const ageRange = user?.ageRange ?? '';
  const region = ID_TO_REGION[user?.regionID ?? 0] ?? '';

  if (!user) {
    return null;
  }

  return (
    <>
      <AppBar>회원 정보 관리</AppBar>
      <main>
        <section className="p-16">
          <div className="flex items-center gap-12">
            <div className="relative h-40 w-40 overflow-hidden rounded-full">
              <Image
                src={profileImage ?? DEFAULT_PROFILE_IMAGE}
                alt="프로필 이미지"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-18 font-500 text-grey-900">{nickname}</span>
          </div>
          <ul className="flex flex-col gap-8 pt-16">
            <ProfileItem title="성별" description={gender} />
            <ProfileItem title="연령대" description={ageRange} />
            <ProfileItem
              title="거주 지역"
              description={`${region.bigRegion ?? ''} ${region.smallRegion ?? ''}`}
            />
            <ProfileItem title="최애 가수" description="민지, 아이유" />
          </ul>
        </section>
        <div className="h-16 w-full bg-grey-50" />
        <ListButton
          title="프로필 수정"
          href="/mypage/profile/edit?type=profile"
        />
        <ListButton
          title="성별 및 연령대 수정"
          href="/mypage/profile/edit?type=personal-info"
        />
        <ListButton
          title="거주 지역 수정"
          href="/mypage/profile/edit?type=region"
        />
        <ListButton
          title="최애 가수 수정"
          href="/mypage/profile/edit?type=artist"
        />
      </main>
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
    <li className="flex items-center gap-16 text-grey-600-sub">
      <div className="flex h-20 w-[70px] items-center justify-center rounded-full border border-grey-100 text-12 font-500">
        {title}
      </div>
      <span className="text-14 font-400">{description}</span>
    </li>
  );
};
