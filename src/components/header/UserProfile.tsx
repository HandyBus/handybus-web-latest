import { useGetUser } from '@/services/user.service';
import Image from 'next/image';

const UserProfile = () => {
  const { data: user } = useGetUser();
  const profileImage = user?.profileImage;
  const nickname = user?.nickname;

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
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-basic-black text-12 font-500 leading-[100%] text-basic-white">
          {nickname?.slice(0, 1)}
        </div>
      )}
    </>
  );
};

export default UserProfile;
