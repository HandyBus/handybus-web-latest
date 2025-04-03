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
          탑승 시간을 기준으로 환불 신청 시점에 따라 수수료가 발생합니다. 정확한
          탑승일은 예약 상세에서 확인할 수 있습니다.
        </li>
        <li>
          취소 수수료 발생 기간 내 행사 주최 측의 사정으로 행사가 취소될
          경우에만 전액 환불됩니다.
        </li>
        <li>시간대는 한국 기준으로 적용됩니다.</li>
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
                예약 24시간 이내
              </td>
              <td className="border-b border-grey-300 p-12">수수료 없음</td>
            </tr>
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
            핸디버스는 셔틀 노선의 <strong>판매 중개자</strong>이며, 실제 운행은
            각 운송업체에서 제공합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-700">예약/결제</h3>
        <ul className="list-disc pl-16">
          <li>셔틀 예약은 출발일 기준 4일 전(D-4)까지 가능합니다.</li>
          <li>예약 중인 모든 셔틀은 확정 운행됩니다.</li>
          <li>
            자연재해 혹은 주최 측의 사정으로 인해 행사가 취소될 경우, 운행이
            무산될 수 있습니다. 이 경우, 3영업일 이내로 전액 환불해 드립니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-700">탑승</h3>
        <ul className="list-disc pl-16">
          <li>
            탑승 전 핸디버스 채널 알림톡 공지를 통해 출발지/목적지의 탑승 장소를
            꼭 확인하시고, 정해진 시간 내에 탑승해 주시기 바랍니다.
          </li>
          <li>반드시 예약하신 출발지/도착지에서 승하차해 주시기 바랍니다.</li>
          <li>
            현장 상황으로 인해 출발지/도착지가 조정될 수 있으며, 이는 노선별
            오픈채팅방을 통해 확인하실 수 있습니다. 변경에 따른 환불은
            불가능합니다.
          </li>
          <li>
            셔틀 티켓은 양도가 불가능하며, 양도 티켓 이용 시 승차가 거부될 수
            있습니다.
          </li>
          <li>모든 좌석은 자유석으로 운행됩니다.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-700">운행</h3>
        <ul className="list-disc pl-16">
          <li>
            탑승 도우미인 &apos;핸디&apos;가 셔틀 운행 시 안전한 운행을 돕고
            있습니다. 원활한 이용을 위해 안내를 잘 따라주시기 바랍니다.
          </li>
          <li>
            운행 시간은 교통 상황, 현장 상황에 따라 변경될 수 있으며, 이에 따른
            환불은 불가능합니다.
          </li>
          <li>
            귀가행 탑승 시간은 행사 종료 후 1시간 이내입니다. 당일 공연 상황을
            모두 고려하여 탑승 시간을 제공해 드리고 있으니, 안심하고 관람하실 수
            있습니다.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-700">기타</h3>
        <ul className="list-disc pl-16">
          <li>차량 내에서 음식물 섭취는 금지되어 있습니다.</li>
          <li>
            하차 시, 개인 물품 보관이 불가하니 모두 들고 내려주시길 바랍니다.
          </li>
          <li>
            셔틀 내 개인의 부주의로 발생한 문제에 대해서는 책임지지 않습니다.
          </li>
        </ul>
      </section>
    </>
  );
};
