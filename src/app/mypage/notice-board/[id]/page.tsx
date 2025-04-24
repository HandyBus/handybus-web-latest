import Header from '@/components/header/Header';

const Page = () => {
  return (
    <main>
      <Header />
      <section className="px-16">
        <section className={`flex justify-between gap-[9px] py-12`}>
          <div className="flex flex-col">
            <span
              className={`text-14 font-600 leading-[160%] text-basic-black`}
            >
              [공지] 콜드플레이 지방 추가 노선 개설 안내
            </span>
            <span className="text-12 font-500 leading-[160%] text-basic-grey-500">
              2025.03.27
            </span>
          </div>
        </section>
        <div className="mx-[-16px] h-[1px] bg-basic-grey-100" />
        <div className="py-16 text-16 font-500 leading-[160%] text-basic-black">
          안녕하세요. 핸디버스 팀입니다. 콜드플레이 내한 콘서트 추가 오픈 셔틀
          안내드립니다. 29일 [새로 열린 노선] 평택 대전(서대전출발) 구미 [좌석
          추가 노선] 대구 반월당 울산 [30일] [새로 열린 노선] 청주 [좌석 추가
          노선] 대구 부산 기다려주셔서 감사드립니다! 모든 좌석이 빠르게 매진되고
          있으니 서둘러 예약해 주세요.
        </div>
      </section>
    </main>
  );
};

export default Page;
