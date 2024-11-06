import type { PropsWithChildren } from 'react';
import Image from 'next/image';
import AppBar from '@/components/app-bar/AppBar';
import Article from '@/components/article/Article';
import HowTo from './images/how-to.png';

const HowToPage = () => {
  return (
    <>
      <AppBar>서비스 이용 절차</AppBar>
      <Article richTitle="서비스 이용 절차" titleSize="large" className="px-28">
        <figure className="mt-8 px-16">
          <Image
            className="rounded-[15px] shadow-md"
            src={HowTo}
            alt="핸디버스 이용 순서를 나타낸 도식"
          />
        </figure>
      </Article>
      <Article richTitle="1. 수요 확인 중" titleSize="small">
        <ul className="mt-12 list-outside list-disc px-16 pl-[34px] text-16 font-500 leading-[26px] text-grey-900">
          <li>
            <p>
              해당 목적지로 가는 셔틀에 대한 사람들의 수요를 확인하는 단계예요.
            </p>
            <ul className="list-outside list-disc pl-[22px] text-16 font-500 text-grey-600-sub">
              <li>
                <p>
                  일반적으로 콘서트 선예매 당일까지 수요 확인을 진행하며,{' '}
                  <Bold>충분한 수요가 확인</Bold>되면 그 전에 예약 모집 단계로
                  넘어갈 수 있어요.
                </p>
              </li>
              <li>
                <p>
                  수요 신청은 <Bold>무료</Bold> 입니다.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </Article>
      <Article richTitle="2. 예약 모집 중" titleSize="small">
        <ul className="mt-12 list-outside list-disc px-16 pl-[34px] text-16  font-500 leading-[26px] text-grey-900">
          <li>
            <p>운행 예정 단계로 넘어온 셔틀에 대해서 셔틀 예약이 가능해요.</p>
            <ul className="list-outside list-disc pl-[22px] text-16 font-500 text-grey-600-sub">
              <li>
                <p>
                  각 지역별 셔틀 운행에 필요한{' '}
                  <Bold>최소 인원을 충족하지 못할 시, 운행이 무산</Bold>됩니다.
                  결제 금액은 무산 결정 이후 1일 이내 전액 환불됩니다.
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </Article>
      <Article richTitle="3. 예약 마감" titleSize="small" className="pb-28">
        <ul className="mt-12 list-outside list-disc px-16 pl-[34px] text-16  font-500 leading-[26px] text-grey-900">
          <li>
            <p>
              최소 인원 충족으로 운행이 확정되면 잔여석이 모두 찰 때까지 셔틀
              예약이 가능합니다.
            </p>
            <ul className="list-outside list-disc pl-[22px] text-16 font-500 text-grey-600-sub">
              <li>
                <p>
                  확정된 차량 및 셔틀 정보는 알림톡으로 공지되며, ’핸디’의 주도
                  하에 오픈채팅방이 개설되어 각종 공지 및 운행 준비가
                  이루어집니다.
                </p>
              </li>
              <li>
                <p>
                  운행 당일이 되면 오픈채팅방에서 소통하며 콘서트를 즐겁게
                  다녀오시면 됩니다 {':)'}
                </p>
              </li>
            </ul>
          </li>
        </ul>
      </Article>
    </>
  );
};

export default HowToPage;

const Bold = ({ children }: PropsWithChildren) => (
  <strong className="font-600 text-primary-main">{children}</strong>
);
