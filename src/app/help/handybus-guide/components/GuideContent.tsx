import { TabValue } from '../page';

interface Props {
  currentTab: TabValue;
}

const GuideContent = ({ currentTab }: Props) => {
  const stepsList =
    currentTab === 'SHUTTLE_BUS'
      ? HANDYBUS_GUIDE_STEPS
      : HANDYPARTY_GUIDE_STEPS;

  return (
    <section className="mt-40 flex flex-col gap-24 pb-[62px] pt-40">
      {stepsList.map((item, index) => (
        <GuideItem
          key={item.order}
          {...item}
          isLast={index === stepsList.length - 1}
          tabType={currentTab}
        />
      ))}
    </section>
  );
};

export default GuideContent;

interface GuideItemProps {
  order: number;
  category: string;
  title: string;
  description: string;
  isLast: boolean;
  tabType: TabValue;
}

const GuideItem = ({
  order,
  category,
  title,
  description,
  isLast,
  tabType,
}: GuideItemProps) => {
  const colorClasses = {
    circleText:
      tabType === 'SHUTTLE_BUS' ? 'text-brand-primary-400' : 'text-[#6A98E3]',
    categoryText:
      tabType === 'SHUTTLE_BUS' ? 'text-brand-primary-400' : 'text-[#6A98E3]',
    line:
      tabType === 'SHUTTLE_BUS'
        ? 'border-basic-mint-500'
        : 'border-basic-blue-600',
  };

  return (
    <div className="flex gap-28">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-full ${colorClasses.circleText}`}
        >
          <span
            className={`${colorClasses.categoryText} rounded-[8px]
           bg-basic-grey-100 px-8 text-18 font-600 leading-[160%]`}
          >
            {order}
          </span>
        </div>
        {/* 세로 연결선 */}
        {!isLast && (
          <div
            className={`-mb-16 mt-8 w-[2px] flex-1 border-basic-grey-100 bg-basic-grey-100`}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <div>
          <p
            className={`text-10 font-600 leading-[160%]  ${colorClasses.categoryText}`}
          >
            {category}
          </p>
          <h3 className="text-18 font-600 leading-[140%]">{title}</h3>
        </div>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
          {description}
        </p>
      </div>
    </div>
  );
};

const HANDYBUS_GUIDE_STEPS = [
  {
    order: 1,
    category: '요청하기',
    title: '수요조사 참여',
    description:
      '셔틀 오픈 알림을 위해 수요조사에 참여하세요. 수요조사는 행사 15일 전에 마감돼요.',
  },
  {
    order: 2,
    category: '확인하기',
    title: '셔틀 오픈 알림',
    description: '요청한 지역의 셔틀 개설 여부를 알려드려요.',
  },
  {
    order: 3,
    category: '결제하기',
    title: '예약하기',
    description:
      '셔틀이 열리면 마감 전 예약을 진행하세요. 셔틀버스 예약은 행사 5일 전까지 가능해요.',
  },
  {
    order: 4,
    category: '최종 안내',
    title: '운행 확정 알림',
    description:
      '행사 7일 전, 최종 운행 여부를 알려드려요. 최종 확정된 셔틀은 100% 운행해요.',
  },
];

const HANDYPARTY_GUIDE_STEPS = [
  {
    order: 1,
    category: '요청하기',
    title: '수요조사 참여',
    description:
      '셔틀버스와 동일한 방법으로 참가할 수 있어요. 수요조사는 행사 15일 전에 마감돼요.',
  },
  {
    order: 2,
    category: '확인하기',
    title: '셔틀 오픈 알림',
    description:
      '오픈 여부는 신청한 정류장의 셔틀 유형과 무관하게 안내드리고 있어요.',
  },
  {
    order: 3,
    category: '결제하기',
    title: '예약하기',
    description:
      '핸디팟을 선택 후, 주소지를 입력하세요. 핸디팟 예약은 행사 6일 전까지 가능해요.',
  },
  {
    order: 4,
    category: '최종 안내',
    title: '운행 확정 알림',
    description:
      '행사 5일 전, 최종 운행 여부를 알려드려요. 최종 확정된 셔틀은 100% 운행해요.',
  },
];
