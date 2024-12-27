'use client';

import {
  ROUTE_TYPE,
  SECTION,
  SectionType,
  ShuttleRouteHubObject,
} from '@/types/shuttle.types';
import ShuttleRouteCard from './ShuttleRouteCard';
import { useFormContext } from 'react-hook-form';
import SpinnerIcon from '/public/icons/spinner.svg';
import { useEffect } from 'react';

/* ShuttleRouteVisualizer
 * useForm 과 연동되었습니다. controller 혹은 FormProvider 로 감싸고 control 을 인자로 넘겨주시면 됩니다.
 * 필드는 toDestinationHubId, fromDestinationHubId 를 사용합니다.
 * 마이페이지-셔틀에서 필요한 보기전용 모드에서 선택모드로 변경하시려면 section 을 RESERVATION_DETAIL 로 설정해주세요.
 *
 * 241227 업데이트
 * type prop으로 왕복행 / 콘서트행 / 귀가행 노선을 보여줄 수 있습니다.
 * 기존의 object prop대신 toDestinationObject, fromDestinationObject 를 사용합니다.
 * { arrivalTime, name, shuttleRouteHubId, sequence, selected? }[] 형태로 넘겨주세요.
 */
interface Props {
  // object: ShuttleRouteHubObject[];
  toDestinationObject?: ShuttleRouteHubObject[];
  fromDestinationObject?: ShuttleRouteHubObject[];
  section: SectionType;
  isLoading?: boolean;
  type?: 'ROUND_TRIP' | 'TO_DESTINATION' | 'FROM_DESTINATION';
}

const ShuttleRouteVisualizer = ({
  toDestinationObject,
  fromDestinationObject,
  section,
  isLoading = false,
  type = 'ROUND_TRIP',
}: Props) => {
  const formContext = useFormContext();

  const contextValue = {
    control:
      section === SECTION.RESERVATION_DETAIL ? formContext.control : null,
    setValue:
      section === SECTION.RESERVATION_DETAIL ? formContext.setValue : () => {},
  };

  const { control, setValue } = contextValue;

  useEffect(() => {
    if (setValue === (() => {})) return;

    const defaultToDestination = toDestinationObject?.find(
      (route) => route.selected,
    )?.shuttleRouteHubId;
    const defaultFromDestination = fromDestinationObject?.find(
      (route) => route.selected,
    )?.shuttleRouteHubId;

    if (defaultToDestination) {
      setValue('toDestinationHubId', defaultToDestination);
    }
    if (defaultFromDestination) {
      setValue('fromDestinationHubId', defaultFromDestination);
    }
  }, [toDestinationObject, fromDestinationObject, setValue]);

  if (isLoading)
    return (
      <div className="flex w-full items-center justify-center ">
        <SpinnerIcon
          className="animate-spin"
          viewBox="0 0 24 24"
          width={19.5}
          height={19.5}
        />
      </div>
    );
  return (
    <section className="flex flex-col gap-16 px-16 py-24">
      <header>
        <h2 className="text-22 font-700 leading-[30.8px]">셔틀 예상 노선</h2>
        <p className="text-14 font-500 leading-[22.4px] text-grey-500">
          예약 현황에 따라 추가 경유지가 발생하거나 시각이 변동될 수 있습니다.
        </p>
      </header>
      <section className="flex flex-col gap-40">
        {(type === 'ROUND_TRIP' || type === 'TO_DESTINATION') &&
          toDestinationObject &&
          toDestinationObject.length > 0 && (
            <ShuttleRouteCard
              section={section}
              type={ROUTE_TYPE.DEPARTURE}
              object={toDestinationObject}
              control={control}
              setValue={setValue}
            />
          )}
        {(type === 'ROUND_TRIP' || type === 'FROM_DESTINATION') &&
          fromDestinationObject &&
          fromDestinationObject.length > 0 && (
            <ShuttleRouteCard
              section={section}
              type={ROUTE_TYPE.RETURN}
              object={fromDestinationObject}
              control={control}
              setValue={setValue}
            />
          )}
      </section>
    </section>
  );
};

export default ShuttleRouteVisualizer;
