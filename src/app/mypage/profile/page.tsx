'use client';

import AppBar from '@/components/app-bar/AppBar';
import ListButton from '../components/ListButton';
import Image from 'next/image';
import { useGetUserDashboard } from '@/services/users';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/common';

const Profile = () => {
  const { data: userDashboard } = useGetUserDashboard();

  const nickname = userDashboard?.nickname ?? '';
  const profileImage = userDashboard?.profileImage ?? '';
  const gender = userDashboard?.gender === 'MALE' ? '남성' : '여성';
  const ageRange = userDashboard?.ageRange ?? '';
  const region = userDashboard?.region;
  const favoriteArtists =
    userDashboard?.favoriteArtists.map((artist) => artist.name).join(', ') ??
    '';

  if (!userDashboard) {
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
              description={`${region?.provinceFullName ?? ''} ${region?.cityFullName ?? ''}`}
            />
            <ProfileItem title="최애 가수" description={favoriteArtists} />
          </ul>
        </section>
        <div className="h-16 w-full bg-grey-50" />
        <ListButton
          title="프로필 수정"
          href="/mypage/profile/edit?type=profile"
          replace
        />
        <ListButton
          title="성별 및 연령대 수정"
          href="/mypage/profile/edit?type=personal-info"
          replace
        />
        <ListButton
          title="거주 지역 수정"
          href="/mypage/profile/edit?type=region"
          replace
        />
        <ListButton
          title="최애 가수 수정"
          href="/mypage/profile/edit?type=artist"
          replace
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
      <div className="flex h-20 w-[70px] shrink-0 items-center justify-center rounded-full border border-grey-100 text-12 font-500">
        {title}
      </div>
      <span className="text-14 font-400">{description}</span>
    </li>
  );
};
