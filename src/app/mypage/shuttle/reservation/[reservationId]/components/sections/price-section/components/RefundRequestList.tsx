import { RefundRequestsInPaymentsViewEntity } from '@/types/payment.type';
import ArrowDownwardTipRightIcon from '../icons/arrow-downward-tip-right.svg';
import { dateString } from '@/utils/dateString.util';

interface Props {
  refundRequests: RefundRequestsInPaymentsViewEntity[] | null;
}

const RefundRequestList = ({ refundRequests }: Props) => {
  const totalRefundAmount = refundRequests?.reduce((acc, curr) => {
    return acc + curr.refundAmount;
  }, 0);

  if (!refundRequests || refundRequests.length === 0) return;
  return (
    <>
      <div className="my-16 h-[1px] w-full bg-basic-grey-100" />
      <div className="flex h-[22px] w-full items-center justify-between">
        <span className="text-14 font-600">환불 총액</span>
        <span className="text-14 font-600 text-basic-red-400">
          {totalRefundAmount?.toLocaleString()}원
        </span>
      </div>
      <ul className="mt-8 flex flex-col gap-8">
        {refundRequests.map((refundRequest) => (
          <li
            className="flex flex-col gap-4 text-14 font-400 text-basic-grey-500"
            key={refundRequest.refundRequestId}
          >
            <div className="flex w-full items-center justify-between">
              <span className="flex items-center gap-4">
                <ArrowDownwardTipRightIcon />
                환불 사유 | {refundRequest.refundReason}
              </span>
              <span>{refundRequest.refundAmount.toLocaleString()}원</span>
            </div>
            <span className="flex items-center gap-4 pl-16 text-14 font-400 text-basic-grey-500">
              <ArrowDownwardTipRightIcon />
              환불 일시 |{' '}
              {dateString(refundRequest.refundAt, {
                showYear: true,
                showDate: true,
                showWeekday: false,
                showTime: true,
              })}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RefundRequestList;
