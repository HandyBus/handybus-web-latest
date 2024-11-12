import AppBar from '@/components/app-bar/AppBar';
import ListButton from '../components/ListButton';
import Image from 'next/image';

const MOCK_PROFILE_IMAGE =
  'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg';

const Profile = () => {
  return (
    <>
      <AppBar>회원 정보 관리</AppBar>
      <main>
        <section className="p-16">
          <div className="flex items-center gap-12">
            <div className="relative h-40 w-40 overflow-hidden rounded-full">
              <Image
                src={MOCK_PROFILE_IMAGE}
                alt="프로필 이미지"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-18 font-500 text-grey-900">민지사랑해</span>
          </div>
          <ul className="flex flex-col gap-8 pt-16">
            <ProfileItem title="성별" description="남성" />
            <ProfileItem title="연령대" description="10대 이하" />
            <ProfileItem title="거주 지역" description="서울특별시 성북구" />
            <ProfileItem title="최애 가수" description="NCT, 아이유" />
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
