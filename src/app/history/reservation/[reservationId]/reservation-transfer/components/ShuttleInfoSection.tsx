import WrapperWithDivider from './WrapperWithDivider';

const ShuttleInfoSection = () => {
  return (
    <WrapperWithDivider>
      <section className="p-16">
        <h3 className="pb-16 text-16 font-600">셔틀 정보</h3>
        <div className="grid grid-cols-[72px_1fr] gap-x-16 gap-y-8 text-14 font-600">
          <h5>행사명</h5>
          <p>뮤즈내한콘서트</p>
          <h5>탑승 일시</h5>
          <p>2025.10.21 (화) 10:00</p>
          <h5>탑승 유형</h5>
          <p>귀가행</p>
          <h5>탑승 정보</h5>
          <p>잠실실내체육관 → 강남역</p>
          <h5>인원</h5>
          <p>2명</p>
        </div>
      </section>
    </WrapperWithDivider>
  );
};

export default ShuttleInfoSection;
