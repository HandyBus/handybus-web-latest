'use client';

import Button from '@/components/buttons/button/Button';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { usePostDemand } from '@/services/demand.service';
import { eventAtom } from '../../../store/eventAtom';
import { useAtomValue } from 'jotai';
import { DemandCompleteStatus } from '../../demand-complete-screen/DemandCompleteScreen';
interface Props {
  closeBottomSheet: () => void;
  setDemandCompleteStatus: (status: DemandCompleteStatus) => void;
}

const DemandHubInfoStep = ({
  closeBottomSheet,
  setDemandCompleteStatus,
}: Props) => {
  const event = useAtomValue(eventAtom);
  const { getValues } = useFormContext<EventFormValues>();
  const [dailyEvent, selectedHubForDemand, tripType] = getValues([
    'dailyEvent',
    'selectedHubForDemand',
    'tripType',
  ]);

  const { mutateAsync, isPending } = usePostDemand();

  const handleDemandClick = async () => {
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
      await mutateAsync({
        eventId: event.eventId,
        dailyEventId: dailyEvent.dailyEventId,
        body,
      });
      setDemandCompleteStatus('success');
    } catch {
      setDemandCompleteStatus('fail');
    } finally {
      closeBottomSheet();
    }
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
          onClick={handleDemandClick}
          disabled={isPending}
        >
          요청하기
        </Button>
      </section>
    </>
  );
};

export default DemandHubInfoStep;
