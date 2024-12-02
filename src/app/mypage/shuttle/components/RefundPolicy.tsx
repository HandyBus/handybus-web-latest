const RefundPolicy = () => {
  return (
    <ul className="list-disc pb-16 pl-16 text-14 leading-[160%] text-grey-500">
      <li>
        예약한 셔틀의 출발일 기준 8일 이전 환불 신청 건은 자동으로 전액
        환불되지만, 이후에는 환불 규정에 따라 수수료가 발생할 수 있습니다.
      </li>
      <li>
        결제 당일 취소 시, 23:59까지 무료 취소 가능합니다(당일 탑승 건 제외,
        개별 채널톡 문의)
      </li>
    </ul>
  );
};

export default RefundPolicy;
