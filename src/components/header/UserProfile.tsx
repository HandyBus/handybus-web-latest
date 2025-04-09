'use client';

import Image from 'next/image';
import { useCallback } from 'react';

interface Props {
  profileImage: string | undefined | null;
  nickname: string | undefined | null;
}

const UserProfile = ({ profileImage, nickname }: Props) => {
  const generateBackgroundColor = useCallback(
    (nickname: string | null | undefined) => {
      if (!nickname) {
        return PROFILE_COLOR[0];
      }

      // 닉네임 첫 글자의 유니코드를 사용하여 색상 인덱스 계산
      const char = nickname.charCodeAt(0);
      const colorIndex = char % PROFILE_COLOR.length;
      return PROFILE_COLOR[colorIndex];
    },
    [nickname],
  );

  if (!nickname && !profileImage) return null;
  return (
    <>
      {profileImage ? (
        <div className="relative h-24 w-24 ">
          <Image
            src={profileImage}
            alt="profile"
            fill
            className="rounded-full"
          />
        </div>
      ) : (
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full text-12 font-500 leading-[100%] text-basic-white"
          style={{ backgroundColor: generateBackgroundColor(nickname) }}
        >
          {nickname?.slice(0, 1)}
        </div>
      )}
    </>
  );
};

export default UserProfile;

const PROFILE_COLOR = [
  '#181F29',
  '#EFD807',
  '#F6951E',
  '#FF543E',
  '#E14548',
  '#7C4400',
  '#FA96C2',
  '#E57AD9',
  '#EF2D9B',
  '#C695E7',
  '#9125EF',
  '#69D5E6',
  '#0EDBE5',
  '#73A1E3',
  '#23ADB4',
  '#2848FF',
  '#6FC76A',
  '#A5D740',
  '#01D588',
  '#29CC00',
  '#0D8C22',
  '#949494',
] as const;
