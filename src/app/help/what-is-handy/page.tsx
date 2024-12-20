import AppBar from '@/components/app-bar/AppBar';
import Article from '@/components/article/Article';
import { PropsWithChildren } from 'react';
import ToastyCheck from 'public/icons/toasty-check.svg';

const AboutPage = () => {
  return (
    <>
      <AppBar>핸디란?</AppBar>
      <main className="w-full flex-grow pb-12">
        <Article titleSize="large" richTitle="핸디버스의 ‘핸디’란?">
          <p className="w-full flex-col gap-8 px-16 pt-12 text-16 font-500 text-grey-700">
            핸디버스의 ‘핸디’는 안전한 셔틀 운행을 위한 현장 도우미예요. 셔틀 당
            선착순으로 한 분을 뽑아요.
          </p>
        </Article>
        <Article titleSize="small" richTitle="딱 이 세가지가 필요해요">
          <ul className="flex w-full flex-col gap-8 px-16 pt-12">
            <Desc>만 19세 이상 성인</Desc>
            <Desc>왕복 탑승 이용 고객</Desc>
            <Desc>전화번호 공개 가능</Desc>
          </ul>
        </Article>
        <Article titleSize="small" richTitle="딱 이 세가지만 하면 돼요">
          <ul className="flex w-full flex-col gap-8 px-16 pt-12">
            <Desc checked>다 왔는지 탑승 인원 체크</Desc>
            <Desc checked>기사님과 간단한 소통</Desc>
            <Desc checked>핸디버스에게 출발, 도착 알림</Desc>
          </ul>
        </Article>
        <Article titleSize="small" richTitle="이런 혜택이 있어요">
          <p className="mb-28 w-full flex-col gap-8 px-16 pt-12 text-16 font-500 text-grey-700">
            다음에 또 핸디버스를 이용하실 때{' '}
            <strong className="font-600 text-primary-main">
              이용료의 절반을 할인
            </strong>{' '}
            받을 수 있는 쿠폰을 드려요!
          </p>
        </Article>
      </main>
    </>
  );
};

export default AboutPage;

const Desc = ({
  checked,
  children,
}: PropsWithChildren<{ checked?: boolean }>) => {
  return (
    <li className="flex size-16 h-fit w-full flex-row items-center gap-[10px] rounded-[8px] bg-grey-50 px-12 py-16 text-16 font-500">
      <figure
        className={
          checked ? 'text-20 text-primary-main' : 'text-20 text-grey-600-sub'
        }
      >
        <ToastyCheck />
      </figure>
      <p className="text-16 font-500 text-grey-700">{children}</p>
    </li>
  );
};
