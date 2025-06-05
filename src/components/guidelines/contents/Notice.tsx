const TITLE_STYLE = 'text-16 font-600 text-basic-black mb-8';
const SUB_TITLE_STYLE = 'text-14 font-600 text-basic-grey-700';
const TEXT_STYLE = 'text-14 font-400 text-basic-grey-600 list-disc pl-16';

const Notice = () => {
  return (
    <div className="space-y-24 leading-[160%]">
      <section>
        <h5 className={TITLE_STYLE}>[셔틀버스]</h5>
        <div className="space-y-12">
          <article>
            <h6 className={SUB_TITLE_STYLE}>예약/결제</h6>
            <ul className={TEXT_STYLE}>
              <li>
                셔틀버스 운행 여부는 탑승 14일 전까지 확정되며, 이미 예약 및
                결제가 가능한 셔틀은 모두 100% 운행됩니다.
              </li>
              <li>셔틀버스 예약은 탑승 5일 전까지 가능합니다.</li>
              <li>
                최소 인원 미달로 인해 경유 노선으로 운행될 수 있습니다. (경유로
                인한 취소/환불 불가)
              </li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>탑승</h6>
            <ul className={TEXT_STYLE}>
              <li>
                탑승 전, 핸디버스 채널톡을 통해 공지된 출발/목적지 탑승 장소
                위치를 반드시 확인하시고 시간 내에 탑승해주세요.
              </li>
              <li>
                반드시 예약하신 출발지/도착지에서 승하차 해주시기 바랍니다.
              </li>
              <li>
                현장 상황으로 인해 출발지/도착지가 변경될 수 있습니다. 이는
                노선별 오픈채팅방을 통해 소통이 가능합니다.
              </li>
              <li>좌석은 자유석이며, 선착순으로 탑승이 진행됩니다.</li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>운행</h6>
            <ul className={TEXT_STYLE}>
              <li>
                탑승자 대표인 &apos;핸디&apos;가 셔틀의 안전한 운행을 도와주는
                역할을 수행합니다. 핸디의 안내를 잘 따라주시기 바랍니다.
              </li>
              <li>운행 시간은 교통 상황에 따라 변경될 수 있습니다.</li>
              <li>
                핸디버스는 행사 일정에 연동되어 운행되는 서비스로, 행사의 지연
                및 연관 이벤트로 인한 탑승 시간이 변경 될 경우 취소/환불이
                불가합니다.
              </li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>취소 및 환불 안내</h6>
            <ul className={TEXT_STYLE}>
              <li>
                탑승 시간을 기준으로 환불 신청 시점에 따라 수수료가 발생합니다.
                정확한 탑승일은 예약 상세에서 확인할 수 있습니다.
              </li>
              <li>
                취소 수수료 발생 기간 내에는 행사 주최 측의 사정으로 행사가
                취소될 경우에만 전액 환불됩니다.
              </li>
              <li>시간대는 한국 기준으로 적용됩니다.</li>
              <div className="mt-12">
                <RefundTable />
              </div>
            </ul>
          </article>
        </div>
      </section>
      <section>
        <h5 className={TITLE_STYLE}>[핸디팟]</h5>
        <div className="space-y-12">
          <article>
            <h6 className={SUB_TITLE_STYLE}>예약/결제</h6>
            <ul className={TEXT_STYLE}>
              <li>핸디팟 예약은 탑승 2일 전까지 가능합니다.</li>
              <li>
                최소 인원 미달로 인해 예약이 취소되거나, 경유 노선으로 운행될 수
                있습니다. (경유로 인한 취소/환불 불가)
              </li>
              <li>
                예약이 취소되거나 경유 노선으로 진행되는 경우, 탑승 5일 전까지
                개별 안내드립니다. (인원 미달로 인한 예약 취소 시, 수수료 없이
                전액 자동 환불처리)
              </li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>탑승</h6>
            <ul className={TEXT_STYLE}>
              <li>
                핸디팟 상품은 예약한 지역 내, 상세 주소로 입력하신 장소에서
                탑승/하차가 가능합니다. (단, 회차가 어려운 이면도로, 주차장,
                경로 우회가 큰 지역 등 운행이 어렵다고 판단되는 장소는 인근으로
                변경 될 수 있으며, 탑승 전까지 변경된 위치를 안내드립니다.)
              </li>
              <li>
                탑승 전, 문자를 통해 공지된 출발/목적지 탑승 장소 위치를 반드시
                확인하시고 정해진 시간에 맞춰 탑승해주세요.
              </li>
              <li>
                반드시 예약하신 출발지/도착지에서 승하차 해주시기 바랍니다.
              </li>
              <li>
                현장 상황으로 인해 출발지/도착지가 조정될 수 있습니다. 이는
                오픈채팅방을 통해 소통이 가능합니다.
              </li>
              <li>
                원활한 공지를 위해 알림톡으로 발송 된 오픈채팅에 필수적으로
                입장해 주세요. 좌석은 자유석이며, 선착순으로 원하는 좌석에서
                탑승이 가능합니다.
              </li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>운행</h6>
            <ul className={TEXT_STYLE}>
              <li>운행 시간은 교통 상황에 따라 변경될 수 있습니다.</li>
              <li>
                핸디버스는 행사 일정에 연동되어 운행되는 서비스로, 행사의 지연
                및 연관 이벤트로 인한 탑승 시간이 변경 될 경우 취소/환불이
                불가합니다.
              </li>
              <li>차량 내에서 음식을 섭취는 자제해 주세요.</li>
              <li>
                셔틀 내의 고객 부주의로 인한 사고, 물품 분실, 도난 등 사건 등에
                대해서는 책임지지 않습니다.
              </li>
            </ul>
          </article>
          <article>
            <h6 className={SUB_TITLE_STYLE}>취소 및 환불 안내</h6>
            <ul className={TEXT_STYLE}>
              <li>
                탑승 시간을 기준으로 환불 신청 시점에 따라 수수료가 발생합니다.
                정확한 탑승일은 예약 상세에서 확인할 수 있습니다.
              </li>
              <li>
                운행 무산 시 공지 후 영업일 2일 이내로 전액 환불 처리됩니다.
              </li>
              <li>
                취소 수수료 발생 기간 내에는 행사 주최 측의 사정으로 행사가
                취소될 경우에만 전액 환불됩니다.
              </li>
              <li>시간대는 한국 기준으로 적용됩니다.</li>
              <div className="mt-12">
                <RefundTable />
              </div>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Notice;

const RefundTable = () => {
  return (
    <div className="overflow-hidden rounded-[5px] border border-basic-grey-300 text-12 text-basic-black">
      <table className="w-full border-collapse">
        <thead className="font-600 text-basic-grey-700">
          <tr className="bg-basic-grey-100 text-left">
            <th className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
              환불 신청 시점
            </th>
            <th className="border-b border-basic-grey-300 px-[10px] py-[6px]">
              수수료
            </th>
          </tr>
        </thead>
        <tbody className="bg-basic-white font-500 text-basic-grey-600">
          <tr className="text-basic-red-400">
            <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
              예약 24시간 이내
            </td>
            <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
              수수료 없음
            </td>
          </tr>
          <tr>
            <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
              ~ 탑승 8일 전 23:59
            </td>
            <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
              수수료 없음
            </td>
          </tr>
          <tr>
            <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
              ~ 탑승 7일 전 23:59
            </td>
            <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
              결제 금액의 25%
            </td>
          </tr>
          <tr>
            <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
              ~ 탑승 6일 전 23:59
            </td>
            <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
              결제 금액의 50%
            </td>
          </tr>
          <tr>
            <td className="border-r border-basic-grey-300 px-[10px] py-[6px]">
              탑승 5일 전 00:00 ~
            </td>
            <td className="px-[10px] py-[6px]">취소 / 환불 불가</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
