import Image from 'next/image';
import AboutLogo from '../images/about-logo.png';

const TopSection = () => (
  <>
    <div className="flex flex-col items-center gap-32 text-center">
      <Image src={AboutLogo} width={144} height={144} alt="핸디버스 로고" />
      <div className="flex flex-col gap-12">
        <span className="w-full text-28 font-700 text-black">
          핸디버스를 소개할게요
        </span>
        <span className="text-16 font-500 text-grey-900">
          안녕하세요, 핸디버스는 <br />
          <strong className="font-600 text-primary-main">
            아이돌 콘서트 전문 셔틀 플랫폼
          </strong>
          입니다. <br />
          같은 목적지로 이동하는 사람들에게 셔틀 서비스를 제공하며,
          <br />
          나아가 사전 예약 방식의 수요응답형
          <br /> 교통 서비스를 제공하고자 합니다.
        </span>
      </div>
    </div>
  </>
);

export default TopSection;
