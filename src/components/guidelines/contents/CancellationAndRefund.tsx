// 취소 및 환불 안내

const CancellationAndRefund = () => {
  return (
    <>
      <ul className="mb-16 list-disc pl-16 text-14 font-400 leading-[22.4px] text-basic-grey-600 ">
        <li>
          탑승 시간을 기준으로 환불 신청 시점에 따라 수수료가 발생합니다. 정확한
          탑승일은 예약 상세에서 확인할 수 있습니다.
        </li>
        <li>
          취소 수수료 발생 기간 내 행사 주최 측의 사정으로 행사가 취소될
          경우에만 전액 환불됩니다.
        </li>
        <li>시간대는 한국 기준으로 적용됩니다.</li>
      </ul>

      <section className="overflow-hidden rounded-[5px] border border-basic-grey-300 text-12 text-basic-black">
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
          <tbody className="font-500 text-basic-grey-600">
            <tr>
              <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
                예약 24시간 이내
              </td>
              <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
                수수료 없음
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
                ~ 탑승 D-8 23:59
              </td>
              <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
                수수료 없음
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
                ~ 탑승 D-7 23:59
              </td>
              <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
                결제 금액의 25%
              </td>
            </tr>
            <tr>
              <td className="border-b border-r border-basic-grey-300 px-[10px] py-[6px]">
                ~ 탑승 D-6 23:59
              </td>
              <td className="border-b border-basic-grey-300 px-[10px] py-[6px]">
                결제 금액의 50%
              </td>
            </tr>
            <tr>
              <td className="border-r border-basic-grey-300 px-[10px] py-[6px]">
                탑승 D-5 00:00 ~
              </td>
              <td className="px-[10px] py-[6px]">취소 / 환불 불가</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default CancellationAndRefund;
