import Image from 'next/image';
import HandyTransparent from '../images/handy-transparent.png';
import Article from '@/components/article/Article';

const AboutStats = () => (
  <Article
    richTitle="지금까지 핸디버스는"
    className="flex flex-col items-center"
  >
    <div className="mt-28 flex h-[152px] flex-col items-center justify-start rounded-12 px-[13px] py-[14px] shadow-md">
      <figure>
        <Image
          src={HandyTransparent}
          alt="핸디버스 로고"
          width={109}
          height={55}
        />
      </figure>
      <ul className="mt-16 list-outside list-disc pl-16 text-[14px] font-500 text-basic-grey-600">
        <li>
          <p>누적 탑승객 5,000명</p>
        </li>
        <li>
          <p>버스 158대 운행</p>
        </li>
      </ul>
    </div>
  </Article>
);

export default AboutStats;
