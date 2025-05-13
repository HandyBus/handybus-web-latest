'use client';

import TextInput from '@/components/inputs/text-input/TextInput';
import Modal from '@/components/modals/Modal';
import { CustomError } from '@/services/custom-error';
import { usePutShuttleBus } from '@/services/shuttleBus.service';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormValues {
  openChatLink: string;
}

interface Props {
  reservation: ReservationsViewEntity;
  isOpen: boolean;
  closeModal: () => void;
}

const SubmitOpenChatLinkModal = ({
  reservation,
  isOpen,
  closeModal,
}: Props) => {
  const router = useRouter();
  const { mutate: putShuttleBus } = usePutShuttleBus(
    reservation.reservationId,
    {
      onSuccess: () => {
        toast.success('오픈채팅방 링크가 제출되었어요.');
        closeModal();
        router.refresh();
      },
      onError: (error: CustomError) => {
        if (error.statusCode === 400) {
          toast.error('오픈채팅방 링크가 올바르지 않아요.');
        } else {
          toast.error('오픈채팅방 링크를 제출하지 못했어요.');
        }
      },
    },
  );

  const { control, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      openChatLink: '',
    },
  });

  const handleSubmit = () => {
    const openChatLink = getValues('openChatLink');
    if (!openChatLink) {
      toast.error('채팅방 링크를 입력해 주세요.');
      return;
    }
    if (!reservation.shuttleBusId) {
      toast.error('배차 정보를 불러오지 못했어요.');
      return;
    }
    putShuttleBus({
      eventId: reservation.shuttleRoute.eventId,
      dailyEventId: reservation.shuttleRoute.dailyEventId,
      shuttleRouteId: reservation.shuttleRouteId,
      shuttleBusId: reservation.shuttleBusId,
      openChatLink,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      title="오픈채팅방 등록"
      primaryButton={{
        text: '확인',
        variant: 'primary',
        onClick: handleSubmit,
      }}
      secondaryButton={{
        text: '취소',
        variant: 'tertiary',
        onClick: closeModal,
      }}
    >
      <TextInput
        control={control}
        setValue={setValue}
        name="openChatLink"
        placeholder="채팅방 링크를 입력해 주세요."
      />
    </Modal>
  );
};

export default SubmitOpenChatLinkModal;
