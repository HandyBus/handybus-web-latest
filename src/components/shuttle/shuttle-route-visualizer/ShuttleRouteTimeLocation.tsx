import { Controller } from 'react-hook-form';
import { SECTION } from '@/types/shuttle.types';
import { RouteType } from '@/types/shuttle.types';
import { HubType } from '@/types/hub.type';
import { Control, UseFormSetValue } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import { SectionType } from '@/types/shuttle.types';
import { ROUTE_TYPE } from '@/types/shuttle.types';
import dayjs from 'dayjs';

interface Props {
  isDestination: boolean;
  type: RouteType;
  object: HubType;
  isBlurred: boolean;
  section: SectionType;
  control?: Control<FieldValues> | null;
  setValue?: UseFormSetValue<FieldValues> | null;
}

const ShuttleRouteTimeLocation = ({
  isDestination,
  type,
  object,
  isBlurred,
  section,
  control,
  setValue,
}: Props) => {
  const fieldName =
    type === ROUTE_TYPE.DEPARTURE
      ? 'toDestinationHubId'
      : 'fromDestinationHubId';

  return (
    <div className="flex w-full justify-between ">
      <div className="flex items-center gap-16 ">
        <p className="w-[36px] flex-shrink-0 text-12 font-400 leading-[19.2px] text-grey-600-sub">
          {dayjs(object.arrivalTime).format('HH:mm')}
        </p>
        <p
          className={`text-16 font-400 leading-[24px] ${
            section === SECTION.MY_RESERVATION && isBlurred
              ? 'text-grey-300'
              : 'text-grey-900'
          }`}
        >
          {object.name}
        </p>
      </div>
      {section === SECTION.RESERVATION_DETAIL &&
        control &&
        setValue &&
        !isDestination && (
          <Controller
            control={control}
            name={fieldName}
            render={({ field }) => (
              <input
                {...field}
                type="radio"
                id={`${type}-${fieldName}-${object.shuttleRouteHubId}`}
                value={`${object.shuttleRouteHubId}`}
                checked={
                  String(field.value) === String(`${object.shuttleRouteHubId}`)
                }
                onChange={(e) => {
                  field.onChange(e);
                  setValue(fieldName, Number(e.target.value));
                }}
                className="h-20 w-20 cursor-pointer accent-grey-800"
              />
            )}
          />
        )}
    </div>
  );
};

export default ShuttleRouteTimeLocation;
