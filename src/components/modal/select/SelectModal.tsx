import CustomModal from '../CustomModal';
import ChevronRight from 'public/icons/quill-chevron-right.svg';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Button from '../../buttons/button/Button';
dayjs.locale('ko');

interface RouteInfo {
  placeInfo: string;
  onSelect: () => void;
}

interface Props {
  isOpen: boolean;
  onClosed: () => void;
  scheduledData: string;
  hubPlaceInfo: string;
  shuttleBusRoutes: RouteInfo[];
}

// TODO: remove test data
const SelectModal = ({
  isOpen,
  onClosed,
  scheduledData = '2024-08-24 10:00:00',
  hubPlaceInfo = '서울특별시 동대문구',
  shuttleBusRoutes = [
    { placeInfo: '노원 - DDP 노선', onSelect: () => {} },
    { placeInfo: '광화문 - 신당 노선', onSelect: () => {} },
  ],
}: Props) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onClosed={onClosed}
      styles="z-50 flex max-h-[366px] w-[301px] flex-col items-center justify-center gap-16 bg-white px-24 py-20 rounded-[20px]"
    >
      <SelectModalContent
        scheduledData={scheduledData}
        hubPlaceInfo={hubPlaceInfo}
        shuttleBusRoutes={shuttleBusRoutes}
        onClosed={onClosed}
      />
    </CustomModal>
  );
};

export default SelectModal;

interface SelectModalContentProps {
  scheduledData: string;
  hubPlaceInfo: string;
  shuttleBusRoutes: RouteInfo[];
  onClosed: () => void;
}

const SelectModalContent = ({
  scheduledData,
  hubPlaceInfo,
  shuttleBusRoutes,
  onClosed,
}: SelectModalContentProps) => {
  const convetScheduledData = dayjs(scheduledData).format(
    'YYYY년 MM월 DD일 (ddd)',
  );

  return (
    <>
      <h2 id="modal-title" className="text-22 font-700 leading-[30.8px]">
        현재 예약을 받고 있는 노선이 있어요
      </h2>
      <p
        id="modal-description"
        className="text-16 font-500 leading-6 text-grey-500"
      >
        <span className="leading-[25.6px] text-grey-700">
          {convetScheduledData}
        </span>
        에{' '}
        <span className="leading-[25.6px] text-grey-700">{hubPlaceInfo}</span>
        에서 탈 만한 노선을 알려드릴게요.
      </p>
      <div id="suttle-bus-route-information" className="flex flex-col gap-8">
        {shuttleBusRoutes
          ? shuttleBusRoutes.map((route, index) => (
              <SelectModalButton
                id={`${route.placeInfo}-${index}`}
                key={`${route.placeInfo}-${index}`}
                onClick={route.onSelect}
              >
                {route.placeInfo}
              </SelectModalButton>
            ))
          : '노선 정보가 없습니다.'}
      </div>
      <div className="flex w-[100%] flex-col gap-8">
        <Button variant="secondary" onClick={onClosed}>
          이동 안 할래요
        </Button>
      </div>
    </>
  );
};

const SelectModalButton = ({
  children,
}: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className="h-58 flex w-252 items-center justify-between rounded-[11px] border border-grey-200 px-24 py-16"
    >
      <p className="text-16 font-500 leading-[25.6px] text-grey-900">
        {children}
      </p>
      <ChevronRight />
    </button>
  );
};
