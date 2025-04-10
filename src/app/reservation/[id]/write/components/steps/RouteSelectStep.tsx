import Select from '@/components/select/Select';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { TripType, TripTypeEnum } from '@/types/shuttleRoute.type';
import { compareToNow, dateString } from '@/utils/dateString.util';
import { useEffect, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ReservationFormValues } from '../Form';
import RouteVisualizerWithSelect from '@/components/route-visualizer/RouteVisualizerWithSelect';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import NoticeSection from '@/components/notice-section/NoticeSection';
import {
  useGetShuttleRoutesOfDailyEvent,
  usePostShuttleRouteDemand,
} from '@/services/shuttleRoute.service';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import {
  EventsViewEntity,
  DailyEventsInEventsViewEntity,
} from '@/types/event.type';

interface Props {
  handleNextStep: () => void;
  event: EventsViewEntity;
  initialDailyShuttleId?: string;
  initialShuttleRouteId?: string;
}

const RouteSelectStep = ({
  handleNextStep,
  event,
  initialDailyShuttleId,
  initialShuttleRouteId,
}: Props) => {
  const { control, setValue, getValues } =
    useFormContext<ReservationFormValues>();

  const [selectedDailyShuttle, setSelectedDailyShuttle] = useState<
    DailyEventsInEventsViewEntity | undefined
  >(
    event.dailyEvents.find(
      (dailyEvent) => dailyEvent.dailyEventId === initialDailyShuttleId,
    ),
  );

  const { data: routes } = useGetShuttleRoutesOfDailyEvent(
    event.eventId,
    selectedDailyShuttle?.dailyEventId ?? '',
    { status: 'OPEN' },
  );

  // 초기 노선 설정
  useEffect(() => {
    if (routes && initialShuttleRouteId) {
      const initialRoute = routes.find(
        (route) => route.shuttleRouteId === initialShuttleRouteId,
      );
      if (initialRoute && getValues('shuttleRoute') === undefined) {
        setValue('shuttleRoute', initialRoute);
      }
    }
  }, [routes, initialShuttleRouteId]);

  const handleDailyShuttleChange = (
    dailyEvent: DailyEventsInEventsViewEntity,
  ) => {
    setSelectedDailyShuttle(dailyEvent);
    setValue('shuttleRoute', undefined);
    setValue('type', undefined);
    setValue('hub', {
      toDestinationHub: undefined,
      fromDestinationHub: undefined,
    });
  };

  // 노선 변경에 따라 기존 타입 및 허브 값 초기화
  const handleRouteChange = (route: ShuttleRoutesViewEntity) => {
    setValue('shuttleRoute', route);
    setValue('type', undefined);
    setValue('hub', {
      toDestinationHub: undefined,
      fromDestinationHub: undefined,
    });
  };

  const checkValidAndGoNextStep = () => {
    const [shuttleRoute, type, hub] = getValues([
      'shuttleRoute',
      'type',
      'hub',
    ]);
    if (
      !shuttleRoute ||
      !type ||
      (type === 'TO_DESTINATION' && !hub.toDestinationHub) ||
      (type === 'FROM_DESTINATION' && !hub.fromDestinationHub) ||
      (type === 'ROUND_TRIP' &&
        (!hub.toDestinationHub || !hub.fromDestinationHub))
    ) {
      toast.error('모든 항목을 기입해 주세요.');
      return;
    }
    handleNextStep();
  };

  return (
    <>
      <section className="flex flex-col gap-16 py-28">
        <h3 className="text-22 font-700 text-basic-grey-700">
          원하는 셔틀을 선택해주세요
        </h3>
        <Select
          options={event.dailyEvents}
          value={selectedDailyShuttle}
          setValue={(value) => handleDailyShuttleChange(value)}
          renderValue={(value) => dateString(value.date)}
          isUnderLined
          placeholder="탑승일"
          bottomSheetTitle="탑승일 선택"
        />
        <Controller
          control={control}
          name="shuttleRoute"
          render={({ field: { value } }) => (
            <Select
              options={routes ?? []}
              value={value}
              setValue={handleRouteChange}
              renderValue={(value) => value.name}
              isUnderLined
              placeholder="노선 종류"
              bottomSheetTitle="노선 종류 선택"
              disabled={!selectedDailyShuttle || !routes}
            />
          )}
        />
        <TypeSelect />
      </section>
      <RouteSelect />
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-basic-white px-16 py-8 shadow-bottomBar">
        <Button type="button" onClick={checkValidAndGoNextStep}>
          다음 단계로
        </Button>
      </div>
    </>
  );
};

export default RouteSelectStep;

const TypeSelect = () => {
  const { control, setValue, getValues } =
    useFormContext<ReservationFormValues>();
  const watchedShuttleRoute = useWatch({ control, name: 'shuttleRoute' });

  // 남아있는 좌석 수 반환
  const getRemainingSeatCount = (type?: TripType): number => {
    const maxSeatCount = watchedShuttleRoute?.maxPassengerCount ?? 0;
    const toDestinationCount =
      maxSeatCount - (watchedShuttleRoute?.toDestinationCount ?? 0);
    const fromDestinationCount =
      maxSeatCount - (watchedShuttleRoute?.fromDestinationCount ?? 0);
    const roundTripCount = Math.min(toDestinationCount, fromDestinationCount);

    switch (type) {
      case 'ROUND_TRIP':
        return roundTripCount;
      case 'TO_DESTINATION':
        return toDestinationCount;
      case 'FROM_DESTINATION':
        return fromDestinationCount;
      default:
        return 0;
    }
  };

  // 좌석 가격 반환
  const getPrice = (type?: TripType): number => {
    const isEarlybird =
      watchedShuttleRoute?.hasEarlybird &&
      watchedShuttleRoute?.earlybirdDeadline
        ? compareToNow(watchedShuttleRoute.earlybirdDeadline, (a, b) => a > b)
        : false;

    switch (type) {
      case 'ROUND_TRIP':
        return isEarlybird
          ? (watchedShuttleRoute?.earlybirdPriceRoundTrip ?? 0)
          : (watchedShuttleRoute?.regularPriceRoundTrip ?? 0);
      case 'TO_DESTINATION':
        return isEarlybird
          ? (watchedShuttleRoute?.earlybirdPriceToDestination ?? 0)
          : (watchedShuttleRoute?.regularPriceToDestination ?? 0);
      case 'FROM_DESTINATION':
        return isEarlybird
          ? (watchedShuttleRoute?.earlybirdPriceFromDestination ?? 0)
          : (watchedShuttleRoute?.regularPriceFromDestination ?? 0);
      default:
        return 0;
    }
  };

  // 타입 변경에 따라 기존 허브 값 초기화
  const handleTypeChange = (type: TripType) => {
    setValue('type', type);
    setValue('hub', {
      toDestinationHub:
        type === 'FROM_DESTINATION'
          ? undefined
          : getValues('hub.toDestinationHub'),
      fromDestinationHub:
        type === 'TO_DESTINATION'
          ? undefined
          : getValues('hub.fromDestinationHub'),
    });
  };

  const { mutate: postShuttleRouteDemand } = usePostShuttleRouteDemand();

  const handleShuttleRouteDemandClick = () => {
    if (!watchedShuttleRoute) {
      return;
    }
    postShuttleRouteDemand({
      eventId: watchedShuttleRoute.eventId,
      dailyEventId: watchedShuttleRoute.dailyEventId,
      shuttleRouteId: watchedShuttleRoute.shuttleRouteId,
      shuttleRouteHubId:
        watchedShuttleRoute.toDestinationShuttleRouteHubs?.[0]
          .shuttleRouteHubId ?? '',
    });
  };

  const showShuttleRouteDemandButton =
    watchedShuttleRoute && getRemainingSeatCount('ROUND_TRIP') === 0;

  return (
    <Controller
      control={control}
      name="type"
      render={({ field: { value } }) => {
        return (
          <Select
            options={TripTypeEnum.options}
            value={value}
            setValue={handleTypeChange}
            renderValue={(value) => (
              <p className="flex items-center justify-between">
                <span className="font-600 text-basic-grey-700 group-default/is-selected:font-400 group-disabled/select-option:font-400 group-disabled/select-option:text-basic-grey-400 group-[.is-selected]:font-400">
                  {TRIP_STATUS_TO_STRING[value]}
                </span>
                <div className="flex items-center gap-12 group-[.is-selected]:hidden">
                  <span className="text-12 font-400 text-basic-grey-700 group-disabled/select-option:hidden">
                    {getRemainingSeatCount(value)}석
                  </span>
                  <span className="hidden text-12 font-400 text-basic-red-100 group-disabled/select-option:inline-block">
                    매진
                  </span>
                  <span className="text-14 font-600 text-basic-grey-700 group-disabled/select-option:hidden">
                    {getPrice(value).toLocaleString()}원
                  </span>
                </div>
              </p>
            )}
            extraContent={
              showShuttleRouteDemandButton ? (
                <button
                  onClick={handleShuttleRouteDemandClick}
                  type="button"
                  className="flex w-full items-center justify-center border-t border-[#F3F3F3] py-[14px] text-14 font-600 text-[#5A5A5A]"
                >
                  추가 셔틀 요청하기
                </button>
              ) : null
            }
            sort
            disabled={!watchedShuttleRoute}
            disableOption={(option) => getRemainingSeatCount(option) === 0}
            isUnderLined
            defaultText="예약 가능한 좌석이 없어요"
            placeholder="왕복 / 가는 편 / 오는 편"
            bottomSheetTitle="왕복 / 가는 편 / 오는 편 선택"
          />
        );
      }}
    />
  );
};

const RouteSelect = () => {
  const { control } = useFormContext<ReservationFormValues>();
  const [watchedShuttleRoute, watchedType] = useWatch({
    control,
    name: ['shuttleRoute', 'type'],
  });

  return (
    <section>
      {watchedType && watchedShuttleRoute && (
        <>
          <article>
            <Controller
              control={control}
              name="hub"
              render={({ field: { value, onChange } }) => (
                <RouteVisualizerWithSelect
                  type={watchedType}
                  toDestinationHubs={
                    watchedShuttleRoute.toDestinationShuttleRouteHubs ?? []
                  }
                  toDestinationHubValue={value.toDestinationHub}
                  setToDestinationHubValue={(toDestinationHub) =>
                    onChange({
                      ...value,
                      toDestinationHub: toDestinationHub,
                    })
                  }
                  fromDestinationHubs={
                    watchedShuttleRoute.fromDestinationShuttleRouteHubs ?? []
                  }
                  fromDestinationHubValue={value.fromDestinationHub}
                  setFromDestinationHubValue={(fromDestinationHub) =>
                    onChange({ ...value, fromDestinationHub })
                  }
                />
              )}
            />
          </article>
          <article className="flex flex-col gap-16 py-44">
            <NoticeSection type={'cancellation-and-refund'} noPadding />
            <NoticeSection type={'term-and-condition'} noPadding />
          </article>
        </>
      )}
    </section>
  );
};
