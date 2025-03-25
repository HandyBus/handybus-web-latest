'use client';

import PinIcon from '../../../icons/pin-small.svg';

const DemandHubsStep = () => {
  const regionsWithHubs = MOCK_REGIONS_WITH_HUBS;

  return (
    <section>
      {regionsWithHubs.map((regionWithHubs, index) => (
        <article key={regionWithHubs.name}>
          <div className="mb-4 flex h-[26px] items-center gap-[2px]">
            <PinIcon />
            <h6 className="text-14 font-700 text-basic-grey-600">
              {regionWithHubs.name}
            </h6>
            <p className="ml-auto text-14 font-500 text-brand-primary-400">
              NN명이 요청했어요
            </p>
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
              </button>
            ))}
          </ul>
          {index !== regionsWithHubs.length - 1 && (
            <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
          )}
        </article>
      ))}
    </section>
  );
};

export default DemandHubsStep;

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
