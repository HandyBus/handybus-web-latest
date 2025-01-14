'use client';

import AppBar from '@/components/app-bar/AppBar';
import Button from '@/components/buttons/button/Button';
import TextInput from '@/components/inputs/text-input/TextInput';
import { CustomError } from '@/services/custom-error';
import { usePutShuttleBus } from '@/services/shuttle-operation.service';
import { useGetUserReservation } from '@/services/user-management.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
  const { data } = useGetUserReservation(Number(id));
  const { mutate: putShuttleBus } = usePutShuttleBus(Number(id), {
    onSuccess: () => {
      toast.success('오픈채팅방 링크가 제출되었습니다.');
      router.push(`/mypage/shuttle/${id}`);
    },
    onError: (error: CustomError) => {
      if (error.statusCode === 400) {
        toast.error('오픈채팅방 링크가 올바르지 않습니다.');
      } else {
        toast.error('오픈채팅방 링크 제출에 실패했습니다.');
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
      toast.error('예약 정보를 불러오는데 실패했습니다.');
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

  return (
    <>
      <AppBar>핸디 가이드</AppBar>
      <main className="px-16">
        <section className="pt-[60px]">
          <h2 className="pb-12 text-28 font-700">‘핸디’ 가이드를 전달드려요</h2>
          <p className="pb-12 text-16 font-400 text-grey-700">
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
          <Link
            href="/help/what-is-handy"
            className="mx-auto mt-[60px] block w-fit rounded-full bg-grey-100 px-16 text-grey-600-sub"
          >
            핸디 가이드 보러가기
          </Link>
        </section>
        <section className="py-[60px]">
          <h2 className="pb-12 text-28 font-700">오픈채팅방 링크 입력</h2>
          <p className="pb-24 text-16 font-400 text-grey-700">
            개설한 오픈채팅방으로 다른 탑승객분들이 입장할 수 있도록 링크를
            입력해주세요.
            <br />
            <br />
            자세한 개설 방법은 ‘핸디 가이드 보러가기’에서 확인하실 수 있어요.
          </p>
          <form
            className="flex flex-col gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name="openChatLink"
              control={control}
              setValue={setValue}
              placeholder="오픈채팅방 링크를 입력해주세요"
            >
              링크 입력
            </TextInput>
            <Button>링크 제출하기</Button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Handy;
