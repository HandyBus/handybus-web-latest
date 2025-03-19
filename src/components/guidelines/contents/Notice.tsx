// 유의사항

const TITLE_STYLE = 'text-14 font-600 text-basic-grey-700';
const TEXT_STYLE = 'text-14 font-400 text-basic-grey-600 list-disc pl-16';

const Notice = () => {
  return (
    <article className="space-y-16 leading-[22.4px]">
      <div>
        <h6 className={TITLE_STYLE}>문의</h6>
        <ul className={TEXT_STYLE}>
          <li>
            핸디버스는 본 셔틀 노선의 판매 중개자로, 직접 제공자는 각 운송업체에
            있습니다.
          </li>
        </ul>
      </div>
      <div>
        <h6 className={TITLE_STYLE}>예약/결제</h6>
        <ul className={TEXT_STYLE}>
          <li>셔틀 예약은 출발일 기준 D-3일까지 예약 가능합니다.</li>
          <li>셔틀 운행은 출발일 기준 D-5일 이내로 확정됩니다.</li>
          <li>
            확정일 기준, 최소 인원 미달 노선은 운행 무산 혹은 경우 노선으로
            운행됩니다. (경우로 인한 취소/환불 불가)
          </li>
          <li>운행 무산 시 무상 결정 후 3일 이내로 전액 환불해 드립니다.</li>
          <li>
            취소 수수료 발생 기간 내 행사 주최 측의 사정으로 행사가 취소될
            경우에만 전액 환불됩니다.
          </li>
        </ul>
      </div>
      <div>
        <h6 className={TITLE_STYLE}>탑승</h6>
        <ul className={TEXT_STYLE}>
          <li>
            탑승 전, 핸디버스 채널톡을 통해 공지된 출발/목적지 탑승 장소 위치를
            반드시 확인하시고 시간 내에 탑승해주세요.
          </li>
          <li>반드시 예약하신 출발지/도착지에서 승하차 해주시기 바랍니다.</li>
          <li>
            현장 상황으로 인해 출발지/도착지가 변경될 수 있습니다. 이는 노선별
            오픈채팅방을 통해 소통이 가능합니다.
          </li>
          <li>본 셔틀 티켓은 양도가 불가능하며, 탑승이 거부될 수 있습니다.</li>
          <li>좌석은 자유석이며, 선착순으로 탑승이 진행됩니다.</li>
        </ul>
      </div>
      <div>
        <h6 className={TITLE_STYLE}>운행</h6>
        <ul className={TEXT_STYLE}>
          <li>
            탑승자 대표인 &apos;핸디&apos;가 셔틀 운행 시 안전한 운행을 도와주는
            역할을 수행합니다. 핸디의 안내를 잘 따라주시기 바랍니다.
          </li>
          <li>운행 시간은 교통 상황에 따라 변경될 수 있습니다.</li>
          <li>행사 지연으로 인한 탑승 시간 변경은 취소/환불 불가합니다.</li>
        </ul>
      </div>
      <div>
        <h6 className={TITLE_STYLE}>기타</h6>
        <ul className={TEXT_STYLE}>
          <li>차량 내에서 음식을 섭취는 자제해주세요.</li>
          <li>
            셔틀 내의 분실 부주의로 인한 사고, 도난, 사건 등에 책임지지
            않습니다.
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Notice;
