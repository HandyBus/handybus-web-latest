import Image from 'next/image';
import Article from '@/components/article/Article';
import HowTo from './images/how-to.png';
import { Metadata } from 'next';
import Header from '@/components/header/Header';

export const metadata: Metadata = {
  title: '서비스 이용 절차',
};

const HowToPage = () => {
  return (
    <>
      <Header />
      <article className="mx-16 mt-56">
        <h1 className="text-28 font-700 leading-[39.2px] text-basic-black">
          이용 절차
        </h1>
        <p className="text-basic-grey-700 mt-4 text-16 font-500 leading-[25.6px]">
          핸디버스를 통한 콘서트 여정은 이렇게 진행돼요.
        </p>
        <figure className="mt-8 ">
          <Image
            className="rounded-[15px] shadow-md"
            src={HowTo}
            alt="핸디버스 이용 순서를 나타낸 도식"
          />
        </figure>
      </article>
      <Article richTitle="1. 수요조사">
        <p className="text-basic-grey-700 ml-36 text-16 font-500 leading-[26px]">
          여러분의 관심도를 체크해요
        </p>
        <ul className="text-basic-grey-700 mt-12 list-outside list-disc px-16 pl-[34px] text-16 font-500 leading-[26px]">
          <li>
            <p className="py-[2px]">
              수요조사를 통해 목적지로 가는 셔틀 수요를 확인해요
            </p>
            <ul className="text-basic-grey-600 list-outside list-disc pl-[22px] text-16 font-500">
              <li>
                <p className="py-[2px]">
                  보통 콘서트 선예매 당일까지 수요를 살펴봐요
                </p>
              </li>
              <li>
                <p className="py-[2px]">
                  많은 분들이 원하시면 더 빨리 노선을 확정해요
                </p>
              </li>
              <li>
                <p className="py-[2px]">수요 신청은 무료예요!</p>
              </li>
            </ul>
          </li>
        </ul>
      </Article>
      <Article richTitle="2. 운행 확정">
        <p className="text-basic-grey-700 ml-36 text-16 font-500 leading-[26px]">
          노선 운행을 결정해요
        </p>
        <ul className="text-basic-grey-700 mt-12 list-outside list-disc px-16 pl-[34px] text-16 font-500 leading-[26px]">
          <li>
            <p className="py-[2px]">
              충분한 수요가 모이면 노선 운행을 확정해요
            </p>
          </li>
        </ul>
      </Article>
      <Article richTitle="3. 셔틀 예약" className="pb-28">
        <p className="text-basic-grey-700 ml-36 text-16 font-500 leading-[26px]">
          30초만에 간편하게 예약하세요
        </p>
        <ul className="text-basic-grey-700 mt-12 list-outside list-disc px-16 pl-[34px]  text-16 font-500 leading-[26px]">
          <li>
            <p className="py-[2px]">
              확정된 노선은 자리가 다 찰 때까지 예약할 수 있어요
            </p>
          </li>
          <li>
            <p className="py-[2px]">차량과 셔틀 정보는 알림톡으로 알려드려요</p>
          </li>
          <li>
            <p className="py-[2px]">
              &apos;핸디&apos;가 오픈채팅방을 만들어 소통해요
            </p>
          </li>
          <ul className="text-basic-grey-600 list-outside list-disc pl-[22px] text-16 font-500">
            <li>
              <p className="py-[2px]">
                콘서트 당일, 오픈채팅방에서 함께 이야기 나누며 즐거운 시간
                보내세요!
              </p>
            </li>
          </ul>
        </ul>
      </Article>
      <article className="my-56 flex justify-center">
        <p className="text-center text-18 font-600 leading-[25.2px] text-basic-black">
          지금 바로 가고싶은 공연을
          <br /> 핸디버스에게 알려주세요.☺️
          <br /> 편안한 콘서트 여정을 준비할게요!
        </p>
      </article>
    </>
  );
};

export default HowToPage;
