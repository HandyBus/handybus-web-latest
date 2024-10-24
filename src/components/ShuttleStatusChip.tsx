import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  status: 'demand-survey' | 'pending' | 'closed' | 'ended';
}

const ShuttleStatusChip = ({ status }: Props) => {
  switch (status) {
    case 'demand-survey':
      return (
        <div className="w-fit whitespace-nowrap  rounded-full  bg-[#FEF87A] px-[14px] py-[3px] text-black">
          수요 확인 중
        </div>
      );

    case 'pending':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-primary-main px-[14px] py-[3px] text-white">
          예약 모집 중
        </div>
      );

    case 'closed':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-black px-[14px] py-[3px] text-white">
          예약 마감
        </div>
      );
    case 'ended':
      return (
        <div className="w-fit whitespace-nowrap rounded-full bg-grey-100 px-[14px] py-[3px] text-black">
          운행 종료
        </div>
      );
  }
};

export default ShuttleStatusChip;
