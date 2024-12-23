'use client';

import {
  ROUTE_TYPE,
  RouteType,
  SECTION,
  SectionType,
  ShuttleRouteObject,
} from '@/types/shuttle.types';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import {
  Control,
  Controller,
  useFormContext,
  UseFormSetValue,
} from 'react-hook-form';
import { FieldValues } from 'react-hook-form';

/* ShuttleRouteVisualizer
 * useForm 과 연동되었습니다. controller로 감싸고 control 을 인자로 넘겨주시면 됩니다.
 * 필드는 pickupHubID, dropoffHubID 를 사용합니다.
 * 마이페이지-셔틀에서 필요한 보기전용 모드에서 선택모드로 변경하시려면 section 을 RESERVATION_DETAIL 로 설정해주세요.
 */
interface Props {
  object: ShuttleRouteObject[];
  section: SectionType;
}

const ShuttleRouteVisualizer = ({ object, section }: Props) => {
  const formContext = useFormContext();

  const contextValue = {
    control:
      section === SECTION.RESERVATION_DETAIL ? formContext.control : null,
    setValue:
      section === SECTION.RESERVATION_DETAIL ? formContext.setValue : () => {},
  };

  const { control, setValue } = contextValue;

  return (
    <section className="flex flex-col gap-16 px-16 py-24">
      <header>
        <h2 className="text-22 font-700 leading-[30.8px]">셔틀 예상 노선</h2>
        <p className="text-14 font-500 leading-[22.4px] text-grey-500">
          예약 현황에 따라 추가 경유지가 발생하거나 시각이 변동될 수 있습니다.
        </p>
      </header>
      <section className="flex flex-col gap-40">
        <ShuttleRouteCard
          section={section}
          type={ROUTE_TYPE.DEPARTURE}
          object={object}
          control={control}
          setValue={setValue}
        />
        <ShuttleRouteCard
          section={section}
          type={ROUTE_TYPE.RETURN}
          object={object}
          control={control}
          setValue={setValue}
        />
      </section>
    </section>
  );
};

export default ShuttleRouteVisualizer;

interface ShuttleRouteCardProps {
  section: SectionType;
  type: RouteType;
  object: ShuttleRouteObject[];
  control: Control<FieldValues> | null;
  setValue: UseFormSetValue<FieldValues> | null;
}

const ShuttleRouteCard = ({
  section,
  type,
  object,
  control,
  setValue,
}: ShuttleRouteCardProps) => {
  const shuttleTime = dayjs(object[object.length - 1]?.time).diff(
    dayjs(object[0]?.time),
    'minutes',
  );

  const RenderPoints = () => {
    return object?.map((_, index) => {
      if (type === ROUTE_TYPE.DEPARTURE) {
        return index === object?.length - 1 ? (
          <ArrivalPoint key={index} type={type} />
        ) : (
          <CirclePoint key={index} type={type} />
        );
      } else {
        return index === 0 ? (
          <ArrivalPoint key={index} type={type} />
        ) : (
          <CirclePoint key={index} type={type} />
        );
      }
    });
  };

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
            {RenderPoints()}
          </ol>
        </div>
        <ul className="flex w-full flex-col gap-16">
          {object.map((item, index) => (
            <li key={index}>
              <ShuttleRouteTimeLocation
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
            ? object[0]?.hubName
            : object[object.length - 1]?.hubName}
          {type === ROUTE_TYPE.DEPARTURE ? '까지 ' : '부터 '}
          <span className="font-600">약 {shuttleTime}분</span> 소요
        </p>
      )}
    </article>
  );
};

const CirclePoint = ({ type }: { type: RouteType }) => {
  return (
    <div
      className={`h-12 w-12 rounded-full border-[2px] ${type === ROUTE_TYPE.DEPARTURE ? 'border-primary-main' : 'border-grey-500'} bg-white`}
    />
  );
};

const ArrivalPoint = ({ type }: { type: RouteType }) => {
  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded-full ${type === ROUTE_TYPE.DEPARTURE ? 'bg-primary-main' : 'bg-grey-500'}`}
    >
      <span className="text-[8px] font-700 leading-[9.55px] text-white">
        {type === ROUTE_TYPE.DEPARTURE ? '도착' : '출발'}
      </span>
    </div>
  );
};

const isShuttleRouteLocationBlurred = ({
  object,
  type,
  index,
  length,
}: {
  object: ShuttleRouteObject;
  type: RouteType;
  index: number;
  length: number;
}) => {
  if (type === ROUTE_TYPE.DEPARTURE)
    return !(index === length - 1 || object.isPickup);
  if (type === ROUTE_TYPE.RETURN) return !(index === 0 || object.isDropoff);
  return false;
};

interface ShuttleRouteTimeLocationProps {
  type: RouteType;
  object: ShuttleRouteObject;
  isBlurred: boolean;
  section: SectionType;
  control?: Control<FieldValues> | null;
  setValue?: UseFormSetValue<FieldValues> | null;
}

const ShuttleRouteTimeLocation = ({
  type,
  object,
  isBlurred,
  section,
  control,
  setValue,
}: ShuttleRouteTimeLocationProps) => {
  const fieldName =
    type === ROUTE_TYPE.DEPARTURE ? 'pickupHubID' : 'dropoffHubID';

  return (
    <div className="flex w-full justify-between ">
      <div className="flex items-center gap-16 ">
        <p className="text-12 font-400 leading-[19.2px] text-grey-600-sub">
          {dayjs(object.time).format('HH:mm')}
        </p>
        <p
          className={`text-16 font-400 leading-[24px] ${
            section === SECTION.MY_RESERVATION && isBlurred
              ? 'text-grey-300'
              : 'text-grey-900'
          }`}
        >
          {object.hubName}
        </p>
      </div>
      {section === SECTION.RESERVATION_DETAIL && control && setValue && (
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => (
            <input
              {...field}
              type="radio"
              id={`${type}-${fieldName}-${object.hubId}`}
              value={`${object.hubId}`}
              checked={field.value === `${object.hubId}`}
              onChange={(e) => {
                field.onChange(e);
                setValue(fieldName, e.target.value);
              }}
              className="h-20 w-20 cursor-pointer accent-grey-800"
            />
          )}
        />
      )}
    </div>
  );
};
