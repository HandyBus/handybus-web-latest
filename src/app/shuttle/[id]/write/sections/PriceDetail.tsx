const PriceDetail = () => {
  const isDiscounted = true;

  return (
    <dl className="flex flex-col gap-[16px]">
      <dt className="sr-only">가격 정보</dt>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-16 font-400 leading-[24px] text-grey-900">
          예약금액
        </dt>
        <div>
          <dd className="text-right text-16 font-400 leading-[24px] text-grey-900">
            30,000원
          </dd>
          <dd className="text-12 font-400 leading-[19.2px] text-grey-900">
            (42,000원 * 2인)
          </dd>
        </div>
      </div>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-16 font-400 leading-[24px] text-grey-900">
          할인금액
        </dt>
        <div>
          <dd
            className={`text-right text-16 font-400 leading-[24px] ${
              isDiscounted ? 'text-primary-main' : 'text-grey-900'
            }`}
          >
            -0원
          </dd>
          {isDiscounted && (
            <dd className="text-12 font-400 leading-[19.2px] text-primary-main">
              핸디 감사 쿠폰 (2024-08-ATEEZ-부산)
            </dd>
          )}
        </div>
      </div>
      <div className="flex h-[42px] flex-row justify-between">
        <dt className="text-18 font-500 leading-[28.8px] text-grey-900">
          최종 결제 금액
        </dt>
        <dd className="text-22 font-600 leading-[35.2px] text-grey-900">
          30,000원
        </dd>
      </div>
    </dl>
  );
};

export default PriceDetail;
