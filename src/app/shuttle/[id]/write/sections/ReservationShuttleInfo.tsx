import { Control, Controller } from 'react-hook-form';
import { DailyShuttle, ReservationFormData } from '../page';
import { ShuttleRoute } from '@/types/shuttle.types';
import { formatDate } from '@/components/shuttle-detail/shuttleDetailPage.utils';
import SelectLabeled from '@/components/select-labeled/SelectLabeled';

interface ReservationShuttleInfoProps {
  control: Control<ReservationFormData>;
  dailyShuttleArray: DailyShuttle[];
  dailyShuttleRouteArray: ShuttleRoute[];
}

const ReservationShuttleInfo = ({
  control,
  dailyShuttleArray,
  dailyShuttleRouteArray,
}: ReservationShuttleInfoProps) => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        원하는 셔틀을 입력해주세요
      </h2>
      <Controller
        control={control}
        name="dailyShuttle"
        render={({ field }) => (
          <SelectLabeled
            isUnderLined={true}
            options={dailyShuttleArray
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((v: DailyShuttle) => ({
                label: formatDate(v.date),
                value: v.dailyShuttleId,
              }))}
            value={field.value}
            setValue={field.onChange}
            placeholder="탑승일"
          />
        )}
      />
      <Controller
        control={control}
        name="shuttleRoute"
        render={({ field }) => (
          <SelectLabeled
            isUnderLined={true}
            options={
              dailyShuttleRouteArray && dailyShuttleRouteArray.length > 0
                ? dailyShuttleRouteArray.map((v) => ({
                    label: v.name,
                    value: v.shuttleRouteId,
                  }))
                : []
            }
            value={field.value}
            setValue={field.onChange}
            placeholder="노선 종류"
          />
        )}
      />
      <Controller
        control={control}
        name="tripType"
        render={({ field }) => (
          <SelectLabeled
            isUnderLined={true}
            options={
              [
                { label: '왕복', value: 'ROUND_TRIP' },
                { label: '콘서트행', value: 'TO_DESTINATION' },
                { label: '귀가행', value: 'FROM_DESTINATION' },
              ] as { label: string; value: string }[]
            }
            value={field.value}
            setValue={field.onChange}
            placeholder="왕복/콘서트행/귀가행"
          />
        )}
      />
    </section>
  );
};

export default ReservationShuttleInfo;
