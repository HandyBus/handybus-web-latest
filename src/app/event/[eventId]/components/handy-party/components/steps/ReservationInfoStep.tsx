'use client';

import { useEffect, useMemo } from 'react';
import Header from '../Header';
import SimpleRouteInfo from '../SimpleRouteInfo';
import SubtractIcon from '../../icons/subtract.svg';
import AddIcon from '../../icons/add.svg';
import Button from '@/components/buttons/button/Button';
import { useFormContext, useWatch } from 'react-hook-form';
import { HandyPartyModalFormValues } from '../../HandyPartyModal';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { getHandyPartyArea } from '../../../../../../../utils/handyParty.util';
import dayjs from 'dayjs';
import { createPaymentPageUrl } from '@/app/event/[eventId]/dailyevent/[dailyEventId]/route/[shuttleRouteId]/payment/payment.const';
import { useRouter } from 'next/navigation';
import { useReservationTrackingGlobal } from '@/hooks/analytics/useReservationTrackingGlobal';
import { useGetUser } from '@/services/user.service';
import Loading from '@/components/loading/Loading';

const MAX_PASSENGER_COUNT = 5;

interface Props {
  onBack: () => void;
  toExtraRealNameInputStep: () => void;
  handyPartyRoutes: ShuttleRoutesViewEntity[];
  closeBottomSheet: () => void;
  closeModal: () => void;
}

const ReservationInfoStep = ({
  onBack,
  toExtraRealNameInputStep,
  handyPartyRoutes,
  closeBottomSheet,
  closeModal,
}: Props) => {
  const router = useRouter();
  const { getValues, setValue, control } =
    useFormContext<HandyPartyModalFormValues>();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser();
  const {
    markAsIntentionalNavigation,
    setReservationTrackingStep,
    getReservationStartTime,
  } = useReservationTrackingGlobal();
  const passengerCount = useWatch({ control, name: 'passengerCount' });

  const {
    targetRoute,
    tripType,
    userAddress,
    regularPrice,
    earlybirdPrice,
    discountRate,
    isEarlybird,
  } = useMemo(() => {
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
        regularPrice: 0,
        earlybirdPrice: 0,
        discountRate: 0,
        isEarlybird: false,
      };
    }

    const isEarlybird =
      targetRoute.hasEarlybird &&
      targetRoute.earlybirdDeadline &&
      dayjs().isBefore(targetRoute.earlybirdDeadline);

    const regularPrice =
      (tripType === 'TO_DESTINATION'
        ? targetRoute.regularPriceToDestination
        : targetRoute.regularPriceFromDestination) ?? 0;

    const earlybirdPrice =
      (isEarlybird && tripType === 'TO_DESTINATION'
        ? targetRoute.earlybirdPriceToDestination
        : targetRoute.earlybirdPriceFromDestination) ?? 0;

    const discountRate = Math.floor(
      ((regularPrice - earlybirdPrice) / regularPrice) * 100,
    );

    return {
      targetRoute,
      tripType,
      userAddress: addressSearchResult,
      regularPrice,
      earlybirdPrice,
      discountRate,
      isEarlybird,
    };
  }, [handyPartyRoutes, getValues]);

  const handleSubmit = () => {
    if (!targetRoute || !userAddress!) {
      return;
    }

    if (!user?.name) {
      toExtraRealNameInputStep();
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
      passengerCount,
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

  const destinationHub =
    tripType === 'TO_DESTINATION'
      ? targetRoute?.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )
      : targetRoute?.fromDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        );

  useEffect(() => {
    setReservationTrackingStep('[핸디팟] 예약 확인');
  }, [setReservationTrackingStep]);

  if (isUserLoading) return <Loading style="grow" />;
  if (isUserError) throw new Error('fetching user failed');
  return (
    <div className="flex grow flex-col">
      <Header
        title="예약하기"
        variant="reservation-info"
        onBack={onBack}
        closeModal={closeModal}
      />
      <section className="px-16 pb-16 pt-[28px]">
        <h2 className="text-18 font-600 leading-[140%]">
          이 셔틀로 예약을 진행할게요
        </h2>
      </section>
      <div className="flex w-full flex-col gap-16 px-16">
        {destinationHub && tripType === 'TO_DESTINATION' && (
          <SimpleRouteInfo
            tripType="TO_DESTINATION"
            destinationHub={destinationHub}
            userAddress={userAddress.address}
          />
        )}
        {destinationHub && tripType === 'FROM_DESTINATION' && (
          <SimpleRouteInfo
            tripType="FROM_DESTINATION"
            destinationHub={destinationHub}
            userAddress={userAddress.address}
          />
        )}
        <article className="flex items-center justify-between rounded-12 border border-basic-grey-100 p-8">
          <button
            type="button"
            onClick={() => setValue('passengerCount', passengerCount - 1)}
            disabled={passengerCount <= 1}
            className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 disabled:text-basic-grey-300 active:[&:not([disabled])]:bg-basic-grey-200"
          >
            <SubtractIcon />
          </button>
          <span className="text-16 font-500">{passengerCount}</span>
          <button
            type="button"
            onClick={() => setValue('passengerCount', passengerCount + 1)}
            disabled={passengerCount >= MAX_PASSENGER_COUNT}
            className="flex h-[35px] w-[51px] items-center justify-center rounded-8 bg-basic-grey-50 disabled:text-basic-grey-300 active:[&:not([disabled])]:bg-basic-grey-200"
          >
            <AddIcon />
          </button>
        </article>
      </div>
      <div className="mt-auto flex flex-col gap-16 p-16">
        <article>
          <p className="flex h-[22px] items-center justify-between">
            <span className="text-14 font-500 text-basic-grey-700">
              {regularPrice?.toLocaleString()}원 x {passengerCount}
            </span>
            <span
              className={`font-600 ${isEarlybird ? 'text-14 text-basic-grey-300 line-through' : 'text-16'}`}
            >
              {(regularPrice * passengerCount).toLocaleString()} 원
            </span>
          </p>
          {isEarlybird && (
            <p className="flex h-[26px] items-center justify-end gap-4">
              <span className="text-10 font-600 text-basic-grey-700">
                얼리버드 할인
              </span>
              <span className="text-16 font-600 text-basic-red-400">
                {discountRate}%
              </span>
              <span className="text-16 font-600">
                {(earlybirdPrice * passengerCount).toLocaleString()}원
              </span>
            </p>
          )}
        </article>
        <Button
          variant="primary"
          size="large"
          type="button"
          onClick={handleSubmit}
        >
          예약하기
        </Button>
      </div>
    </div>
  );
};

export default ReservationInfoStep;
