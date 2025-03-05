import Section from '../Section';
import { HandyStatus } from '@/types/reservation.type';
import Button from '@/components/buttons/button/Button';
import HandyRequestModal from '@/components/modals/handy-request/HandyRequestModal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { usePostUpdateReservation } from '@/services/reservation.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TEXT: Record<
  HandyStatus,
  {
    title: string;
    description: string | ((name: string) => string);
    button: string;
  }
> = {
  NOT_SUPPORTED: {
    title: '핸디 지원',
    description: '핸디는 신청자만 지원이 가능합니다.',
    button: '지원하기',
  },
  SUPPORTED: {
    title: '핸디 지원',
    description:
      '핸디 심사가 진행 중입니다. 핸디로 선정되면 알림톡을 보내드릴게요.',
    button: '취소하기',
  },
  ACCEPTED: {
    title: '당신은 핸디입니다',
    description: (name: string) =>
      `축하합니다! ${name}님은 이번 셔틀의 핸디로 선정되셨어요. 소통을 위한 오픈채팅방 링크를 제출해주세요.`,
    button: '제출하기',
  },
  DECLINED: {
    title: '핸디 미선정',
    description:
      '아쉽게도 핸디에 선정되지 않았어요. 다음 기회에 꼭 핸디로 함께 해요!',
    button: '',
  },
};

interface Props {
  reservationId: string;
  name: string;
  handyStatus: HandyStatus;
}

const HandySection = ({ reservationId, name, handyStatus }: Props) => {
  const [isHandyRequestModalOpen, setIsHandyRequestModalOpen] = useState(false);

  const onSuccess = () => {
    if (handyStatus === 'NOT_SUPPORTED') {
      toast.success('핸디에 지원해주셔서 감사합니다!');
    } else {
      toast.success('핸디 지원이 취소되었습니다.');
    }
  };
  const onError = () => {
    toast.error('핸디 지원/취소에 실패했습니다.');
  };
  const { mutate: updateReservation } = usePostUpdateReservation(
    reservationId,
    {
      onSuccess,
      onError,
    },
  );

  const handleHandyRequestConfirm = () => {
    updateReservation({
      isSupportingHandy: handyStatus === 'NOT_SUPPORTED' ? true : false,
    });
    setIsHandyRequestModalOpen(false);
  };
  const handleHandyRequestClosed = () => {
    setIsHandyRequestModalOpen(false);
  };

  const router = useRouter();
  const handleButtonClick = () => {
    switch (handyStatus) {
      case 'NOT_SUPPORTED':
      case 'SUPPORTED':
        setIsHandyRequestModalOpen(true);
        break;
      case 'ACCEPTED':
        router.push(`/mypage/shuttle/${reservationId}/handy`);
        break;
    }
  };

  return (
    <>
      <Section
        title={
          <div className="flex items-baseline justify-between">
            {TEXT[handyStatus].title}
            <Link
              href="/help/what-is-handy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-14 font-500 text-grey-500 underline underline-offset-2"
            >
              핸디란?
            </Link>
          </div>
        }
      >
        <p className="text-14 font-400 text-grey-500">
          {typeof TEXT[handyStatus].description === 'function'
            ? TEXT[handyStatus].description(name)
            : TEXT[handyStatus].description}
        </p>
        {handyStatus !== 'DECLINED' && (
          <Button type="button" onClick={handleButtonClick} className="mt-16">
            {TEXT[handyStatus].button}
          </Button>
        )}
      </Section>
      <HandyRequestModal
        isOpen={isHandyRequestModalOpen}
        onConfirm={handleHandyRequestConfirm}
        onClosed={handleHandyRequestClosed}
        buttonText={handyStatus === 'NOT_SUPPORTED' ? '지원하기' : '취소하기'}
      />
    </>
  );
};

export default HandySection;
