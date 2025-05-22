'use client';

import Tabs from '@/components/tab/Tabs';
import { useState } from 'react';
import InfoIcon from '../icons/info.svg';
// import PinIcon from '../icons/pin-primary.svg';
// import DotPrimaryIcon from '../icons/dot-primary.svg';
// import DotTertiaryIcon from '../icons/dot-tertiary.svg';
// import {
//   ShuttleRouteHubsInShuttleRoutesViewEntity,
//   TripType,
// } from '@/types/shuttleRoute.type';
// import { dateString } from '@/utils/dateString.util';
// import { customTwMerge } from 'tailwind.config';

// eventLocation: 이벤트 장소
// primary: 선택된 정류장
// secondary: 경유 정류장 (유저 입장)
// tertiary: 경유하지 않는 정류장 (유저 입장)
// type HubType = 'eventLocation' | 'primary' | 'secondary' | 'tertiary';

const ShuttleRouteDetailView = () => {
  const [currentTab, setCurrentTab] = useState<
    'TO_DESTINATION' | 'FROM_DESTINATION'
  >('TO_DESTINATION');

  return (
    <>
      <div className="h-8 w-full bg-basic-grey-50" />
      <section className="px-16 py-24">
        <h3 className="pb-16 text-20 font-700">
          <span className="text-brand-primary-400">양재역</span>을 지나는
          노선이에요
        </h3>
        <Tabs
          items={
            [
              { label: '가는 편', value: 'TO_DESTINATION' },
              { label: '오는 편', value: 'FROM_DESTINATION' },
            ] as const
          }
          selected={currentTab}
          onSelect={(value) => {
            setCurrentTab(value);
          }}
        />
        <div className="my-16 grid grid-cols-[20px_1fr] gap-4 rounded-6 bg-basic-grey-50 p-8">
          <InfoIcon />
          <p className="text-12 font-500 text-basic-grey-600">
            배차 과정에서 추가 정류지가 생기거나 정차 시각이 변경될 수 있어요.
            변동이 생기면 미리 알려드릴게요.
          </p>
        </div>
        <div className="flex w-full gap-12">
          <div className="flex w-12 shrink-0 flex-col items-center pt-[7px]">
            {/* <RouteLine
              hubs={sortedHubs}
              selectedHubIndex={selectedHubIndex}
              tripType={tripType}
              showDetail={showDetail}
              isEditMode={isEditMode}
              stagedShuttleRouteHubId={stagedShuttleRouteHubId}
            /> */}
          </div>
          <div className="flex flex-1 flex-col gap-12">
            {/* <Hubs
              hubs={sortedHubs}
              selectedHubIndex={selectedHubIndex}
              tripType={tripType}
              showDetail={showDetail}
              isEditMode={isEditMode}
              stagedShuttleRouteHubId={stagedShuttleRouteHubId}
              setStagedShuttleRouteHubId={setStagedShuttleRouteHubId}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShuttleRouteDetailView;

// interface HubsProps {
//   hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
//   selectedHubIndex: number;
//   tripType: TripType;
//   showDetail: boolean;
//   isEditMode: boolean;
//   stagedShuttleRouteHubId: string | undefined;
//   setStagedShuttleRouteHubId: (shuttleRouteHubId: string | undefined) => void;
// }

// const Hubs = ({
//   hubs,
//   selectedHubIndex,
//   tripType,
//   showDetail,
//   isEditMode,
//   stagedShuttleRouteHubId,
//   setStagedShuttleRouteHubId,
// }: HubsProps) => {
//   return (
//     <>
//       {hubs.map((hub, index) => {
//         const type = getHubType({
//           index,
//           selectedHubIndex,
//           tripType,
//           length: hubs.length,
//         });
//         return (
//           <Hub
//             key={hub.shuttleRouteHubId}
//             type={type}
//             time={hub.arrivalTime}
//             name={hub.name}
//             showDetail={showDetail}
//             isEditMode={isEditMode}
//             isSelectedInEditMode={
//               stagedShuttleRouteHubId === hub.shuttleRouteHubId
//             }
//             onClick={() => setStagedShuttleRouteHubId(hub.shuttleRouteHubId)}
//           />
//         );
//       })}
//     </>
//   );
// };

// interface HubProps {
//   type: HubType;
//   time: string;
//   name: string;
//   showDetail: boolean;
//   isEditMode: boolean;
//   isSelectedInEditMode: boolean;
//   onClick: () => void;
// }

// const Hub = ({
//   type,
//   time,
//   name,
//   showDetail,
//   isEditMode,
//   isSelectedInEditMode,
//   onClick,
// }: HubProps) => {
//   const formattedTime = dateString(time, {
//     showYear: false,
//     showDate: false,
//     showWeekday: false,
//     showTime: true,
//   });
//   const isHidden = !showDetail && (type === 'secondary' || type === 'tertiary');

//   return (
//     <button
//       type="button"
//       disabled={!isEditMode || type === 'eventLocation'}
//       className={customTwMerge(
//         'flex h-[26px] items-center gap-[9px]',
//         isHidden && 'hidden',
//       )}
//       onClick={onClick}
//     >
//       <span
//         className={`shrink-0 text-14 font-500 ${
//           !isEditMode
//             ? type === 'eventLocation'
//               ? 'text-basic-grey-700'
//               : type === 'primary'
//                 ? 'text-basic-grey-700'
//                 : type === 'secondary'
//                   ? 'text-basic-grey-700'
//                   : 'text-basic-grey-500'
//             : isSelectedInEditMode || type === 'eventLocation'
//               ? 'text-basic-grey-700'
//               : 'text-basic-grey-500'
//         }`}
//       >
//         {formattedTime}
//       </span>
//       <span
//         className={`line-clamp-1 text-16 ${
//           !isEditMode
//             ? type === 'eventLocation'
//               ? 'font-600 text-basic-black'
//               : type === 'primary'
//                 ? 'font-600 text-basic-black'
//                 : type === 'secondary'
//                   ? 'font-500 text-basic-grey-700'
//                   : 'font-500 text-basic-grey-500'
//             : isSelectedInEditMode || type === 'eventLocation'
//               ? 'font-600 text-basic-black'
//               : 'font-500 text-basic-grey-700'
//         }`}
//       >
//         {name}
//       </span>
//     </button>
//   );
// };

// interface RouteLineProps {
//   hubs: ShuttleRouteHubsInShuttleRoutesViewEntity[];
//   selectedHubIndex: number;
//   tripType: TripType;
//   showDetail: boolean;
//   isEditMode: boolean;
//   stagedShuttleRouteHubId: string | undefined;
// }

// const RouteLine = ({
//   hubs,
//   selectedHubIndex,
//   tripType,
//   showDetail,
//   isEditMode,
//   stagedShuttleRouteHubId,
// }: RouteLineProps) => {
//   return (
//     <>
//       {hubs.map((hub, index) => {
//         const type = getHubType({
//           index,
//           selectedHubIndex,
//           tripType,
//           length: hubs.length,
//         });
//         const isHidden =
//           !showDetail && (type === 'secondary' || type === 'tertiary');
//         if (isHidden) {
//           return null;
//         }

//         const getHubIcon = (): ReactNode => {
//           if (isEditMode) {
//             if (type === 'eventLocation') {
//               return <PinIcon />;
//             }
//             if (stagedShuttleRouteHubId === hub.shuttleRouteHubId) {
//               return <DotPrimaryIcon />;
//             }
//             return <DotTertiaryIcon />;
//           }

//           switch (type) {
//             case 'primary':
//               return <DotPrimaryIcon />;
//             case 'secondary':
//               return <DotPrimaryIcon />;
//             case 'tertiary':
//               return <DotTertiaryIcon />;
//             case 'eventLocation':
//               return <PinIcon />;
//             default:
//               return null;
//           }
//         };
//         const HubIcon = getHubIcon();

//         const Line = (
//           <div
//             key={index}
//             className={customTwMerge(
//               'my-[-2px] h-[31.2px] w-[2px]',
//               type === 'tertiary' || isEditMode
//                 ? 'bg-basic-grey-200'
//                 : 'bg-brand-primary-400',
//             )}
//           />
//         );

//         if (tripType === 'TO_DESTINATION') {
//           return (
//             <>
//               <div className="relative z-10">{HubIcon}</div>
//               {index !== hubs.length - 1 && Line}
//             </>
//           );
//         } else {
//           return (
//             <>
//               {index !== 0 && Line}
//               <div className="relative z-10">{HubIcon}</div>
//             </>
//           );
//         }
//       })}
//     </>
//   );
// };

// const getHubType = ({
//   index,
//   selectedHubIndex,
//   tripType,
//   length,
// }: {
//   index: number;
//   selectedHubIndex: number;
//   tripType: TripType;
//   length: number;
// }): HubType => {
//   if (index === selectedHubIndex) {
//     return 'primary';
//   }
//   if (tripType === 'TO_DESTINATION') {
//     if (index === length - 1) {
//       return 'eventLocation';
//     }
//     return index > selectedHubIndex ? 'secondary' : 'tertiary';
//   }
//   if (tripType === 'FROM_DESTINATION') {
//     if (index === 0) {
//       return 'eventLocation';
//     }
//     return index < selectedHubIndex ? 'secondary' : 'tertiary';
//   }
//   return 'secondary';
// };
