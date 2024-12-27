import Select from '@/components/select/Select';
import { Control, Controller } from 'react-hook-form';
import { DailyShuttle, ReservationFormData } from '../page';
import { ShuttleRoute } from '@/types/shuttle.types';
import { formatDate } from '@/components/shuttle-detail/shuttleDetailPage.utils';

interface ReservationShuttleInfoProps {
  control: Control<ReservationFormData>;
  dailyShuttle: DailyShuttle[];
  shuttleRoutes: ShuttleRoute[];
}

const ReservationShuttleInfo = ({
  control,
  dailyShuttle,
  shuttleRoutes,
}: ReservationShuttleInfoProps) => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        원하는 셔틀을 입력해주세요
      </h2>
      <Controller
        control={control}
        name="boardingDate"
        render={({ field }) => (
          <Select
            isUnderLined={true}
            options={dailyShuttle
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((v: DailyShuttle) => formatDate(v.date))}
            value={field.value}
            setValue={field.onChange}
            placeholder="탑승일"
          />
        )}
      />
      <Controller
        control={control}
        name="routeType"
        render={({ field }) => (
          <Select
            isUnderLined={true}
            options={shuttleRoutes.map((v) => v.name)}
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
          <Select
            isUnderLined={true}
            options={['왕복', '콘서트행', '귀가행']}
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
