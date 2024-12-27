import { SECTION } from '@/types/shuttle.types';
import { RouteType, ROUTE_TYPE } from '@/types/shuttle.types';
import dayjs from 'dayjs';
import { ShuttleRouteHubObject } from '@/types/shuttle.types';
import { SectionType } from '@/types/shuttle.types';
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form';
import { RenderPoints } from './RoutePoint';
import ShuttleRouteTimeLocation from './ShuttleRouteTimeLocation';
import { isShuttleRouteLocationBlurred } from './shuttleRouteVisualizer.util';
interface Props {
  section: SectionType;
  type: RouteType;
  object: ShuttleRouteHubObject[];
  control: Control<FieldValues> | null;
  setValue: UseFormSetValue<FieldValues> | null;
}

const ShuttleRouteCard = ({
  section,
  type,
  object,
  control,
  setValue,
}: Props) => {
  const shuttleTime = dayjs(object[object.length - 1]?.arrivalTime).diff(
    dayjs(object[0]?.arrivalTime),
    'minutes',
  );
  const alignedObject = object.sort((a, b) => a.sequence - b.sequence);

  return (
    <article
      role="region"
      aria-label={`${type === ROUTE_TYPE.DEPARTURE ? '콘서트행' : '귀가행'} 셔틀 노선`}
      className="flex flex-col gap-12"
    >
      <h3 className="flex items-center justify-between text-16 font-700 leading-[22.4px]">
        {type === ROUTE_TYPE.DEPARTURE ? '콘서트행' : '귀가행'}
        {section === SECTION.RESERVATION_DETAIL && (
          <span className="text-12 font-400 leading-[19.2px] text-grey-500">
            선택
          </span>
        )}
      </h3>
      {type === ROUTE_TYPE.RETURN && section !== SECTION.RESERVATION_DETAIL && (
        <p className="text-12 font-400 leading-[19.2px] text-grey-500">
          귀가행 노선의 출발 시각은 콘서트 앵콜 종료 시각으로부터 약 30분 이후로
          책정하였으며, 변동될 수 있습니다.
        </p>
      )}
      <section className="flex w-full gap-12">
        <div
          aria-label={`${type === ROUTE_TYPE.DEPARTURE ? '콘서트행' : '귀가행'} 경로 표시`}
          className={`relative flex flex-col items-center ${type === ROUTE_TYPE.DEPARTURE ? 'pt-[6px]' : 'pb-[6px]'}`}
        >
          <hr
            className={`absolute h-[calc(100%-12px)] w-[2px] bg-${type === ROUTE_TYPE.DEPARTURE ? 'primary-main' : 'grey-500'} `}
          />
          <ol className="relative flex h-full flex-col items-center justify-between ">
            <RenderPoints object={alignedObject} type={type} />
          </ol>
        </div>
        <ul className="flex w-full flex-col gap-16">
          {alignedObject.map((item, index) => (
            <li key={index}>
              <ShuttleRouteTimeLocation
                isDestination={
                  type === ROUTE_TYPE.RETURN
                    ? index === 0
                    : index === object.length - 1
                }
                type={type}
                object={item}
                section={section}
                control={control}
                setValue={setValue}
                isBlurred={
                  section !== SECTION.SHUTTLE_DETAIL &&
                  isShuttleRouteLocationBlurred({
                    object: item,
                    type,
                    index,
                    length: object.length,
                  })
                }
              />
            </li>
          ))}
        </ul>
      </section>
      {section === SECTION.SHUTTLE_DETAIL ? null : section ===
        SECTION.RESERVATION_DETAIL ? (
        <p className="text-12 font-500 leading-[19.2px] text-grey-500">
          {type === ROUTE_TYPE.DEPARTURE
            ? '탑승장소를 선택해주세요'
            : '하차장소를 선택해주세요'}
        </p>
      ) : (
        <p className="text-12 font-500 leading-[19.2px] text-grey-500">
          {type === ROUTE_TYPE.DEPARTURE
            ? alignedObject[0]?.name
            : alignedObject[alignedObject.length - 1]?.name}
          {type === ROUTE_TYPE.DEPARTURE ? '까지 ' : '부터 '}
          <span className="font-600">약 {shuttleTime}분</span> 소요
        </p>
      )}
    </article>
  );
};

export default ShuttleRouteCard;
