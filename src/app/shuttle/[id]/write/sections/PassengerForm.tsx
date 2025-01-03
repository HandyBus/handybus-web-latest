import { UseFormSetValue } from 'react-hook-form';
import TextInput from '@/components/inputs/text-input/TextInput';
import { ReservationFormData } from '../page';
import { Control } from 'react-hook-form';

interface Props {
  index: number;
  control: Control<ReservationFormData>;
  setValue: UseFormSetValue<ReservationFormData>;
}

const PassengerForm = ({ index, control, setValue }: Props) => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-18 font-500 leading-[22.8px]">
        탑승객 정보를 입력해주세요
      </h2>
      <TextInput
        version="shuttle"
        name={`passengers.${index}.name`}
        control={control}
        setValue={setValue}
        placeholder="이름을 입력해주세요"
        rules={{
          required: '이름을 입력해주세요',
          pattern: {
            value: /^[가-힣a-zA-Z]{1,12}$/,
            message: '한글 또는 영어만 입력해주세요',
          },
        }}
      >
        <h3 className="text-12 font-500 leading-[19.2px]">탑승객 정보</h3>
      </TextInput>
      <TextInput
        version="shuttle"
        name={`passengers.${index}.phoneNumber`}
        control={control}
        setValue={setValue}
        placeholder="휴대전화번호를 입력해주세요 ('-' 제외)"
        rules={{
          pattern: {
            value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
            message: '휴대전화번호 형식이 올바르지 않습니다',
          },
          required: '휴대전화번호를 입력해주세요',
        }}
      >
        <h3 className="text-12 font-500 leading-[19.2px]">휴대전화번호</h3>
      </TextInput>
    </section>
  );
};

export default PassengerForm;
