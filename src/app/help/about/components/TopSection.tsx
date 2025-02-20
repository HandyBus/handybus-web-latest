import Image from 'next/image';
import AboutLogo from '../images/about-logo.png';

const TopSection = () => (
  <article className="flex flex-col gap-12 text-center">
    <header className="flex flex-col items-center gap-32">
      <Image src={AboutLogo} width={144} height={144} alt="핸디버스 로고" />
      <h2 className="w-full text-28 font-700 text-black">서비스 소개</h2>
    </header>
    <p className="text-16 font-500 text-grey-900">
      안녕하세요, 핸디버스예요! <br />
      행사장 가는 길, 힘들지 않으셨나요? <br />
      이제 쉽고 편하게 갈 수 있어요.
    </p>
  </article>
);

export default TopSection;
