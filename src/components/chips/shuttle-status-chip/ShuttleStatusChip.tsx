interface Props {
  status:
    | 'DEMAND_SURVEY'
    | 'SURVEY_CLOSED'
    | 'PENDING'
    | 'RESERVATION_CLOSED'
    | 'ENDED'
    | undefined;
}

const ShuttleStatusChip = ({ status }: Props) => {
  switch (status) {
    case 'DEMAND_SURVEY':
      return (
        <div className="w-fit whitespace-nowrap  rounded-full  bg-[#FEF87A] px-[14px] py-[3px] text-black">
          수요 확인 중
        </div>
      );
    case 'SURVEY_CLOSED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-black px-[14px] py-[3px] text-white">
          수요 신청 마감
        </div>
      );
    case 'PENDING':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-primary-main px-[14px] py-[3px] text-white">
          예약 모집 중
        </div>
      );
    case 'RESERVATION_CLOSED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-black px-[14px] py-[3px] text-white">
          예약 마감
        </div>
      );
    case 'ENDED':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-grey-100 px-[14px] py-[3px] text-black">
          운행 종료
        </div>
      );
  }
};

export default ShuttleStatusChip;
