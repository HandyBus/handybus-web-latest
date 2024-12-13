interface Props {
  type: 'DEMAND_SURVEY' | 'SELECT_SHUTTLE';
  shuttle_date: string;
  shuttle_location: string;
}
const ShuttleDemandStatus = ({
  type,
  shuttle_date,
  shuttle_location,
}: Props) => {
  switch (type) {
    case 'DEMAND_SURVEY':
      return (
        <DemandSurvey
          shuttle_date={shuttle_date}
          shuttle_location={shuttle_location}
        />
      );
    case 'SELECT_SHUTTLE':
      return <SelectShuttle />;
  }
};

export default ShuttleDemandStatus;

interface DemandSurveyProps {
  shuttle_date: string;
  shuttle_location: string;
}
const DemandSurvey = ({
  shuttle_date,
  shuttle_location,
}: DemandSurveyProps) => {
  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          수요 신청한 사람들
        </h2>
        <p className="pb-16 pt-4 text-14 font-500 leading-[22.4px] text-grey-500">
          이번 콘서트를 위해{' '}
          <span className="text-grey-700">{shuttle_date}</span>에{' '}
          <span className="text-grey-700">{shuttle_location}</span>를 지나는
          셔틀에 대한 수요 신청 현황을 보여드려요.
        </p>
      </header>
      <section className="flex flex-col gap-12">
        <ShuttleCard type="DEMAND_SURVEY" highlighted={true} />
        <ShuttleCard type="DEMAND_SURVEY" />
        <ShuttleCard type="DEMAND_SURVEY" />
      </section>
    </article>
  );
};

const SelectShuttle = () => {
  return (
    <article className="px-16 py-24">
      <header className="flex flex-col gap-4 py-16">
        <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
          셔틀 예상 가격
        </h2>
      </header>
      <section className="flex flex-col gap-12">
        <ShuttleCard type="PREDICT_PRICE" highlighted={true} />
        <ShuttleCard type="PREDICT_PRICE" />
        <ShuttleCard type="PREDICT_PRICE" />
      </section>
    </article>
  );
};

const ShuttleCard = ({
  type,
  highlighted = false,
  // price,
}: {
  type?: 'PREDICT_PRICE' | 'DEMAND_SURVEY';
  highlighted?: boolean;
  price?: number;
}) => {
  if (type === 'PREDICT_PRICE')
    return (
      <div
        className={`flex items-center justify-between rounded-xl px-16 py-20 ${
          highlighted
            ? 'bg-gradient-to-r from-[#E5FFF8] to-transparent'
            : 'bg-[#F8F8F8]'
        }`}
      >
        <div>
          <span>
            <p className="text-16 font-600 leading-[25.6px] text-grey-800">
              왕복
            </p>
          </span>
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              충청북도 청주시 ↔ 잠실실내체육관
            </p>
          </span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            50,000
          </span>
          <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
            원
          </span>
        </div>
      </div>
    );

  if (type === 'DEMAND_SURVEY')
    return (
      <div
        className={`flex items-center justify-between rounded-xl px-16 py-20 ${
          highlighted
            ? 'bg-gradient-to-r from-[#E5FFF8] to-transparent'
            : 'bg-[#F8F8F8]'
        }`}
      >
        <div>
          <span>
            <p className="text-16 font-600 leading-[25.6px] text-grey-800">
              왕복
            </p>
          </span>
          <span>
            <p className="text-12 font-400 leading-[19.2px] text-grey-500">
              충청북도 청주시 ↔ 잠실실내체육관
            </p>
          </span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="text-24 font-700 leading-[38.4px] text-grey-900">
            1,128
          </span>
          <span className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
            명
          </span>
        </div>
      </div>
    );
};
