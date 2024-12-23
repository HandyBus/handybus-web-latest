'use client';

import {
  ROUTE_TYPE,
  SECTION,
  SectionType,
  ShuttleRouteObject,
} from '@/types/shuttle.types';
import ShuttleRouteCard from './ShuttleRouteCard';
import { useFormContext } from 'react-hook-form';

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
