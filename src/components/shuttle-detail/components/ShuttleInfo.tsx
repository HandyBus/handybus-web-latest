import ShuttleStatusChip from '@/components/chips/shuttle-status-chip/ShuttleStatusChip';

interface Props {
  shuttleStatus:
    | 'DEMAND_SURVEY'
    | 'SURVEY_CLOSED'
    | 'PENDING'
    | 'RESERVATION_CLOSED'
    | 'ENDED'
    | undefined;
  title: string;
  artist: string;
  date: string;
  location: string;
}
const ShuttleInfo = ({
  shuttleStatus,
  title,
  artist,
  date,
  location,
}: Props) => {
  return (
    <article className="px-16 py-24">
      <ShuttleStatusChip status={shuttleStatus} />
      <h1 className="pb-24 pt-8 text-24 font-700 leading-[33.6px] text-grey-900">
        {title}
      </h1>
      <dl className="info-list">
        <Badge label="아티스트" value={artist} />
        <Badge label="일자" value={date} />
        <Badge label="장소" value={location} />
      </dl>
    </article>
  );
};

const Badge = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-12">
      <dt className="h-[21px] w-72 rounded-xl border border-grey-100 text-center text-12 font-500 leading-[21px] text-grey-600">
        {label}
      </dt>
      <dd className="text-14 font-400 leading-[22.4px] text-grey-600-sub">
        {value}
      </dd>
    </div>
  );
};

export default ShuttleInfo;
