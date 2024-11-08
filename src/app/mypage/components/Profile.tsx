import Image from 'next/image';
import ArrowRight from 'public/icons/quill-chevron-right.svg';

const MOCK_PROFILE_IMAGE =
  'https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/08/19/c5cd0937-06c6-4f4c-9f22-660c5ec8adfb.jpg';

const Profile = () => {
  return (
    <section className="mb-4 mt-28 flex flex-col items-center gap-12">
      <div className="relative h-80 w-80 overflow-hidden rounded-full">
        <Image
          src={MOCK_PROFILE_IMAGE}
          alt="프로필 이미지"
          fill
          className="object-cover"
        />
      </div>
      <button className="flex items-center gap-8">
        <h2 className="text-22 font-600">민지사랑해</h2>
        <ArrowRight
          color="#5A5A5A"
          width={17}
          height={17}
          viewBox="0 0 21 20"
        />
      </button>
    </section>
  );
};

export default Profile;
