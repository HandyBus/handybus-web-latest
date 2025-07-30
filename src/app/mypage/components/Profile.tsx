import { generateProfileBackgroundColor } from '@/utils/generateProfileBackgroundColor';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  name: string;
  profileImage: string;
}

const Profile = ({ name, profileImage }: Props) => {
  const firstLetter = name?.slice(0, 1);
  return (
    <section className="my-24 flex h-[34px] items-center gap-8 px-16">
      <div
        className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full text-16 font-500 text-basic-white"
        style={{
          backgroundColor: profileImage
            ? 'transparent'
            : generateProfileBackgroundColor(name),
        }}
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        ) : (
          <span>{firstLetter}</span>
        )}
      </div>
      <h1 className="text-18 font-600">{name}</h1>
      <Link
        href="/mypage/profile/edit"
        className="ml-auto text-14 font-600 text-basic-grey-500"
      >
        프로필 수정
      </Link>
    </section>
  );
};

export default Profile;
