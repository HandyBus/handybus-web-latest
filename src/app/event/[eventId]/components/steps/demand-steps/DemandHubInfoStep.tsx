'use client';

import Button from '@/components/buttons/button/Button';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { toast } from 'react-toastify';

const DemandHubInfoStep = () => {
  const { getValues } = useFormContext<EventFormValues>();
  const [selectedHubForDemand, tripType] = getValues([
    'selectedHubForDemand',
    'tripType',
  ]);

  const handleDemandClick = () => {
    console.log(selectedHubForDemand, tripType);
    toast.success('개발 중 . . .');
  };

  return (
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
      >
        요청하기
      </Button>
    </section>
  );
};

export default DemandHubInfoStep;
