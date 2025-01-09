import ChevronRightIcon from 'public/icons/chevron-right.svg';
import { ReactNode } from 'react';

export const NOTICE_TYPE = {
  CANCELLATION_AND_REFUND: 'cancellation-and-refund',
  TERM_AND_CONDITION: 'term-and-condition',
} as const;

export type NoticeType = (typeof NOTICE_TYPE)[keyof typeof NOTICE_TYPE];

interface Props {
  type: NoticeType;
  noPadding?: boolean;
}

const NoticeSection = ({ type, noPadding = false }: Props) => {
  return (
    <details
      className={`group flex flex-col gap-16 ${
        noPadding ? '' : 'p-16'
      } [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden`}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-800">
          {type === NOTICE_TYPE.CANCELLATION_AND_REFUND
            ? '취소 및 환불 안내'
            : '유의사항'}
        </h2>
        <span className="rotate-90 group-open:rotate-[-90deg] ">
          <ChevronRightIcon />
        </span>
      </summary>
      {type === NOTICE_TYPE.CANCELLATION_AND_REFUND ? (
        <Wrapper>
          <CancellationAndRefundContent />
        </Wrapper>
      ) : (
        <Wrapper className="text-14 font-400 leading-[22.4px] text-grey-500">
          <TermAndConditionContent />
        </Wrapper>
      )}
    </details>
  );
};

export default NoticeSection;

const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <article className="pt-16">
      <section className={`rounded-[10px] bg-grey-50 p-16 ${className}`}>
        {children}
      </section>
    </article>
  );
};

export const CancellationAndRefundContent = () => {
  return (
    <>
      <ul className="mb-16 list-disc space-y-8 pl-16 text-14 font-400 leading-[22.4px] text-grey-500 ">
        <li>
          예약한 셔틀의 출발일자/시간을 기준으로 환불 신청 시점에 따라 수수료가
          발생합니다.
        </li>
        <li>
          결제 당일 취소 시, 23:59까지 무료 취소 가능합니다(당일 탑승 건 제외,
          개별 채널톡 문의)
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
                ~ 탑승 D-8 23:59
              </td>
              <td className="border-b border-grey-300 p-12">수수료 없음</td>
            </tr>
            <tr>
              <td className="border-b border-r border-grey-300 p-12">
                ~ 탑승 D-7 23:59
              </td>
              <td className="border-b border-grey-300 p-12">결제 금액의 25%</td>
            </tr>
            <tr>
              <td className="border-b border-r border-grey-300 p-12">
                ~ 탑승 D-6 23:59
              </td>
              <td className="border-b border-grey-300 p-12">결제 금액의 50%</td>
            </tr>
            <tr>
              <td className="border-r border-grey-300 p-12">
                탑승 D-5 00:00 ~
              </td>
              <td className="p-12">취소 / 환불 불가</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export const TermAndConditionContent = () => {
  return (
    <>
      <section>
        <h3 className="font-700">문의</h3>
        <ul className="list-disc pl-16">
          <li>
            핸디버스는 본 셔틀 노선의 판매 중개자로, 직접 제공자는 각 운송업체에
            있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-700">예약/결제</h3>
        <ul className="list-disc pl-16">
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
      </section>

      <section>
        <h3 className="font-700">탑승</h3>
        <ul className="list-disc pl-16">
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
      </section>

      <section>
        <h3 className="font-700">운행</h3>
        <ul className="list-disc pl-16">
          <li>
            탑승자 대표인 &apos;핸디&apos;가 셔틀 운행 시 안전한 운행을 도와주는
            역할을 수행합니다. 핸디의 안내를 잘 따라주시기 바랍니다.
          </li>
          <li>운행 시간은 교통 상황에 따라 변경될 수 있습니다.</li>
          <li>행사 지연으로 인한 탑승 시간 변경은 취소/환불 불가합니다.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-700">기타</h3>
        <ul className="list-disc pl-16">
          <li>차량 내에서 음식을 섭취는 자제해주세요.</li>
          <li>
            셔틀 내의 분실 부주의로 인한 사고, 도난, 사건 등에 책임지지
            않습니다.
          </li>
        </ul>
      </section>
    </>
  );
};
