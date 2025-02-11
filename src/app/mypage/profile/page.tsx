'use client';

import AppBar from '@/components/app-bar/AppBar';
import ListButton from '../components/ListButton';
import Image from 'next/image';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/common';
import { ID_TO_REGION } from '@/constants/regions';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { parsePhoneNumber } from '@/utils/common.util';
import { useGetUserStats } from '@/services/user-management.service';

const Profile = () => {
  const { data: userStats, isLoading } = useGetUserStats();

  const gender = userStats?.gender === 'MALE' ? '남성' : '여성';
  const region = userStats?.regionId
    ? ID_TO_REGION[userStats.regionId]
    : undefined;
  const phoneNumber = parsePhoneNumber(userStats?.phoneNumber ?? '');
  // const favoriteArtists =
  //   userStats?.favoriteArtists?.map((artist) => artist.artistName).join(', ') ??
  //   '';

  return (
    <>
      <AppBar>회원 정보 관리</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {userStats && (
          <main>
            <section className="p-16">
              <div className="flex items-center gap-12">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={userStats.profileImage || DEFAULT_PROFILE_IMAGE}
                    alt="프로필 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-18 font-500 text-grey-900">
                  {userStats.nickname}
                </span>
              </div>
              <ul className="flex flex-col gap-8 pt-16">
                <ProfileItem title="전화번호" description={phoneNumber} />
                <ProfileItem title="성별" description={gender} />
                <ProfileItem title="연령대" description={userStats.ageRange} />
                <ProfileItem
                  title="거주 지역"
                  description={`${region?.bigRegion ?? ''} ${region?.smallRegion ?? ''}`}
                />
                {/* {favoriteArtists && (
                  <ProfileItem
                    title="최애 아티스트"
                    description={favoriteArtists}
                  />
                )} */}
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
            {/* <ListButton
              title="최애 아티스트 수정"
              href="/mypage/profile/edit?type=artist"
              replace
            /> */}
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
    <li className="flex items-center gap-16 text-grey-600-sub">
      <div className="flex h-20 w-[78px] shrink-0 items-center justify-center rounded-full border border-grey-100 text-12 font-500">
        {title}
      </div>
      <span className="text-14 font-400">{description}</span>
    </li>
  );
};
