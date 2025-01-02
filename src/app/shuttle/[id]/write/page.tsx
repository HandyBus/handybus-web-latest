'use client';

import {
  SECTION,
  ShuttleRoute,
  ShuttleRouteHubObject,
} from '@/types/shuttle.types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import useFunnel from '@/hooks/useFunnel';
import NoticeSection, {
  NOTICE_TYPE,
} from '@/components/notice-section/NoticeSection';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import ReservationCompleted from './sections/ReservationCompleted';
import ApplyHandy from './sections/ApplyHandy';
import TotalPriceInfo from './sections/TotalPriceInfo';
import PriceDetail from './sections/PriceDetail';
import ReservationInfo from './sections/ReservationInfo';
import ReservationShuttleInfo from './sections/ReservationShuttleInfo';
import PassengerForm from './sections/PassengerForm';
import StepLayout from './sections/StepLayout';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import TossPayment from './sections/TossPayments';
import { fetchAllShuttles } from '../../util/fetch.util';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import PassengerInfo from './sections/PassengerInfo';
import { IssuedCouponType } from '@/types/client.types';
import BannerImage from '@/app/demand/[id]/write/components/BannerImage';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';

export interface PassengerInfoType {
  name: string;
  phoneNumber: string;
}

export interface ReservationFormData {
  shuttleRoute: { label: string; value: number };
  dailyShuttle: { label: string; value: number };
  tripType: { label: string; value: string };
  passengerCount: number;
  passengers: PassengerInfoType[];
  isHandy: boolean;
  toDestinationHubId: string;
  fromDestinationHubId: string;
  selectedCoupon: IssuedCouponType;
  finalPrice: number;
  postCoupon: string;
}

export interface DailyShuttle {
  dailyShuttleId: number;
  date: string;
  status: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE';
}

interface Props {
  params: {
    id: string;
  };
}

const ShuttleWrite = ({ params }: Props) => {
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel([
    1, 2, 3, 4,
  ]);
  const methods = useForm<ReservationFormData>({
    defaultValues: {
      shuttleRoute: undefined,
      dailyShuttle: undefined,
      tripType: undefined,
      passengerCount: 0,
      passengers: [],
      isHandy: false,
      toDestinationHubId: '',
      fromDestinationHubId: '',
      selectedCoupon: undefined,
      finalPrice: 0,
      postCoupon: '',
    },
    mode: 'onChange',
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const passengerCount = watch('passengerCount');
  const tripType: { label: string; value: string } | undefined =
    watch('tripType');
  const watchDailyShuttle: { label: string; value: number } | undefined =
    watch('dailyShuttle');
  const watchShuttleRoute: { label: string; value: number } | undefined =
    watch('shuttleRoute');
  const watchPassengers: PassengerInfoType[] = watch('passengers');
  const watchCoupon = watch('selectedCoupon');
  const pickupHub = watch('toDestinationHubId');
  const dropoffHub = watch('fromDestinationHubId');
  const [shuttleData, setShuttleData] = useState<ShuttleRoute[]>([]);
  const [dailyShuttleRouteArray, setDailyShuttleRouteArray] = useState<
    ShuttleRoute[]
  >([]);
  const [dailyShuttleArray, setDailyShuttleArray] = useState<
    DailyShuttle[] | undefined
  >(undefined);
  const [routeHubsToDestination, setRouteHubsToDestination] = useState<
    ShuttleRouteHubObject[]
  >([]);
  const [routeHubsFromDestination, setRouteHubsFromDestination] = useState<
    ShuttleRouteHubObject[]
  >([]);
  const [currentShuttleData, setCurrentShuttleData] = useState<
    ShuttleRoute | undefined
  >(undefined);
  const { data } = useQuery({
    queryKey: ['shuttle', params.id],
    queryFn: () => fetchAllShuttles(),
  });

  // ShuttleId 에 해당하는 DATA
  useEffect(() => {
    if (data && data.length > 0) {
      const shuttleData = data.filter(
        (v) => v.shuttle.shuttleId === Number(params.id),
      );
      setShuttleData(shuttleData);
      setDailyShuttleArray(shuttleData[0].shuttle.dailyShuttles);
    }
  }, [data, params.id]);

  useEffect(() => {
    if (watchDailyShuttle) {
      const dailyShuttleRoutes = shuttleData.filter(
        (v) => v.dailyShuttleId === watchDailyShuttle.value,
      );
      setDailyShuttleRouteArray(dailyShuttleRoutes);
    }
  }, [watchDailyShuttle]);

  useEffect(() => {
    if (watchShuttleRoute) {
      const routeHubsToDestination =
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value)
          ?.hubs.toDestination ?? [];
      const routeHubsFromDestination =
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value)
          ?.hubs.fromDestination ?? [];
      setRouteHubsToDestination(routeHubsToDestination);
      setRouteHubsFromDestination(routeHubsFromDestination);
      setCurrentShuttleData(
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value),
      );
    }
  }, [watchShuttleRoute]);

  // const handlePassengerCountChange = (
  //   newCount: number | ((prev: number) => number),
  // ) => {
  //   const count =
  //     typeof newCount === 'function' ? newCount(passengerCount) : newCount;
  //   setValue('passengerCount', count);
  //   setValue('passengers', Array(count).fill({ name: '', phoneNumber: '' }));
  // };

  const determineStep1 = useCallback(() => {
    let isSelectedHubs: boolean = false;
    if (tripType?.value === 'ROUND_TRIP')
      isSelectedHubs = Boolean(pickupHub && dropoffHub);
    if (tripType?.value === 'TO_DESTINATION')
      isSelectedHubs = Boolean(pickupHub);
    if (tripType?.value === 'FROM_DESTINATION')
      isSelectedHubs = Boolean(dropoffHub);

    if (watchDailyShuttle && watchShuttleRoute && tripType && isSelectedHubs)
      return false;
    return true;
  }, [watchDailyShuttle, watchShuttleRoute, tripType, pickupHub, dropoffHub]);

  const determineStep2 = useCallback(() => {
    if (
      passengerCount > 0 &&
      watchPassengers?.length > 0 &&
      watchPassengers.every(
        (passenger) =>
          passenger?.name?.trim() && passenger?.phoneNumber?.trim(),
      ) &&
      !errors.passengers
    )
      return false;
    return true;
  }, [passengerCount, watchPassengers, errors]);

  if (!data || !dailyShuttleArray || !dailyShuttleRouteArray) return null;
  return (
    <main>
      <FormProvider {...methods}>
        <Funnel>
          <Step name={1}>
            <StepLayout step={1} shuttleInfoData={shuttleData[0].shuttle}>
              <ReservationShuttleInfo
                control={control}
                dailyShuttleArray={dailyShuttleArray}
                dailyShuttleRouteArray={dailyShuttleRouteArray}
              />
              <div id="divider" className="my-16 h-[8px] bg-grey-50" />
              <ShuttleRouteVisualizer
                type={
                  tripType?.value as
                    | 'ROUND_TRIP'
                    | 'TO_DESTINATION'
                    | 'FROM_DESTINATION'
                }
                toDestinationObject={routeHubsToDestination}
                fromDestinationObject={routeHubsFromDestination}
                section={SECTION.RESERVATION_DETAIL}
              />
              <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
              <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
              <BottomBar
                type={`RESERVATION_WRITE_1` as BottomBarType}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                disabled={determineStep1()}
              />
            </StepLayout>
          </Step>

          <Step name={2}>
            <StepLayout step={2} shuttleInfoData={shuttleData[0].shuttle}>
              <Controller
                control={methods.control}
                name="passengerCount"
                render={({ field: { value, onChange } }) => (
                  <PassengerCount
                    count={value}
                    setCount={(newValue) => onChange(newValue)}
                  />
                )}
              />
              {Array.from({ length: passengerCount }).map((_, index) => (
                <PassengerForm
                  key={index}
                  index={index}
                  control={control}
                  setValue={setValue}
                />
              ))}
              <BottomBar
                type={`RESERVATION_WRITE_2` as BottomBarType}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                disabled={determineStep2()}
                currentShuttleData={currentShuttleData}
              />
            </StepLayout>
          </Step>

          <Step name={3}>
            <StepLayout step={3} shuttleInfoData={shuttleData[0].shuttle}>
              <ReservationInfo shuttleData={shuttleData} />
              <Divider />
              <PassengerInfo passengers={watchPassengers} />
              <Divider />
              <ApplyHandy />
              <Divider />
              <TotalPriceInfo shuttleData={shuttleData} />
              <Divider />
              <TossPayment
                shuttleRouteId={watchShuttleRoute?.value}
                type={
                  tripType?.value as
                    | 'ROUND_TRIP'
                    | 'TO_DESTINATION'
                    | 'FROM_DESTINATION'
                }
                toDestinationShuttleRouteHubId={pickupHub}
                fromDestinationShuttleRouteHubId={dropoffHub}
                passengers={watchPassengers}
                handleNextStep={handleNextStep}
                shuttleData={shuttleData}
              />
            </StepLayout>
          </Step>

          <Step name={4}>
            <StepLayout step={4} shuttleInfoData={shuttleData[0].shuttle}>
              <ReservationCompleted />
              <BannerImage demandData={shuttleData[0].shuttle} />
              <ReservationInfo shuttleData={shuttleData} />
              <PassengerInfo passengers={watchPassengers} />
              <section className="px-16 pb-24 pt-32">
                <PriceDetail
                  SelectedCoupon={watchCoupon}
                  shuttleData={shuttleData}
                />
              </section>
              <BottomBar type={`RESERVATION_WRITE_4` as BottomBarType} />
            </StepLayout>
          </Step>
        </Funnel>
      </FormProvider>
    </main>
  );
};

export default ShuttleWrite;

const Divider = () => <div className="h-[8px] bg-grey-50" />;
