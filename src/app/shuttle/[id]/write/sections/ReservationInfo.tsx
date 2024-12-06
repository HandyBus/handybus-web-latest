const ReservationInfo = () => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        예약내역을 확인해주세요
      </h2>
      <div className="grid grid-cols-[80px_1fr] gap-x-32 gap-y-12">
        <div className="text-16 font-400 leading-[24px] text-grey-600">
          탑승일
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          2024. 07. 06. (토)
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          노선 종류
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          청주-천안
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          왕복 여부
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          편도 (귀가행)
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          하차 장소
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">
          청주대학교
        </div>

        <div className="text-16 font-400 leading-[24px] text-grey-600">
          탑승객 수
        </div>
        <div className="text-14 font-500 leading-[24px] text-grey-900">2명</div>
      </div>
    </section>
  );
};

export default ReservationInfo;
