import Article from '@/components/article/Article';

import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';

const OnDemandingSection = () => {
  return (
    <Article richTitle="수요 확인 중인 셔틀" showMore="/TODO">
      <div className="w-full p-16">
        <RedirectButton description="찾고 있는 셔틀이 없나요?" href="/TODO">
          원하는 셔틀 요청하기
        </RedirectButton>
      </div>
    </Article>
  );
};

export default OnDemandingSection;
