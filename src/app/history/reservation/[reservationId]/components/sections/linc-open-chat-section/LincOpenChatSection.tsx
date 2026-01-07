import Link from 'next/link';
import WrapperWithDivider from '../../WrapperWithDivider';
import NewIcon from './icons/new.svg';

const LincOpenChatSection = () => {
  return (
    <WrapperWithDivider>
      <section className="flex flex-col gap-16 px-16 py-24">
        <h2 className="flex gap-[2px] text-16 font-600 leading-[160%]">
          오픈챗 <NewIcon className="" />
        </h2>
        <div className="flex flex-col text-14 font-500 leading-[160%]">
          <p className=" text-basic-grey-700">
            함께 가는 팬들을 위한 채팅방이에요. 콘서트 정보부터 공연의 설렘까지
            자유롭게 나눠보세요!
          </p>
          <p className="text-basic-grey-500">
            *오픈챗 참여를 위해서는 LiNC 앱 설치가 필요합니다.
          </p>
        </div>
        <Link
          href="https://app.linc.fan/31TL/handybus_cxm"
          target="_blank"
          rel="noopener noreferrer"
          className="active:bg-basic-grey-2000 block w-full rounded-8 bg-basic-grey-100 px-16 py-12 text-center text-16 font-600 leading-[160%] text-basic-grey-700"
        >
          오픈챗 참여하기
        </Link>
      </section>
    </WrapperWithDivider>
  );
};

export default LincOpenChatSection;
