import Header from '@/components/header/Header';
import TitledSection from '../components/TitledSection';
import KakaoIcon from 'public/icons/kakao.svg';
import { KAKAO_CHANNEL_URL } from '@/constants/common';
import { handleExternalLink } from '@/utils/externalLink.util';

const Page = () => {
  return (
    <main className="h-full">
      <Header />
      <TitledSection
        title={`문제가 생기셨나요?\n핸디버스 팀에게 직접 문의해 주세요.`}
      >
        <p className="mb-16 text-14 font-500 leading-[160%] text-basic-grey-600">
          고객센터는 카카오톡 공식채널로 운영하고 있어요.
          <br />
          현재 문의가 급증하여 답변이 늦어지고 있어요.
          <br />
          평균 1일 이내로 답변을 드리고 있으니 조금만 기다려주세요.
        </p>
        <p className="mb-4 text-14 font-500 leading-[160%] text-basic-grey-700">
          고객센터 운영시간
        </p>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
          [월-금]오전 9:00 ~ 오후 7:00
        </p>
      </TitledSection>
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto w-full max-w-500 bg-basic-white">
        <button
          type="button"
          onClick={() => handleExternalLink(KAKAO_CHANNEL_URL)}
          className="mx-16 my-8 flex items-center justify-center gap-[10px] rounded-8 bg-[#FAE100] px-16 py-12 text-16 font-600 leading-[160%] text-basic-black"
        >
          <KakaoIcon />
          카카오톡으로 문의하기
        </button>
      </div>
    </main>
  );
};

export default Page;
