import { useFlow } from '@/stacks';
import { UsersViewEntity } from '@/types/user.type';
import { formatPhoneNumber } from '@/utils/common.util';
import { generateProfileBackgroundColor } from '@/utils/generateProfileBackgroundColor';
import Image from 'next/image';

interface Props {
  user: UsersViewEntity;
}

const Profile = ({ user }: Props) => {
  const flow = useFlow();

  const name = user.name || user.nickname || '';
  const getSimplifiedName = (name: string) => {
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);
    if (isKorean) {
      return name.slice(-2);
    }
    const isEnglish = /^[a-zA-Z\s]+$/.test(name);
    if (isEnglish) {
      return name.split(' ')[0];
    }
    return name;
  };
  const simplifiedName = getSimplifiedName(name);

  const formattedPhoneNumber = user.phoneNumber
    ? formatPhoneNumber(user.phoneNumber)
    : '연락처 없음';

  return (
    <section className="mt-24 flex flex-col items-center gap-16 px-16">
      <div className="flex w-full items-center justify-between gap-[6px]">
        <h2 className="line-clamp-1 h-24 grow text-18 font-600 leading-[140%]">
          <span className="text-brand-primary-500">{simplifiedName}</span>님,
          안녕하세요!
        </h2>
        <button
          type="button"
          onClick={() => flow.push('ProfileEdit', {})}
          className="shrink-0 text-left text-14 font-600 text-basic-grey-500"
        >
          프로필 수정
        </button>
      </div>
      <div className="flex h-80 w-full items-center justify-between rounded-8 bg-basic-grey-50 px-16">
        <div className="flex items-center gap-8">
          <ProfileImage name={name} profileImage={user.profileImage} />
          <h1 className="line-clamp-1 text-18 font-600 leading-[140%]">
            {name}
          </h1>
        </div>
        <div className="flex items-center gap-[6px]">
          <span className="text-14 font-600 text-basic-grey-600">
            {formattedPhoneNumber}
          </span>
          {user.isConnectedKakao && (
            <div className="rounded-full bg-[#FEE500] px-8 py-4 text-10 font-600 text-basic-grey-700">
              카카오 로그인
            </div>
          )}
          {user.isConnectedNaver && (
            <div className="rounded-full bg-[#03C75A] px-8 py-4 text-10 font-600 text-basic-grey-100">
              네이버 로그인
            </div>
          )}
          {user.isConnectedApple && (
            <div className="rounded-full bg-[#000000] px-8 py-4 text-10 font-600 text-basic-white">
              애플 로그인
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;

interface ProfileImageProps {
  name: string;
  profileImage: string | null;
}

const ProfileImage = ({ name, profileImage }: ProfileImageProps) => {
  const firstLetter = name.slice(0, 1);
  return (
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
  );
};
