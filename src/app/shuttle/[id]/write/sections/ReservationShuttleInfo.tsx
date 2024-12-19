import { BIG_REGIONS } from '@/constants/regions';
import Select from '@/components/select/Select';
import { Control, Controller } from 'react-hook-form';
import { ReservationFormData } from '../page';

interface ReservationShuttleInfoProps {
  control: Control<ReservationFormData>;
}

const ReservationShuttleInfo = ({ control }: ReservationShuttleInfoProps) => {
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
            options={BIG_REGIONS}
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
            options={['청주', '청주-충주', '인천']}
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
