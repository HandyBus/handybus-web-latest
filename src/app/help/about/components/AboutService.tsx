import { type PropsWithChildren } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Article from '@/components/article/Article';
import Person1 from '../images/person1.png';
import Person2 from '../images/person2.png';
import Person3 from '../images/person3.png';

const AboutService = () => (
  <Article
    richTitle="이런 고민 해본 적 있나요?"
    className="flex w-full flex-col gap-[26px]"
  >
    <div className="flex w-full flex-col px-36">
      <Saying orient="left" img={Person1}>
        지방에 살아서 행사를 보러 가기가 너무 힘들어요
      </Saying>
      <div className="flex justify-end">
        <Saying orient="right" img={Person2}>
          대중교통은 비싸고, 막차 때문에 끝까지 못 즐겨요
        </Saying>
      </div>
      <Saying orient="left" img={Person3}>
        버스 대절하려니 혼자 총대 메기 무섭고 사기 당할까 걱정돼요
      </Saying>
    </div>
    <div>
      <div className="flex w-full flex-col items-center gap-4 pb-16">
        <span className="rounded h-[6px] w-[6px] bg-basic-grey-50" />
        <span className="rounded h-[6px] w-[6px] bg-basic-grey-50" />
        <span className="rounded h-[6px] w-[6px] bg-basic-grey-50" />
      </div>
      <p className="w-full text-center text-16 font-500 text-basic-grey-700">
        그래서 핸디버스는
        <br />
        콘서트장까지 이동 시 편리함을 제공하기 위해
        <br />
        <b className="relative inline overflow-visible font-600 after:absolute after:bottom-[0.33em] after:left-0 after:right-0 after:-z-10 after:h-[0.6em] after:bg-brand-primary-400 after:bg-opacity-35 after:px-4 after:content-['']">
          직행으로 이동하는 셔틀 버스를 제공
        </b>
        합니다.
      </p>
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
    <p className=" rounded-10 bg-basic-white p-8 text-12 font-500 text-basic-grey-600 shadow-md shadow-basic-grey-100 [&>b]:font-600 ">
      “{children}”
    </p>
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
