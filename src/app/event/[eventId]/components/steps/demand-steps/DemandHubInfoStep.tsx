'use client';

import Button from '@/components/buttons/button/Button';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { usePostDemand } from '@/services/demand.service';
import { eventAtom } from '../../../store/eventAtom';
import { useAtomValue } from 'jotai';
import { DemandCompleteStatus } from '../../demand-complete-screen/DemandCompleteScreen';
import { usePostCoupon } from '@/services/coupon.service';
import { useState } from 'react';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

const SHUTTLE_DEMAND_COUPON_CODE_PREFIX = 'DEMAND';

interface Props {
  closeBottomSheet: () => void;
  setDemandCompleteStatus: (status: DemandCompleteStatus) => void;
  updateUserDemands: () => void;
  trackCompleteDemand?: (
    selectedHub: string,
    tripType: string,
    eventDate: string,
  ) => void;
  isNoDemandRewardCouponEvent: boolean;
}

const DemandHubInfoStep = ({
  closeBottomSheet,
  setDemandCompleteStatus,
  updateUserDemands,
  trackCompleteDemand,
  isNoDemandRewardCouponEvent,
}: Props) => {
  const event = useAtomValue(eventAtom);
  const { getValues } = useFormContext<EventFormValues>();
  const [dailyEvent, selectedHubForDemand, tripType] = getValues([
    'dailyEvent',
    'selectedHubForDemand',
    'tripType',
  ]);

  const { mutateAsync: postDemand } = usePostDemand();
  const { mutateAsync: postCoupon } = usePostCoupon();

  const [isLoading, setIsLoading] = useState(false);

  const handleDemand = async () => {
    if (!event) {
      return;
    }
    const bodyWithoutRegionHub = {
      regionId: selectedHubForDemand.regionId,
      type: tripType,
      passengerCount: 1,
    };
    const body =
      tripType === 'ROUND_TRIP'
        ? {
            ...bodyWithoutRegionHub,
            toDestinationRegionHub: selectedHubForDemand,
            fromDestinationRegionHub: selectedHubForDemand,
          }
        : tripType === 'TO_DESTINATION'
          ? {
              ...bodyWithoutRegionHub,
              toDestinationRegionHub: selectedHubForDemand,
            }
          : {
              ...bodyWithoutRegionHub,
              fromDestinationRegionHub: selectedHubForDemand,
            };

    try {
      await postDemand({
        eventId: event.eventId,
        dailyEventId: dailyEvent.dailyEventId,
        body,
      });

      trackCompleteDemand?.(
        selectedHubForDemand.name,
        tripType,
        dailyEvent.date,
      );
      setDemandCompleteStatus('success');
      updateUserDemands();
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: 'DemandHubInfoStep',
          page: 'event-detail',
          feature: 'demand',
          action: 'submit-demand',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          eventId: event?.eventId,
          dailyEventId: dailyEvent.dailyEventId,
          hubInfo: {
            regionHubId: selectedHubForDemand.regionHubId,
            name: selectedHubForDemand.name,
          },
          tripType,
          demandDate: dailyEvent.date,
          timestamp: dayjs().toISOString(),
        },
      });
      setDemandCompleteStatus('fail');
    }
  };

  const handleCoupon = async () => {
    if (!event) {
      return;
    }

    const code = `${SHUTTLE_DEMAND_COUPON_CODE_PREFIX}-${event.eventId}`;

    try {
      await postCoupon(code);
    } catch (e) {
      Sentry.captureException(e, {
        tags: {
          component: 'DemandHubInfoStep',
          page: 'event-detail',
          feature: 'coupon',
          action: 'register-demand-coupon',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          eventId: event?.eventId,
          couponCode: code,
          timestamp: dayjs().toISOString(),
        },
      });
      console.error(e);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    await handleDemand();
    if (!isNoDemandRewardCouponEvent) {
      await handleCoupon();
    }
    closeBottomSheet();
    setIsLoading(false);
  };

  return (
    <>
      <section className="flex w-full flex-col gap-16">
        <article className="flex flex-col items-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
          <h3 className="text-center text-18 font-600 leading-[160%] text-basic-grey-700">
            <span>[{TRIP_STATUS_TO_STRING[tripType]}]</span>
            <br />
            <span>{selectedHubForDemand.name}</span>
          </h3>
        </article>
        <Button
          variant="primary"
          size="large"
          type="button"
          onClick={handleClick}
          disabled={isLoading}
        >
          요청하기
        </Button>
      </section>
    </>
  );
};

export default DemandHubInfoStep;
