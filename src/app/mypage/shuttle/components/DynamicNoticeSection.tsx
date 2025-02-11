import { Dayjs } from 'dayjs';

interface Props {
  dDay?: Dayjs;
  refundFee?: number;
}

export const DynamicCancellationAndRefundContent = ({
  dDay,
  refundFee,
}: Props) => {
  return (
    <section className="flex flex-col gap-16">
      <ul className="list-disc space-y-8 pl-16 text-14 font-400 leading-[22.4px] text-grey-500 ">
        <li>탑승일 기준으로 환불 신청 시점에 따라 수수료가 발생합니다.</li>
        <li>
          취소 수수료 발생 기간 내 행사 주최 측의 사정으로 행사가 취소될
          경우에만 전액 환불됩니다.
        </li>
      </ul>

      <section className="overflow-hidden rounded-[5px] border border-grey-300 text-grey-500">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-grey-100 text-left text-grey-700">
              <th className="border-b border-r border-grey-300 p-12">
                환불 신청 시점
              </th>
              <th className="border-b border-grey-300 p-12 text-left">
                수수료
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-r border-grey-300 p-12">
                당일 취소
              </td>
              <td className="border-b border-grey-300 p-12">수수료 없음</td>
            </tr>
            <tr>
              <td className="border-b border-r border-grey-300 p-12">
                {dDay
                  ? `~ ${dDay.subtract(8, 'day').format('YYYY.MM.DD')} 23:59 이전`
                  : '~ 탑승 D-8 23:59'}
              </td>
              <td className="border-b border-grey-300 p-12">수수료 없음</td>
            </tr>
            <tr>
              <td className="border-b border-r border-grey-300 p-12">
                {dDay
                  ? `~ ${dDay.subtract(7, 'day').format('YYYY.MM.DD')} 23:59 이전`
                  : '~ 탑승 D-7 23:59'}
              </td>
              <td className="border-b border-grey-300 p-12">결제 금액의 25%</td>
            </tr>
            <tr>
              <td className="border-b border-r border-grey-300 p-12">
                {dDay
                  ? `~ ${dDay.subtract(6, 'day').format('YYYY.MM.DD')} 23:59 이전`
                  : '~ 탑승 D-6 23:59'}
              </td>
              <td className="border-b border-grey-300 p-12">결제 금액의 50%</td>
            </tr>
            <tr>
              <td className="border-r border-grey-300 p-12">
                {dDay
                  ? `${dDay.subtract(5, 'day').format('YYYY.MM.DD')} 00:00 ~`
                  : '탑승 D-5 00:00 ~'}
              </td>
              <td className="p-12">취소 / 환불 불가</td>
            </tr>
          </tbody>
        </table>
      </section>

      {dDay && (
        <p className="flex items-center justify-center rounded-[4px] bg-grey-50 p-8 text-14 font-700 leading-[18px] text-red-500">
          취소 수수료: {refundFee}원
        </p>
      )}
    </section>
  );
};
