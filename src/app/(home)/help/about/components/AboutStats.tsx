import Image from 'next/image';
import Article from '@/components/article/Article';
import HandyTransparent from '../images/handy-transparent.png';

const AboutStats = () => (
  <Article
    richTitle="지금까지 핸디버스는"
    titleSize="small"
    className="flex flex-col items-center"
  >
    <div className="mt-28 flex h-[182px] flex-col items-center justify-start rounded-[12px] px-[13px] py-[14px] shadow-md">
      <Image
        src={HandyTransparent}
        alt="핸디버스 로고"
        width={109}
        height={55}
      ></Image>
      <ul className="mt-16 list-inside list-disc text-[14px] font-500 text-grey-600-sub">
        <li>누적 탑승객 2,987명</li>
        <li>버스 110대 운행</li>
      </ul>
    </div>
  </Article>
);

export default AboutStats;
