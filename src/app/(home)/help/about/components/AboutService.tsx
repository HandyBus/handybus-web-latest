import { type PropsWithChildren } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Article from '@/components/article/Article';
import Person1 from '../images/person1.png';
import Person2 from '../images/person2.png';
import Person3 from '../images/person3.png';

const AboutService = () => (
  <Article
    richTitle="서비스 소개"
    titleSize="small"
    className="flex w-full flex-col gap-[26px]"
  >
    <div className="flex w-full flex-col px-36">
      <Saying orient="left" img={Person1}>
        <b>수도권</b>에서 대부분의 <b>콘서트, 행사</b>가 열리는데, 지방에 사는
        사람이 콘서트장으로 이동하기 너무 <b>불편해요</b>.
      </Saying>
      <Saying orient="right" img={Person2}>
        <b>대중교통은 이동 비용</b>도 만만치 않고 <b>막차 시간</b> 때문에
        콘서트를 끝까지 즐기지도 못해요.
      </Saying>
      <Saying orient="left" img={Person3}>
        <b>단체 버스 대절</b>을 하려고 하는데 <b>혼자서</b> 총대로 나서서
        사람들을 모으기도 어렵고, 범죄 위험이 있어 일반인들에게 총대를 맡기기
        불안해요.
      </Saying>
    </div>
    <div>
      <div className="flex w-full flex-col items-center gap-4 pb-16">
        <span className="h-[6px] w-[6px] rounded bg-grey-50" />
        <span className="h-[6px] w-[6px] rounded bg-grey-50" />
        <span className="h-[6px] w-[6px] rounded bg-grey-50" />
      </div>
      <div className="w-full text-center text-16 font-500 text-grey-900">
        그래서 핸디버스는
        <br />
        콘서트장까지 이동 시 편리함을 제공하기 위해
        <br />
        {/* TODO betther highlighting/mark */}
        <b className="relative inline overflow-visible font-600 after:absolute after:bottom-[0.33em] after:left-0 after:right-0 after:-z-10 after:h-[0.6em] after:bg-primary-main after:bg-opacity-35 after:px-4 after:content-['']">
          직행으로 이동하는 셔틀 버스를 제공
        </b>
        합니다.
      </div>
    </div>
  </Article>
);

export default AboutService;

interface SubProps {
  orient: 'left' | 'right';
  img: string | StaticImport;
}

const Saying = ({ orient, img, children }: PropsWithChildren<SubProps>) => {
  const image = (
    <Image
      src={img}
      width={74}
      height={74}
      className="pt-20"
      alt="고민하는 사람의 모습"
    />
  );

  const balloon = (
    <div className=" rounded-[10px] bg-white p-8 text-12 font-500 text-grey-600-sub shadow-md shadow-grey-100 [&>b]:font-600 ">
      “{children}”
    </div>
  );

  return (
    <div className="flex flex-row items-start py-12">
      {orient === 'left' ? (
        <>
          {image}
          {balloon}
        </>
      ) : (
        <>
          {balloon}
          {image}
        </>
      )}
    </div>
  );
};
