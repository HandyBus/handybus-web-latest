import Article from '@/components/article/Article';
import { PropsWithChildren } from 'react';

const AboutMerit = () => (
  <Article richTitle="이런 점이 좋아요" className="w-full">
    <div className="mx-16 mt-28 flex flex-col gap-16 border-l-2 border-l-grey-50 pl-12 pt-12 text-grey-900">
      <ul className="flex list-none flex-col gap-16">
        <MeritItem text="환승 없이 행사장까지 바로 이동해요.">
          <SubList>
            <MeritItem text="콘서트, e스포츠, 지역 축제, 스포츠 경기 등 어떤 행사든 빠르고 편하게 갈 수 있어요." />
          </SubList>
        </MeritItem>

        <MeritItem text="최저가 이동수단이에요.">
          <SubList>
            <MeritItem text="타 셔틀 플랫폼, KTX, 고속버스보다 저렴해요." />
          </SubList>
        </MeritItem>

        <MeritItem text="원하는 곳에서 출발할 수 있어요.">
          <SubList> 실시간 수요를 기반으로 노선이 생성돼요.</SubList>
        </MeritItem>
      </ul>
    </div>
  </Article>
);

export default AboutMerit;

interface MeritItemProps {
  text: string;
  children?: React.ReactNode;
}

const MeritItem = ({ text, children }: MeritItemProps) => (
  <li className="flex items-start">
    <span className="mr-8 inline-block text-grey-600">•</span>
    <div className="flex flex-col gap-8">
      <span>{text}</span>
      {children}
    </div>
  </li>
);

const SubList = ({ children }: PropsWithChildren) => (
  <ul className="flex list-none flex-col gap-8 pl-16">{children}</ul>
);
