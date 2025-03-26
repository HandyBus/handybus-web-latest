'use client';

import Badge from '@/components/badge/Badge';
import RequestSeatAlarmButton from '../../RequestSeatAlarmButton';

interface Props {
  toReservationTripTypeStep: () => void;
  toExtraSeatAlarmStep: () => void;
}

const ExtraDuplicateHubStep = ({
  toReservationTripTypeStep,
  toExtraSeatAlarmStep,
}: Props) => {
  return (
    <section className="flex w-full flex-col gap-8">
      {[1, 2, 3].map((_, index) => (
        <Hub
          key={index}
          toReservationTripTypeStep={toReservationTripTypeStep}
          toExtraSeatAlarmStep={toExtraSeatAlarmStep}
          remainingSeatCount={{
            toDestination: 0,
            fromDestination: 20,
          }}
        />
      ))}
    </section>
  );
};

export default ExtraDuplicateHubStep;

interface HubProps {
  toReservationTripTypeStep: () => void;
  toExtraSeatAlarmStep: () => void;
  remainingSeatCount: {
    toDestination: number;
    fromDestination: number;
  };
}

const Hub = ({
  toReservationTripTypeStep,
  toExtraSeatAlarmStep,
  remainingSeatCount,
}: HubProps) => {
  const isToDestinationSoldOut = remainingSeatCount.toDestination === 0;
  const isFromDestinationSoldOut = remainingSeatCount.fromDestination === 0;
  const isAllSoldOut = isToDestinationSoldOut && isFromDestinationSoldOut;

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toReservationTripTypeStep}
        disabled={isAllSoldOut}
        className="flex w-full flex-col gap-12 rounded-8 bg-basic-grey-50 p-16 text-left"
      >
        <div
          className={`flex h-[31px] items-center gap-8 ${
            isToDestinationSoldOut && 'pr-124'
          }`}
        >
          <Badge className="bg-basic-white text-basic-grey-700">가는 편</Badge>
          <div className="flex-1 text-14 font-500 text-basic-grey-700">
            오전 09:30 출발
          </div>
          {!isToDestinationSoldOut && (
            <div className="shrink-0 text-14 font-500 text-basic-grey-500">
              {remainingSeatCount.toDestination}석 남음
            </div>
          )}
        </div>
        <div
          className={`flex h-[31px] items-center gap-8 ${
            isFromDestinationSoldOut && 'pr-124'
          }`}
        >
          <Badge className="bg-basic-grey-200 text-basic-grey-700">
            오는 편
          </Badge>
          <div className="flex-1 text-14 font-500 text-basic-grey-700">
            오후 10:00 출발
          </div>
          {!isFromDestinationSoldOut && (
            <div className="shrink-0 text-14 font-500 text-basic-grey-500">
              {remainingSeatCount.fromDestination}석 남음
            </div>
          )}
        </div>
      </button>
      {isToDestinationSoldOut && (
        <div className="absolute right-16 top-16 flex items-center gap-8">
          <RequestSeatAlarmButton toStep={toExtraSeatAlarmStep} />
          <span className="text-14 font-500 text-basic-grey-500">매진</span>
        </div>
      )}
      {isFromDestinationSoldOut && (
        <div className="absolute bottom-16 right-16 flex items-center gap-8">
          <RequestSeatAlarmButton toStep={toExtraSeatAlarmStep} />
          <span className="text-14 font-500 text-basic-grey-500">매진</span>
        </div>
      )}
    </div>
  );
};
