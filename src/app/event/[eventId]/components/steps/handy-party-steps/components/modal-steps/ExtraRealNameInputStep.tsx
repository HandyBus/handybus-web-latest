'use client';

import Button from '@/components/buttons/button/Button';
import Header from '../Header';
import { Controller, useFormContext } from 'react-hook-form';
import { HandyPartyModalFormValues } from '../../HandyPartyModal';
import { createPaymentPageUrl } from '@/app/event/[eventId]/dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/payment.const';
import { useRouter } from 'next/navigation';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import { useEffect, useMemo } from 'react';
import { getHandyPartyArea } from '@/utils/handyParty.util';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { usePutUser } from '@/services/user.service';
import { toast } from 'react-toastify';

interface Props {
  onBack: () => void;
  handyPartyRoutes: ShuttleRoutesViewEntity[];
  closeBottomSheet: () => void;
  closeModal: () => void;
}

const ExtraRealNameInputStep = ({
  onBack,
  handyPartyRoutes,
  closeBottomSheet,
  closeModal,
}: Props) => {
  const { mutateAsync: putUser, isPending: isLoading } = usePutUser();
  const { getValues, control, handleSubmit } =
    useFormContext<HandyPartyModalFormValues>();
  const router = useRouter();
  const {
    markAsIntentionalNavigation,
    setReservationTrackingStep,
    getReservationStartTime,
  } = useReservationTrackingGlobal();

  const { targetRoute, tripType, userAddress } = useMemo(() => {
    const [tripType, addressSearchResult] = getValues([
      'tripType',
      'addressSearchResult',
    ]);

    const handyPartyArea = getHandyPartyArea(addressSearchResult.address);

    const targetRoute = handyPartyRoutes.find((route) => {
      const handyPartyAreaOfItem = route.name.split('_')?.[1] ?? '';
      const tripTypeOfItem = route.name.split('_')?.[2] ?? '';
      const isSameArea = handyPartyAreaOfItem === handyPartyArea;
      const convertedTripTypeOfItem =
        tripTypeOfItem === '행사장행' ? 'TO_DESTINATION' : 'FROM_DESTINATION'; // 핸디팟은 노선 이름에 방향이 기재되어있어야한다.
      const isSameTripType = convertedTripTypeOfItem === tripType;
      return isSameArea && isSameTripType;
    });

    if (!targetRoute) {
      return {
        targetRoute: undefined,
        tripType: undefined,
      };
    }

    return {
      targetRoute,
      tripType,
      userAddress: addressSearchResult,
    };
  }, [handyPartyRoutes, getValues]);

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 이름 입력');
  }, [setReservationTrackingStep]);

  const onSubmit = async () => {
    try {
      await putUser({ name: getValues('userName') });
    } catch (error) {
      console.error(error);
      toast.error('이름 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!targetRoute || !userAddress!) {
      return;
    }

    const toDestinationShuttleRouteHubId =
      tripType === 'TO_DESTINATION'
        ? targetRoute.toDestinationShuttleRouteHubs?.find(
            (hub) => hub.role === 'HUB',
          )?.shuttleRouteHubId
        : undefined;
    const fromDestinationShuttleRouteHubId =
      tripType === 'FROM_DESTINATION'
        ? targetRoute.fromDestinationShuttleRouteHubs?.find(
            (hub) => hub.role === 'HUB',
          )?.shuttleRouteHubId
        : undefined;

    const url = createPaymentPageUrl({
      eventId: targetRoute.eventId,
      dailyEventId: targetRoute.dailyEventId,
      shuttleRouteId: targetRoute.shuttleRouteId,
      tripType,
      toDestinationHubId: toDestinationShuttleRouteHubId,
      fromDestinationHubId: fromDestinationShuttleRouteHubId,
      passengerCount: getValues('passengerCount'),
      desiredHubAddress: userAddress.address,
      desiredHubLatitude: userAddress.y,
      desiredHubLongitude: userAddress.x,
      reservationStartTime: getReservationStartTime() ?? undefined,
    });

    // 결제 페이지로 이동하는 것은 의도적 이동이므로 ga4 예약중 이탈 집계방지를 위해 마킹
    markAsIntentionalNavigation();
    router.push(url);
    closeBottomSheet();
    closeModal();
  };

  return (
    <div className="flex grow flex-col">
      <Header
        variant="reservation-info"
        onBack={onBack}
        closeModal={closeModal}
        title="예약하기"
      />
      <div className="flex w-full flex-col gap-16 px-16 pt-[28px]">
        <div className="flex flex-col gap-4">
          <h2 className="text-18 font-600 leading-[140%]">
            결제 전, 본인 이름을 확인해 주세요
          </h2>
          <p className="text-16 font-500 leading-[160%] text-basic-grey-600">
            핸디버스는 2025.07.29부터 실명제로 운행돼요. 작성하신 이름은
            프로필에도 적용해 드릴게요.
          </p>
        </div>
        <Controller
          control={control}
          name="userName"
          rules={{
            required: '이름을 입력해 주세요.',
            pattern: {
              value: /^([가-힣]{2,20}|[a-zA-Z\s]{2,20})$/,
              message:
                '이름은 한글 또는 영문(띄어쓰기 포함) 2~20자로 작성해주세요.',
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <input
                type="text"
                placeholder="이름을 입력해 주세요."
                className={`w-full rounded-[12px] border border-basic-grey-200 p-12 placeholder:text-basic-grey-400 focus:outline-none ${fieldState?.error ? 'border-basic-red-500' : 'focus:border-brand-primary-400'}`}
                {...field}
              />
              {fieldState?.error && (
                <p className="h-[20px] text-12 font-400 text-basic-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
      <div className="mt-auto flex flex-col gap-16 p-16">
        <Button
          variant="primary"
          size="large"
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default ExtraRealNameInputStep;
