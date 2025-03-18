'use client';

import Button from '@/components/buttons/button/Button';
import Header from '@/components/header/Header';
import TextInput from '@/components/inputs/text-input/TextInput';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { CustomError } from '@/services/custom-error';
import { usePutShuttleBus } from '@/services/shuttleBus.service';
import { useGetUserReservation } from '@/services/reservation.service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const HANDY_GUIDE_URL = process.env.NEXT_PUBLIC_HANDY_GUIDE_URL ?? '';

const TEXT = {
  busAssigned: {
    description: (
      <>
        개설한 오픈채팅방으로 다른 탑승객분들이 입장할 수 있도록 링크를
        입력해주세요.
        <br />
        <br />
        자세한 개설 방법은 ‘핸디 가이드 보러가기’에서 확인하실 수 있어요.
      </>
    ),
    placeholder: '오픈채팅방 링크를 입력해주세요',
  },
  busNotAssigned: {
    description: (
      <>
        개설한 오픈채팅방으로 다른 탑승객분들이 입장할 수 있도록 링크를
        입력해주세요. 링크 입력은 버스 배정 후 가능하며, 배정이 완료되면 바로
        알려드릴게요.
        <br />
        <br />
        자세한 개설 방법은 ‘핸디 가이드 보러가기’에서 확인하실 수 있어요.
      </>
    ),
    placeholder: '버스 배정 후 입력할 수 있습니다.',
  },
};

interface FormValues {
  openChatLink: string;
}

interface Props {
  params: {
    id: string;
  };
}

const Handy = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading } = useGetUserReservation(id);
  const { mutate: putShuttleBus } = usePutShuttleBus(id, {
    onSuccess: () => {
      toast.success('오픈채팅방 링크가 제출되었어요.');
      router.push(`/mypage/shuttle/${id}`);
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 400) {
        toast.error('오픈채팅방 링크가 올바르지 않아요.');
      } else {
        toast.error('오픈채팅방 링크를 제출하지 못했어요.');
      }
    },
  });

  const { control, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      openChatLink: '',
    },
  });

  const onSubmit = (formValues: FormValues) => {
    if (!data || !data.reservation.shuttleBusId) {
      toast.error('예약 정보를 불러오지 못했어요.');
      return;
    }
    putShuttleBus({
      eventId: data.reservation.shuttleRoute.eventId,
      dailyEventId: data.reservation.shuttleRoute.dailyEventId,
      shuttleRouteId: data.reservation.shuttleRouteId,
      shuttleBusId: data.reservation.shuttleBusId,
      openChatLink: formValues.openChatLink,
    });
  };

  useEffect(() => {
    if (data && data.reservation.handyStatus !== 'ACCEPTED') {
      router.replace(`/mypage/shuttle/${id}`);
    }
  }, [data?.reservation.handyStatus]);

  const openHandyGuide = () => {
    window.open(HANDY_GUIDE_URL);
  };

  const isBusAssigned = data?.reservation.shuttleBusId !== null;

  return (
    <>
      <Header />
      <DeferredSuspense isLoading={isLoading} fallback={<Loading />}>
        {data && (
          <main className="px-16">
            <section className="pt-[60px]">
              <h2 className="pb-12 text-28 font-700">
                ‘핸디’ 가이드를 전달드려요
              </h2>
              <p className="pb-12 text-16 font-400 text-brand-grey-700">
                이번 셔틀 운행 간 <span className="font-600">‘핸디’</span>로
                지원해주셔서 감사드리며, 선정을 축하합니다!
                <br />
                <br />
                핸디버스의 ‘핸디’는 안전한 셔틀 운행을 위한{' '}
                <span className="font-600">현장 도우미</span>예요.
                <br />
                <br />
                자세한 핸디 가이드는 아래 링크를 확인해주세요!
              </p>
              <Button
                onClick={openHandyGuide}
                className="mx-auto mt-[60px] block w-fit rounded-full bg-brand-grey-100 px-16 text-brand-grey-600"
              >
                핸디 가이드 보러가기
              </Button>
            </section>
            <section className="py-[60px]">
              <h2 className="pb-12 text-28 font-700">오픈채팅방 링크 입력</h2>
              <p className="pb-24 text-16 font-400 text-brand-grey-700">
                {isBusAssigned
                  ? TEXT.busAssigned.description
                  : TEXT.busNotAssigned.description}
              </p>
              <form
                className="flex flex-col gap-12"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextInput
                  name="openChatLink"
                  control={control}
                  setValue={setValue}
                  placeholder={
                    isBusAssigned
                      ? TEXT.busAssigned.placeholder
                      : TEXT.busNotAssigned.placeholder
                  }
                >
                  링크 입력
                </TextInput>
                <Button type="submit" disabled={!isBusAssigned}>
                  링크 제출하기
                </Button>
              </form>
            </section>
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default Handy;
