import { HandyStatus } from '@/types/reservation.type';
import { ShuttleBusesViewEntity } from '@/types/shuttleBus.type';
import useText from './hooks/useText';
import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import CheckIcon from './icons/icon-check.svg';

interface Props {
  reservationProgress: ReservationProgress;
  isOpenChatLinkCreated: boolean;
  handyStatus: HandyStatus;
  shuttleBus: ShuttleBusesViewEntity | null | undefined;
  isHandyParty: boolean;
}

const HandyPartyProgressSection = ({
  reservationProgress,
  isOpenChatLinkCreated,
  handyStatus,
  shuttleBus,
  isHandyParty,
}: Props) => {
  const isHandy = handyStatus === 'ACCEPTED';

  const { progressText, descriptionText } = useText({
    reservationProgress,
    isOpenChatLinkCreated,
    isHandy,
    isHandyParty,
  });

  const shuttleBusNumber =
    reservationProgress === 'afterBusAssigned' ? shuttleBus?.busNumber : '';

  return (
    <section className="px-16">
      <h3 className="pb-16 text-16 font-600">셔틀 진행 상황</h3>
      <div className="pb-16">
        <h4 className="flex items-center justify-between pb-12 text-16 font-600">
          <div className="flex items-center gap-8">
            <span
              className={
                reservationProgress === 'shuttleEnded'
                  ? 'text-basic-grey-500'
                  : ''
              }
            >
              {progressText}
            </span>
            {shuttleBusNumber && (
              <div className="rounded-full border border-basic-grey-200 px-8 py-4 text-10 font-600 text-basic-grey-700">
                {shuttleBusNumber}
              </div>
            )}
          </div>
        </h4>
        <TaxiRouteProgressBar reservationProgress={reservationProgress} />
      </div>
      <div>
        <p className="pb-8 text-14 font-500 text-basic-grey-700">
          {descriptionText}
        </p>
      </div>
    </section>
  );
};

export default HandyPartyProgressSection;

interface TaxiRouteProgressBarProps {
  reservationProgress: ReservationProgress;
}

const TaxiRouteProgressBar = ({
  reservationProgress,
}: TaxiRouteProgressBarProps) => {
  const isStep2Completed = reservationProgress === 'afterBusAssigned';
  const isShuttleEnded = reservationProgress === 'shuttleEnded';

  return (
    <div className="flex items-center gap-[6px]">
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded ? 'bg-basic-grey-200' : 'bg-basic-black'
        }`}
      >
        <CheckIcon />
      </div>
      <div
        className={`h-[2px] flex-1 rounded-full bg-basic-black ${
          isShuttleEnded ? 'bg-basic-grey-200' : 'bg-basic-black'
        }`}
      />
      <div
        className={`flex h-[28px] w-[28px] items-center justify-center rounded-full bg-basic-black text-14 font-600 text-basic-grey-500 ${
          isShuttleEnded
            ? 'bg-basic-grey-200'
            : isStep2Completed
              ? 'bg-basic-black'
              : 'bg-basic-grey-200'
        }`}
      >
        {isStep2Completed ? <CheckIcon /> : 2}
      </div>
    </div>
  );
};
