import { Dayjs } from 'dayjs';
import DetailRow from '../DetailRow';
import Section from '../Section';

interface Props {
  requestedDate: Dayjs | null | undefined;
  resolvedDate: Dayjs | null | undefined;
  price: number;
  refundPrice: number;
}

const RefundInfoSection = ({
  requestedDate,
  resolvedDate,
  price,
  refundPrice,
}: Props) => {
  return (
    <>
      <Section title="취소 신청 정보">
        <div className="flex flex-col gap-8">
          <DetailRow
            title="신청 일시"
            content={requestedDate?.format('YYYY. MM. DD. HH:mm:ss') ?? ''}
          />
          <DetailRow
            title="완료 일시"
            content={resolvedDate?.format('YYYY. MM. DD. HH:mm:ss') ?? ''}
          />
        </div>
      </Section>
      <Section title="환불 정보">
        <div className="flex flex-col gap-8 text-basic-grey-700">
          <div className="flex w-full gap-4">
            <div>결제 금액</div>
            <div className="grow text-right">{price.toLocaleString()}원</div>
          </div>
          <div className="flex w-full gap-4">
            <div>수수료</div>
            <div className="grow text-right">
              -{(price - refundPrice).toLocaleString()}원
            </div>
          </div>
          <div className="flex w-full gap-4 pt-24">
            <div className="text-18">환불 금액</div>
            <div className="grow text-right text-22 font-600">
              {refundPrice.toLocaleString()}원
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default RefundInfoSection;
