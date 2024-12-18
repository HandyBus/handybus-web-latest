const PriceInfo = () => {
  return (
    <section className="flex items-center justify-between">
      <span className="text-14 font-400 leading-[22.4px] text-grey-900 ">
        총 금액
      </span>
      <div className="flex items-center text-12 font-400 leading-[19.2px] text-grey-600-sub ">
        <span>(42000 * 2인)</span>
        <span className="ml-12 text-22 font-700 leading-[35.2px] text-grey-900">
          총 10,000
        </span>
        <span className="ml-4 text-14 font-400 leading-[22.4px] text-grey-900">
          원
        </span>
      </div>
    </section>
  );
};

export default PriceInfo;
