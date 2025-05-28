'use client';

import HubButton from './components/HubButton';
import DateButton from './components/DateButton';
import BottomBar from './components/BottomBar';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useMemo, useState } from 'react';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useFunnel from '@/hooks/useFunnel';
import { EVENT_FORM_DEFAULT_VALUES, EVENT_STEPS } from '../../form.const';
import { EventWithRoutesViewEntity } from '@/types/event.type';
import {
  getPhaseAndEnabledStatus,
  EventEnabledStatus,
  EventPhase,
} from '@/utils/event.util';
import { FormProvider, useForm } from 'react-hook-form';
import { EventFormValues } from '../../form.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import DemandCompleteScreen, {
  DemandCompleteStatus,
} from '../demand-complete-screen/DemandCompleteScreen';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import Button from '@/components/buttons/button/Button';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';
import useBottomSheetText from './hooks/useBottomSheetText';
import useInputSectionText from './hooks/useInputSectionText';
import useHistory from './hooks/useHistory';
import useEventInitialization from './hooks/useEventInitialization';
import useAlertFeedBackScreen from './hooks/useAlertFeedBackScreen';
import StepComponent from '../steps/StepComponent';

interface Props {
  event: EventWithRoutesViewEntity;
}

const EventForm = ({ event }: Props) => {
  const { phase, enabledStatus } = getPhaseAndEnabledStatus(event);
  const isDisabled = enabledStatus === 'disabled';

  const { data: shuttleRoutesPages } = useGetShuttleRoutesOfEventWithPagination(
    {
      eventId: event.eventId,
      status: 'OPEN',
    },
    {
      enabled: event.hasOpenRoute,
    },
  );
  const shuttleRoutes = useMemo(
    () => shuttleRoutesPages?.pages.flatMap((page) => page.shuttleRoutes) ?? [],
    [shuttleRoutesPages],
  );
  const isShuttleRoutesLoading =
    event.hasOpenRoute && shuttleRoutes.length === 0;

  if (isShuttleRoutesLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
        <Button
          variant="secondary"
          size="medium"
          type="button"
          disabled={true}
        />
        <Button variant="primary" size="large" type="button" disabled={true} />
      </div>
    );
  }

  return (
    <section className={isDisabled ? '' : 'px-16 pb-24'}>
      <Content
        event={event}
        shuttleRoutes={shuttleRoutes}
        phase={phase}
        enabledStatus={enabledStatus}
      />
    </section>
  );
};

export default EventForm;

interface ContentProps {
  event: EventWithRoutesViewEntity;
  shuttleRoutes: ShuttleRoutesViewEntity[];
  phase: EventPhase;
  enabledStatus: EventEnabledStatus;
}

const Content = ({
  event,
  shuttleRoutes,
  phase,
  enabledStatus,
}: ContentProps) => {
  const { updateUserDemands, updateUserAlertRequests } = useEventInitialization(
    {
      event,
      shuttleRoutes,
    },
  );

  const methods = useForm<EventFormValues>({
    defaultValues: EVENT_FORM_DEFAULT_VALUES,
  });

  const initialStep = EVENT_STEPS[0];
  const { Funnel, Step, setStep, stepName } = useFunnel(
    EVENT_STEPS,
    initialStep,
  );

  const { isHistoryAvailable, setHistoryAndStep, handleBack, resetHistory } =
    useHistory({
      stepName,
      setStep,
    });

  const onBottomSheetClose = () => {
    resetHistory();
    setStep(initialStep);
    methods.reset(EVENT_FORM_DEFAULT_VALUES);
  };

  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet({
      onClose: onBottomSheetClose,
    });

  const { title: bottomSheetTitle, description: bottomSheetDescription } =
    useBottomSheetText({ stepName, getValues: methods.getValues });

  const isReservationOpen =
    phase === 'reservation' && enabledStatus === 'enabled';
  const { title: inputSectionTitle, description: inputSectionDescription } =
    useInputSectionText(isReservationOpen);

  const [demandCompleteStatus, setDemandCompleteStatus] =
    useState<DemandCompleteStatus | null>(null);

  const {
    isAlertRequestFeedbackScreenOpen,
    openAlertRequestFeedbackScreen,
    closeAlertRequestFeedbackScreen,
  } = useAlertFeedBackScreen({ closeBottomSheet });

  return (
    <>
      <form className="flex flex-col gap-8">
        {enabledStatus === 'enabled' && (
          <>
            <div className="-mx-16 mb-16 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
            <h3 className="mb-4 text-20 font-700">{inputSectionTitle}</h3>
            <p className="mb-16 text-16 font-500 text-basic-grey-600">
              {inputSectionDescription}
            </p>
            <DateButton disabled={!isReservationOpen} />
            <HubButton disabled={!isReservationOpen} />
          </>
        )}
        <BottomBar
          eventId={event.eventId}
          eventName={event.eventName}
          phase={phase}
          enabledStatus={enabledStatus}
          onClick={openBottomSheet}
        />
        <BottomSheet
          ref={bottomSheetRef}
          title={bottomSheetTitle}
          description={bottomSheetDescription}
          showBackButton={isHistoryAvailable}
          onBack={handleBack}
        >
          <FormProvider {...methods}>
            <div ref={contentRef} className="overflow-y-auto">
              <Funnel>
                {EVENT_STEPS.map((stepName) => (
                  <Step key={stepName} name={stepName}>
                    <StepComponent
                      stepName={stepName}
                      setHistoryAndStep={setHistoryAndStep}
                      closeBottomSheet={closeBottomSheet}
                      setDemandCompleteStatus={setDemandCompleteStatus}
                      updateUserDemands={updateUserDemands}
                      updateUserAlertRequests={updateUserAlertRequests}
                      openAlertRequestFeedbackScreen={
                        openAlertRequestFeedbackScreen
                      }
                      phase={phase}
                    />
                  </Step>
                ))}
              </Funnel>
            </div>
          </FormProvider>
        </BottomSheet>
      </form>
      {demandCompleteStatus !== null && (
        <DemandCompleteScreen
          status={demandCompleteStatus}
          setDemandCompleteStatus={setDemandCompleteStatus}
        />
      )}
      {isAlertRequestFeedbackScreenOpen && (
        <FeedbackScreen
          subject="빈자리 알림 신청"
          closeFeedbackScreen={closeAlertRequestFeedbackScreen}
        />
      )}
    </>
  );
};
