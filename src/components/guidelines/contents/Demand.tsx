// 수요조사
// TODO: 현재 해당 내용은 보류 상태. 이후 컨펌 받고 수정하기.

const Demand = () => {
  return (
    <article className="space-y-16 leading-[22.4px]">
      <ul className="list-disc pl-16 text-14 font-400 text-basic-grey-600">
        <li>수요조사 기간 동안에는 예약이 이루어지지 않습니다.</li>
        <li>
          수요조사로 요청한 정류장에 한해서 셔틀 예약이 시작되면 알림톡으로
          알림을 전송해 드립니다.
        </li>
        <li>
          요청한 정류장이 충분한 수요에 미치지 않는 경우 노선에 포함되지 않으며,
          노선의 확정 기준은 행사 별 여러 요인에 의해 (정류장 설정, 경유 등)
          매번 달라질 수 있습니다.
        </li>
        <li>
          예약 기간동안 열려있는 노선은 모두 100% 운행됩니다. 행사 주최 측의
          사정으로 행사가 취소될 경우에만 전면 운행이 취소됩니다.
        </li>
      </ul>
    </article>
  );
};

export default Demand;
