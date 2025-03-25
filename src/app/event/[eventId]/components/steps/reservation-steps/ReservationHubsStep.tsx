'use client';

import Button from '@/components/buttons/button/Button';
import PinIcon from '../../../icons/pin-small.svg';
import Tooltip from '@/components/tooltip/Tooltip';
import { DANGER_SEAT_THRESHOLD } from '../../../constants.const';
import RequestSeatAlarmButton from '../../RequestSeatAlarmButton';

const ReservationHubsStep = () => {
  const regionsWithHubs = MOCK_REGIONS_WITH_HUBS;

  return (
    <section>
      {regionsWithHubs.map((regionWithHubs) => (
        <article key={regionWithHubs.name}>
          <div className="mb-4 flex h-[26px] items-center gap-[2px]">
            <PinIcon />
            <h6 className="text-14 font-700 text-basic-grey-600">
              {regionWithHubs.name}
            </h6>
          </div>
          <ul>
            {regionWithHubs.hubs.map((hub) => (
              <button
                key={hub.shuttleRouteHubId}
                onClick={() => {}}
                type="button"
                className="flex h-[55px] w-full items-center justify-between gap-8 py-12"
              >
                <span className="text-16 font-600 text-basic-grey-700">
                  {hub.name}
                </span>
                {hub.remainingSeat > 0 ? (
                  <span
                    className={`text-14 font-500 ${
                      hub.remainingSeat > DANGER_SEAT_THRESHOLD
                        ? 'text-basic-grey-500'
                        : 'text-basic-red-400'
                    }`}
                  >
                    {hub.remainingSeat}석 남음
                  </span>
                ) : (
                  <RequestSeatAlarmButton />
                )}
              </button>
            ))}
          </ul>
          <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
        </article>
      ))}
      <div className="flex items-center justify-between gap-8 pb-12">
        <p className="flex h-[26px] items-center gap-4">
          <span className="text-16 font-600 text-basic-grey-700">
            찾는 정류장이 없다면?
          </span>
          <Tooltip content="예약 시 원하는 지역이 보이지 않는다면, 해당 정류장은 수요조사가 진행 중이에요. 충분한 인원이 모여 노선이 열릴 수 있도록 수요조사에 참여해 보세요!" />
        </p>
        <Button variant="tertiary" size="small">
          요청하기
        </Button>
      </div>
    </section>
  );
};

export default ReservationHubsStep;

const MOCK_HUBS = [
  {
    shuttleRouteHubId: '1',
    regionHubId: '1',
    name: '삼성역',
    address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    latitude: 37.494444,
    longitude: 126.860833,
    type: 'TO_DESTINATION',
    sequence: 1,
    arrivalTime: '10:00',
    status: 'ACTIVE',
    regionId: '1',
    remainingSeat: 20,
  },
  {
    shuttleRouteHubId: '2',
    regionHubId: '1',
    name: '강남역',
    address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    latitude: 37.494444,
    longitude: 126.860833,
    type: 'TO_DESTINATION',
    sequence: 1,
    arrivalTime: '10:00',
    status: 'ACTIVE',
    regionId: '1',
    remainingSeat: 3,
  },
  {
    shuttleRouteHubId: '3',
    regionHubId: '1',
    name: '역삼역',
    address: '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    latitude: 37.494444,
    longitude: 126.860833,
    type: 'TO_DESTINATION',
    sequence: 1,
    arrivalTime: '10:00',
    status: 'ACTIVE',
    regionId: '1',
    remainingSeat: 0,
  },
];

const MOCK_REGIONS_WITH_HUBS = [
  {
    name: '강남구',
    hubs: MOCK_HUBS,
  },
  {
    name: '마포구',
    hubs: MOCK_HUBS,
  },
];
