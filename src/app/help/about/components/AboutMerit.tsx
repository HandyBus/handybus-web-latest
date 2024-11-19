import Article from '@/components/article/Article';
import { PropsWithChildren } from 'react';

const AboutMerit = () => (
  <Article richTitle="핸디버스를 통해" titleSize="small" className="w-full">
    <div className="mx-16 mt-28 flex flex-col gap-16 border-l-2 border-l-grey-50 pl-12 pt-12 text-grey-900">
      <Item>
        길에서 낭비하는{' '}
        <strong className="inline font-600">
          <Overdot>불</Overdot>
          <Overdot>필</Overdot>
          <Overdot>요</Overdot>
          <Overdot>한</Overdot>
        </strong>{' '}
        환승 시간을 줄일 수 있고{' '}
        <span className="inline text-grey-600-sub">
          (약 3시간 *부산-서울 왕복 준)
        </span>
      </Item>
      <Item>
        <span className="inline font-600">
          더 <Overdot>저</Overdot>
          <Overdot>렴</Overdot>
          <Overdot>한</Overdot> 가격
        </span>
        으로 이동할 수 있고{' '}
        <span className="inline text-grey-600-sub">
          (약 40% *부산-서울 왕복 KTX 탑승 기준)
        </span>
      </Item>
      <Item>
        내가{' '}
        <span className="inline font-600">
          원하는 노선을 <Overdot>자</Overdot>
          <Overdot>유</Overdot>
          <Overdot>롭</Overdot>
          <Overdot>게</Overdot>
        </span>{' '}
        신청하여 이용할 수 있습니다.
      </Item>
    </div>
  </Article>
);

export default AboutMerit;

const Item = ({ children }: PropsWithChildren) => <p>{children}</p>;

const Overdot = ({ children }: PropsWithChildren) => (
  <strong
    className="relative inline after:absolute after:bottom-[1.3em] after:left-0 after:right-0
  after:h-4 after:w-4 after:translate-x-[110%] after:rounded-full after:bg-primary-main after:text-primary-main after:content-['']"
  >
    {children}
  </strong>
);
