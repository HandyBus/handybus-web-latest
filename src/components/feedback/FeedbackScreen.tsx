'use client';

import Button from '@/components/buttons/button/Button';
import TextArea from '@/components/inputs/text-area/TextArea';
import { usePostFeedback } from '@/services/core.service';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// NOTE: 피드백의 subject은 프론트에서 관리. 추후 기능 추가 및 기획 변경에 따라 타입 추가.
type FeedbackSubject =
  | '일반'
  | '수요조사 - 성공'
  | '수요조사 - 실패'
  | '예약 - 성공'
  | '예약 - 실패'
  | '빈자리 알림 신청';

interface Props {
  subject: FeedbackSubject;
  closeFeedbackScreen: () => void;
}

const FeedbackScreen = ({ subject, closeFeedbackScreen }: Props) => {
  const { control, handleSubmit } = useForm<{ text: string }>();
  const { mutateAsync: postFeedback, isPending } = usePostFeedback();

  const handleFeedbackSubmit = async (data: { text: string }) => {
    try {
      await postFeedback({ subject, content: data.text });
      toast.success('소중한 의견 감사합니다!');
      closeFeedbackScreen();
    } catch (error) {
      console.error(error);
      toast.error('잠시 후 다시 시도해주세요.');
    }
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
        <Button
          variant="primary"
          size="large"
          type="submit"
          disabled={isPending}
        >
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
