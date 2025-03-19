import { Metadata } from 'next';
import Header from '@/components/header/Header';
import Image from 'next/image';
import MainImage from './images/main.png';
import DescriptionImage1 from './images/description-1.png';
import DescriptionImage2 from './images/description-2.png';
import DescriptionImage3 from './images/description-3.png';
import DescriptionImage4 from './images/description-4.png';
import CouponImage from './images/coupon.png';
import BottomImage from './images/bottom.png';
import Button from '@/components/buttons/button/Button';
import Link from 'next/link';

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
            승차권 <span className="text-brand-primary-400">50%</span> 할인
          </p>
          <h1 className="pb-36 text-center text-28 font-700 leading-[39px]">
            핸디로 지원하고
            <br />
            <span className="text-brand-primary-400">최대 4만원</span> 받으세요
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
          <p className="text-16 font-400 text-basic-grey-700">
            함께 가는 팬들을 연결하는{' '}
            <span className="inline-block rounded-4 bg-[#E6FFF7] px-4 text-16 font-600 text-brand-primary-400">
              커넥터 (Connector)
            </span>
            예요. 셔틀 내에서 행사장까지의 여정을 원활하게 만들고, 팬들과의
            소통을 통해 즐거운 분위기를 만들어주는 중요한 역할을 해요. 즐거운
            분위기를 만들어주는 중요한 역할을 해요.
          </p>
          <p className="text-14 font-400 text-basic-grey-400">
            * 핸디는 지원자 중 한 분만 선정돼요.
          </p>
        </section>
        <section className="px-16">
          <h2 className="mb-8 text-22 font-700">역할</h2>
          <p className="mb-32 text-16 font-400 text-basic-grey-700">
            너무 어려울 것 같다고요? 전혀 그렇지 않아요.
            <br />
            누구든 할 수 있어요! 핸디가 하는 일을 알려드릴게요.
          </p>
          <article className="mb-32">
            <h3 className="mb-12 flex h-24 items-center gap-8 text-18 font-600">
              <span className="rounded-6 bg-[#F3F3F3] px-8 text-basic-grey-700">
                1
              </span>
              출발/도착 알림
            </h3>
            <Image
              src={DescriptionImage1}
              alt="출발/도착 알림"
              className="mb-8 w-full"
            />
            <p className="text-16 font-400 text-basic-grey-700">
              오픈챗을 통해 셔틀버스의 출발과 도착 알림을 보내요.
            </p>
          </article>
          <article className="mb-32">
            <h3 className="mb-12 flex h-24 items-center gap-8 text-18 font-600">
              <span className="rounded-6 bg-[#F3F3F3] px-8 text-basic-grey-700">
                2
              </span>
              탑승 인원 확인
            </h3>
            <Image
              src={DescriptionImage2}
              alt="탑승 인원 확인"
              className="mb-8 w-full"
            />
            <p className="text-16 font-400 text-basic-grey-700">
              함께 가는 인원이 모두 왔는지 확인해요.
            </p>
          </article>
          <article className="mb-32">
            <h3 className="mb-12 flex h-24 items-center gap-8 text-18 font-600">
              <span className="rounded-6 bg-[#F3F3F3] px-8 text-basic-grey-700">
                3
              </span>
              아티스트 영상 공유
            </h3>
            <Image
              src={DescriptionImage3}
              alt="아티스트 영상 공유"
              className="mb-8 w-full"
            />
            <p className="text-16 font-400 text-basic-grey-700">
              아티스트의 영상이나 음악을 신청 받고 함께 감상해요.
            </p>
          </article>
          <article className="mb-32">
            <h3 className="mb-12 flex h-24 items-center gap-8 text-18 font-600">
              <span className="rounded-6 bg-[#F3F3F3] px-8 text-basic-grey-700">
                4
              </span>
              기사님과 소통
            </h3>
            <Image
              src={DescriptionImage4}
              alt="기사님과 소통"
              className="mb-8 w-full"
            />
            <p className="text-16 font-400 text-basic-grey-700">
              필요시 기사님과 간단하게 소통해요.
            </p>
          </article>
        </section>
        <section className="px-16">
          <h2 className="mb-8 text-22 font-700">혜택</h2>
          <p className="mb-16 text-16 font-400 text-basic-grey-700">
            핸디버스는 핸디의 노력을 절대 잊지 않아요.
            <br />
            감사하는 마음을 담아 결제 금액의 50%를 지원해 드려요.
          </p>
          <Image
            src={CouponImage}
            alt="핸디에게 결제 금액의 50% 지원"
            className="mx-auto mb-16 w-full max-w-[114px]"
          />
          <p className="text-12 font-400 text-basic-grey-400">
            * 셔틀 운행이 종료된 후 50%을 환급해 드려요.
          </p>
        </section>
        <section>
          <Image src={BottomImage} alt="핸디버스 소개" className="w-full" />
        </section>
        <section className="px-16">
          <Link href="/help/faq" className="w-full rounded-full">
            <Button variant="tertiary" className="w-full">
              자주 묻는 질문
            </Button>
          </Link>
        </section>
        <section className="bg-basic-grey-100 px-16 py-24">
          <h3 className="mb-8 text-18 font-700 text-basic-grey-700">
            유의사항
          </h3>
          <ul className="list-disc pl-16 text-16 font-400 text-basic-grey-500">
            <li>핸디는 만 19세 이상 성인만 지원 가능해요.</li>
            <li>
              핸디는 결제 단계에서 지원할 수 있으며, 왕복 탑승객으로 제한돼요.
            </li>
            <li>핸디는 원활한 소통을 위해 연락처를 공개합니다.</li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
