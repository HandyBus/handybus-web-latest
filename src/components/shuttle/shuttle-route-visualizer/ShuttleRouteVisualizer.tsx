import {
  ROUTE_TYPE,
  RouteType,
  ShuttleRouteObject,
} from '@/types/shuttle.types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface Props {
  object: ShuttleRouteObject[];
}

const ShuttleRouteVisualizer = ({
  object = [
    { time: '2024-03-20 14:30:00', location: '청주터미널' },
    { time: '2024-03-20 14:40:00', location: '청주대학교' },
    { time: '2024-03-20 14:50:00', location: '장소3' },
    { time: '2024-03-20 15:00:00', location: '장소4' },
    { time: '2024-03-20 15:10:00', location: '장소5' },
    { time: '2024-03-20 15:20:00', location: '장소6' },
  ],
}: Props) => {
  return (
    <section className="flex flex-col gap-16 px-16 py-24">
      <header>
        <h2 className="text-22 font-700 leading-[30.8px]">셔틀 예상 노선</h2>
        <p className="text-14 font-500 leading-[22.4px] text-grey-500">
          예약 현황에 따라 추가 경유지가 발생하거나 시각이 변동될 수 있습니다.
        </p>
      </header>
      <section className="flex flex-col gap-40">
        <ShuttleRouteCard type={ROUTE_TYPE.DEPARTURE} object={object} />
        <ShuttleRouteCard type={ROUTE_TYPE.RETURN} object={object} />
      </section>
    </section>
  );
};

export default ShuttleRouteVisualizer;

interface ShuttleRouteCardProps {
  type: RouteType;
  object: ShuttleRouteObject[];
}

const ShuttleRouteCard = ({ type, object }: ShuttleRouteCardProps) => {
  const shuttleTime = dayjs(object[object.length - 1].time).diff(
    dayjs(object[0].time),
    'minutes',
  );

  const RenderPoints = () => {
    return object.map((_, index) => {
      if (type === ROUTE_TYPE.DEPARTURE) {
        return index === object.length - 1 ? (
          <ArrivalPoint type={type} />
        ) : (
          <CirclePoint type={type} />
        );
      } else {
        return index === 0 ? (
          <ArrivalPoint type={type} />
        ) : (
          <CirclePoint type={type} />
        );
      }
    });
  };

  const ShuttleRouteTimeLocation = ({
    object,
  }: {
    object: ShuttleRouteObject;
  }) => {
    return (
      <div className="flex gap-16">
        <p className="text-16 font-400 leading-[24px] text-grey-900">
          {dayjs(object.time).format('HH:mm')}
        </p>
        <p className="text-16 font-400 leading-[24px] text-grey-900">
          {object.location}
        </p>
      </div>
    );
  };

  return (
    <article
      role="region"
      aria-label={`${type === ROUTE_TYPE.DEPARTURE ? '콘서트행' : '귀가행'} 셔틀 노선`}
      className="flex flex-col gap-12"
    >
      <h3 className="text-16 font-700 leading-[22.4px]">
        {type === ROUTE_TYPE.DEPARTURE ? '콘서트행' : '귀가행'}
      </h3>
      {type === ROUTE_TYPE.DEPARTURE ? null : (
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          귀가행 노선의 출발 시각은 콘서트 앵콜 종료 시각으로부터 약 30분 이후로
          책정하였으며, 변동될 수 있습니다.
        </p>
      )}
      <section className="flex gap-12">
        <div
          aria-label={`${type === ROUTE_TYPE.DEPARTURE ? '콘서트행' : '귀가행'} 경로 표시`}
          className={`relative flex flex-col items-center ${type === ROUTE_TYPE.DEPARTURE ? 'pt-[6px]' : 'pb-[6px]'}`}
        >
          <hr
            className={`absolute h-[calc(100%-12px)] w-[2px] bg-${type === ROUTE_TYPE.DEPARTURE ? 'primary-main' : 'grey-500'} `}
          />
          <ol className="relative flex h-full flex-col items-center justify-between ">
            {RenderPoints()}
          </ol>
        </div>
        <ul className="flex flex-col gap-16">
          {object.map((item, index) => (
            <li key={index}>
              <ShuttleRouteTimeLocation object={item} />
            </li>
          ))}
        </ul>
      </section>
      <p className="text-12 font-500 leading-[19.2px] text-grey-500">
        {type === ROUTE_TYPE.DEPARTURE
          ? object[0].location
          : object[object.length - 1].location}
        {type === ROUTE_TYPE.DEPARTURE ? '까지 ' : '부터 '}
        <span className="font-600">약 {shuttleTime}분</span> 소요
      </p>
    </article>
  );
};

const CirclePoint = ({ type }: { type: RouteType }) => {
  return (
    <div
      className={`h-12 w-12 rounded-full border-[2px] border-${type === ROUTE_TYPE.DEPARTURE ? 'primary-main' : 'grey-500'} bg-white`}
    />
  );
};

const ArrivalPoint = ({ type }: { type: RouteType }) => {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full bg-${type === ROUTE_TYPE.DEPARTURE ? 'primary-main' : 'grey-500'}`}
    >
      <span className="text-[8px] font-700 leading-[9.55px] text-white">
        {type === ROUTE_TYPE.DEPARTURE ? '도착' : '출발'}
      </span>
    </div>
  );
};
