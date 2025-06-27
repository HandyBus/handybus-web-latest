import { RefundRequestsInPaymentsViewEntity } from '@/types/payment.type';
import ArrowDownwardTipRightIcon from '../icons/arrow-downward-tip-right.svg';
import { dateString } from '@/utils/dateString.util';
import InfoIcon from 'public/icons/info.svg';

const REFUND_INFO_TEXT = '수수료 정책에 따라 수수료가 제외된 금액입니다.';

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
      <li className="flex h-[22px] w-full items-center justify-between">
        <span className="flex items-center gap-4 text-14 font-400 text-basic-red-300">
          <ArrowDownwardTipRightIcon /> 결제 취소
        </span>
        <span className="text-14 font-400 text-basic-red-300">
          {totalRefundAmount?.toLocaleString()}원
        </span>
      </li>
      <div className="my-16 h-[1px] w-full bg-basic-grey-100" />
      <div className="flex h-[22px] w-full items-center justify-between">
        <div className="flex items-center gap-[2px] text-14 font-600">
          <p>환불 총액</p>
          <RefundInfoTooltip content={REFUND_INFO_TEXT} />
        </div>
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
                환불 일시 |{' '}
                {dateString(refundRequest.refundAt, {
                  showYear: true,
                  showDate: true,
                  showWeekday: false,
                  showTime: true,
                })}
              </span>
              <span>{refundRequest.refundAmount.toLocaleString()}원</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RefundRequestList;

interface RefundInfoTooltipProps {
  content: string;
}

const RefundInfoTooltip = ({ content }: RefundInfoTooltipProps) => {
  return (
    <div className="group relative inline-flex cursor-pointer">
      <InfoIcon />
      <div className="absolute top-full hidden w-max max-w-188 break-keep rounded-6 bg-basic-grey-50 p-8 text-12 font-500 leading-[160%] text-basic-grey-500 group-hover:inline">
        {content}
      </div>
    </div>
  );
};
