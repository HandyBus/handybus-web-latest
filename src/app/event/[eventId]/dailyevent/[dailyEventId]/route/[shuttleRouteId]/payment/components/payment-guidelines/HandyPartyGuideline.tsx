const TITLE_STYLE = 'text-16 font-600 text-basic-black mb-8';
const SUB_TITLE_STYLE = 'text-14 font-600 text-basic-black mb-4';
const TEXT_STYLE =
  'text-14 font-500 text-basic-grey-700 list-disc pl-20 leading-[22.4px]';

const ShuttleBusGuideline = () => {
  return (
    <div className="flex flex-col gap-20">
      <section className="rounded-8 bg-basic-grey-50 p-16">
        <h5 className={TITLE_STYLE}>꼭 알아두세요</h5>
        <article>
          <ul className={TEXT_STYLE}>
            <li>
              핸디버스는 본 셔틀 노선의 판매 중개자로, 직접 제공자는 각
              운송업체에 있습니다.
            </li>
            <li>
              ★승하차위치는 현장 상황에 따라 변경될 수 있으며, 변경 시 문자로
              안내드립니다.
            </li>
            <li>
              ★당일 행사 종료 시간에 따라 핸디팟 운행 시간 또한 변경될 수
              있으며, 변경 시 문자로 안내드립니다.
            </li>
            <li>
              ★현장 상황에 따른 변동 사항은 환불 사유에 해당하지 않습니다.
              (출발시간 변경, 주차장 변경)
            </li>
          </ul>
        </article>
      </section>
      <section className="rounded-8 bg-basic-grey-50 p-16">
        <h5 className={TITLE_STYLE}>핸디팟 유의사항</h5>
        <div className="space-y-8">
          <article>
            <h6 className={SUB_TITLE_STYLE}>예약/결제</h6>
            <ul className={TEXT_STYLE}>
              <li>핸디팟 예약은 탑승 5일 전까지 가능합니다.</li>
              <li>
                다른 지역을 경유하는 노선으로 운행될 수 있으며, 소요시간이
                늘어날 수 있습니다. (★경유 및 시간 변경으로 인한 취소/환불 불가)
              </li>
              <li>
                ★최소 인원 미달로 인해 운행이 취소될 수 있으며, 운행 취소 시,
                탑승 4일 전까지 개별 안내드립니다.
              </li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>탑승</h6>
            <ul className={TEXT_STYLE}>
              <li>
                핸디팟 상품은 선택한 장소에서 탑승/하차가 가능합니다. (★단,
                회차가 어려운 이면도로, 주차장, 경로 우회가 큰 지역 등 운행이
                어렵다고 판단되는 장소는 인근으로 변경 될 수 있으며, 탑승 전까지
                변경된 위치를 안내드립니다.)
              </li>
              <li>
                탑승 전, 문자를 통해 탑승 시각과 출발/목적지 탑승 장소 위치를
                안내드립니다.
              </li>
              <li>본 셔틀 탑승권은 양도가 불가능합니다.</li>
              <li>고객 사유로 인한 미탑승 시 환불은 불가합니다.</li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>취소 및 환불 안내</h6>
            <ul className={TEXT_STYLE}>
              <li>
                운행 취소 시 공지 후 영업일 2일 이내로 전액 환불 처리됩니다.
              </li>
              <li>
                예약한 셔틀은 환불 신청 시점에 따라 수수료가 발생하거나 환불이
                불가할 수 있습니다.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ShuttleBusGuideline;
