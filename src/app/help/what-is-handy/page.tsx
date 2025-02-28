import { Metadata } from 'next';
import Header from '@/components/header/Header';
import Image from 'next/image';
import MainImage from './images/main.png';
import DescriptionImage1 from './images/description1.png';
import DescriptionImage2 from './images/description2.png';
import DescriptionImage3 from './images/description3.png';
import DescriptionImage4 from './images/description4.png';
import CouponImage from './images/coupon.png';
import BottomImage from './images/bottom.png';

export const metadata: Metadata = {
  title: '핸디란?',
};

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="flex w-full grow flex-col gap-40 pb-12">
        <section className="flex h-[366px] w-full flex-col items-center justify-end bg-[#E6FFF7]">
          <p className="pb-4 pt-40 text-16 font-600">
            승차권 <span className="text-primary-main">50%</span> 할인
          </p>
          <h1 className="pb-36 text-center text-28 font-700 leading-[39px]">
            핸디로 지원하고
            <br />
            <span className="text-primary-main">최대 4만원</span> 받으세요
          </h1>
          <div className="relative h-188 w-full">
            <Image
              src={MainImage}
              alt="핸디 소개 이미지"
              fill
              className="object-contain"
            />
          </div>
        </section>
        <section className="flex flex-col gap-8 px-16">
          <h2 className="text-22 font-700">핸디가 뭐에요?</h2>
          <p className="text-16 font-400 text-grey-700">
            함께 가는 팬들을 연결하는{' '}
            <span className="inline-block rounded-[] bg-[#E6FFF7] px-12 text-16 font-600 text-primary-main">
              커넥터
            </span>
            예요. 셔틀 내에서 행사장까지의 여정을 원활하게 만들고, 팬들과의
            소통을 통해 즐거운 분위기를 만들어주는 중요한 역할을 해요. 즐거운
            분위기를 만들어주는 중요한 역할을 해요.
          </p>
          <p className="text-14 font-400 text-grey-400">
            * 핸디는 지원자 중 한 분만 선정돼요.
          </p>
        </section>
        <section className="flex flex-col gap-8 px-16">
          <h2 className="text-22 font-700">핸디가 뭐에요?</h2>
          <p className="text-16 font-400 text-grey-700">
            너무 어려울 것 같다고요? 전혀 그렇지 않아요.
            <br />
            누구든 할 수 있어요! 핸디가 하는 일을 알려드릴게요.
          </p>
          <article>
            <h3 className="mb-12 flex h-24 items-center gap-8 text-18 font-600">
              <span className="rounded-[6px] bg-[#F3F3F3] px-8 text-grey-700">
                1
              </span>
              출발/도착 알림
            </h3>
            <p>오픈챗을 통해 셔틀버스의 출발과 도착 알림을 보내요.</p>
          </article>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
