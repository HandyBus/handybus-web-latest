const Demand = () => {
  return (
    <article className="space-y-16 leading-[22.4px]">
      <ul className="list-disc pl-16 text-14 font-400 text-basic-grey-600">
        <li>수요조사 결과를 기반으로 노선 예약 여부가 결정됩니다.</li>
        <li>수요조사 참여는 실제 예약을 의미하지 않습니다.</li>
        <li>수요조사는 행사 15일 전 마감됩니다.</li>
        <li>
          수요조사를 완료한 지역에서 셔틀 예약이 시작되면, 알림톡을 통해
          안내드립니다.
        </li>
        <li>
          요청한 지역이 충분한 수요를 충족하지 못할 경우, 노선 개설이 이루어지지
          않습니다. 이 기준은 정류장 설정, 경유지 등 여러 요인에 따라 달라질 수
          있습니다.
        </li>
      </ul>
    </article>
  );
};

export default Demand;
