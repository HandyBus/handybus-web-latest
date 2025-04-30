'use client';

import Button from '@/components/buttons/button/Button';
import TextArea from '@/components/inputs/text-area/TextArea';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface Props {
  closeFeedbackScreen: () => void;
}

const FeedbackScreen = ({ closeFeedbackScreen }: Props) => {
  const { control, handleSubmit } = useForm<{ text: string }>();

  const handleFeedbackSubmit = (data: { text: string }) => {
    console.log(data);
    toast.success('개발 중 . . .');
  };

  return (
    <form
      onSubmit={handleSubmit(handleFeedbackSubmit)}
      className="fixed inset-0 z-[101] mx-auto flex max-w-[500px] flex-col items-center bg-basic-white"
    >
      <section className="w-full p-24">
        <h3 className="mb-4 text-22 font-700">어떤 의견이든 들려주세요</h3>
        <p className="mb-16 text-16 font-500 text-basic-grey-600">
          보내주신 의견을 꼼꼼하게 확인할게요.
        </p>
        <TextArea control={control} name="text" placeholder="의견 남기기" />
      </section>
      <section className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-8 p-16">
        <Button variant="primary" size="large" type="submit">
          의견 보내기
        </Button>
        <Button variant="text" size="large" onClick={closeFeedbackScreen}>
          다음에 할게요
        </Button>
      </section>
    </form>
  );
};

export default FeedbackScreen;
