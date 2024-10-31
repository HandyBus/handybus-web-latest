import Button from '@/components/Button';
import Indicator from '@/components/Indicator';
import TextInput from '@/components/TextInput';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import CameraIcon from 'public/icons/camera.svg';

const DEFAULT_PROFILE_SRC = '/icons/default-profile.svg';

interface Props {
  handleNextStep: () => void;
}

const ProfileInfoStep = ({ handleNextStep }: Props) => {
  const { control, setValue } = useFormContext();

  return (
    <div className="relative h-full w-full grow">
      <div className="p-28">
        <h2 className="pb-[6px] text-26 font-700 text-grey-900">
          프로필을 입력해주세요
        </h2>
        <p className="text-14 font-600 text-grey-500">
          핸디버스가 어떻게 불러드릴까요?
        </p>
      </div>
      <div className="flex w-full justify-center py-28">
        <div className="relative flex h-200 w-200 items-center justify-center rounded-full">
          <Image src={DEFAULT_PROFILE_SRC} fill alt="프로필 이미지" />
          <button className="absolute bottom-12 right-12 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-grey-300">
            <CameraIcon />
          </button>
        </div>
      </div>
      <div className="p-28">
        <TextInput
          name="nickname"
          control={control}
          setValue={setValue}
          placeholder="영문/한글/숫자 포함 2 ~ 12자"
        >
          닉네임
        </TextInput>
      </div>
      <div className="absolute bottom-[26px] flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={1} />
        </div>
        <div className="w-full px-32 py-8">
          <Button type="button" onClick={handleNextStep}>
            다음으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoStep;
