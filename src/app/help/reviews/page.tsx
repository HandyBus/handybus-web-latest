import AppBar from '@/components/app-bar/AppBar';
import Article from '@/components/article/Article';

import Review from './Review';

const ReviewPage = () => {
  return (
    <div>
      <AppBar>전체 후기</AppBar>
      <Article
        className="flex flex-col gap-24 px-16"
        richTitle={
          <>
            핸디버스의
            <br />
            생생한 후기를 살펴보세요
          </>
        }
      >
        <div className="flex flex-col gap-16">
          <div className="mt-8 w-full text-center text-16 font-500 text-grey-600-sub">
            총 후기 <span className="font-800 text-primary-main">1,350</span>개
          </div>
          <Review />
          <Review content="요번에도 세븐틴 캐럿랜드 막콘만 가게되어 차대절로 편하게 다녀왔습니다~~!! 버스안에 충전기도 구비되어 있어서 아주 편했어요~!! 다음에도" />
        </div>
      </Article>
    </div>
  );
};

export default ReviewPage;
