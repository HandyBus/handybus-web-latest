'use client';

import { generateProfileBackgroundColor } from '@/utils/generateProfileBackgroundColor';
import Image from 'next/image';

interface Props {
  profileImage: string | undefined | null;
  name: string | undefined | null;
}

const UserProfile = ({ profileImage, name }: Props) => {
  if (!name && !profileImage) return null;
  return (
    <>
      {profileImage ? (
        <div className="relative h-24 w-24">
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
          style={{ backgroundColor: generateProfileBackgroundColor(name) }}
        >
          {name?.slice(0, 1)}
        </div>
      )}
    </>
  );
};

export default UserProfile;
