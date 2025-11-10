import Skeleton from 'react-loading-skeleton';

const TicketSkeleton = () => {
  return (
    <main className="min-h-[100dvh] min-h-screen bg-basic-black">
      {/* 캡쳐화면 경고 */}
      <aside className="bg-basic-red-100 px-16 py-8 text-center text-14 font-600 leading-[160%] text-basic-red-400">
        캡쳐화면은 탑승이 제한될 수 있습니다.
      </aside>

      <article className="flex flex-col gap-16">
        {/* AntiCapture */}
        <section className="py-8">
          <div className="relative h-[34px] overflow-hidden"></div>
        </section>

        <div className="flex flex-col gap-24 px-[22px]">
          {/* 탑승권 카드 스켈레톤 */}
          <div className="rounded-[8px] bg-basic-white">
            {/* 여정타입 헤더 */}
            <section className="flex  items-center justify-between rounded-t-[8px] bg-brand-primary-400 px-16 py-12">
              <div className="h-28 w-full" />
            </section>

            {/* 이벤트명 및 노선 */}
            <section className="flex flex-col gap-8 px-16 py-24">
              <Skeleton width="80%" height={20} />
              <div className="flex gap-8">
                <div className="flex flex-col gap-24">
                  <div className="flex gap-[6px]">
                    <Skeleton width="40px" height={16} />
                    <Skeleton width="120px" height={28.5} />
                  </div>
                  <div className="flex gap-[6px]">
                    <Skeleton width="40px" height={16} />
                    <Skeleton width="120px" height={28.5} />
                  </div>
                </div>
              </div>
            </section>

            <div className="border-t border-basic-grey-100" />

            {/* 탑승일시 */}
            <section className="flex flex-col gap-8 px-16 py-24">
              <Skeleton width="60px" height={16} />
              <Skeleton width="200px" height={23} />
            </section>

            {/* 노선도 구분선 */}
            <div className="relative">
              <div className="absolute -left-[10px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 rounded-full bg-basic-black"></div>
              <div className="absolute -right-[10px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 rounded-full bg-basic-black"></div>
              <div className="mx-10 border-[1px] border-dashed border-basic-grey-300"></div>
            </div>

            {/* 탑승자 정보 그리드 */}
            <section className="grid grid-cols-2 gap-16 px-16 py-24">
              <div className="flex flex-col gap-8">
                <Skeleton width="80px" height={16} />
                <Skeleton width="120px" height={14} />
                <Skeleton width="120px" height={14} />
                <Skeleton width="120px" height={14} />
              </div>
              <div className="flex flex-col gap-8">
                <Skeleton width="60px" height={16} />
                <Skeleton width="40px" height={18} />
              </div>
              <div className="flex flex-col gap-8">
                <Skeleton width="100px" height={16} />
                <Skeleton width="60px" height={18} />
              </div>
              <div className="flex flex-col gap-8">
                <Skeleton width="40px" height={16} />
                <Skeleton width="50px" height={18} />
              </div>
            </section>

            {/* 채널 문의하기 */}
            <div className="flex w-full items-center gap-[6px] rounded-b-[8px] bg-basic-grey-50 px-16 py-12">
              <Skeleton width="120px" height={18} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default TicketSkeleton;
