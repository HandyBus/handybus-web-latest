import { EventsViewEntity } from '@/types/event.type';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export const MOCK_EVENT: EventsViewEntity = {
  eventId: '554509373209057298',
  eventName: '2025 콜드플레이 월드투어',
  eventType: 'CONCERT',
  regionId: '110',
  regionHubId: '546561978550718485',
  eventStatus: 'OPEN',
  eventImageUrl:
    'https://d2mcfseiqyiloq.cloudfront.net/concerts/images/79ec1ec4-be99-4ae4-ade1-354eb4dc27ae.png',
  eventLocationName: '고양종합운동장',
  eventLocationAddress: '경기 고양시 일산서구 대화동 2320',
  eventLocationLatitude: 37.67652995956127,
  eventLocationLongitude: 126.74313320684178,
  eventArtists: [
    {
      artistId: '554509278405203979',
      artistName: 'COLDPLAY',
    },
  ],
  dailyEvents: [
    {
      dailyEventId: '554509373200668684',
      date: '2025-04-15T15:00:00.000Z',
      status: 'OPEN',
    },
    {
      dailyEventId: '554509373204862989',
      date: '2025-04-17T15:00:00.000Z',
      status: 'OPEN',
    },
    {
      dailyEventId: '554509373204862990',
      date: '2025-04-18T15:00:00.000Z',
      status: 'OPEN',
    },
    {
      dailyEventId: '554509373204862991',
      date: '2025-04-21T15:00:00.000Z',
      status: 'OPEN',
    },
    {
      dailyEventId: '554509373209057296',
      date: '2025-04-23T15:00:00.000Z',
      status: 'OPEN',
    },
    {
      dailyEventId: '554509373209057297',
      date: '2025-04-24T15:00:00.000Z',
      status: 'OPEN',
    },
  ],
  startDate: '2025-04-15T15:00:00.000Z',
  endDate: '2025-04-24T15:00:00.000Z',
  createdAt: '2025-03-11T03:42:17.000Z',
  updatedAt: '2025-03-12T07:53:17.000Z',
  minRoutePrice: 30000,
};

export const MOCK_SHUTTLE_ROUTE: ShuttleRoutesViewEntity = {
  shuttleRouteId: '557485299995775011',
  eventId: '557484219874414616',
  dailyEventId: '557484219870220311',
  name: '서울 종로',
  reservationDeadline: '2025-03-24T15:00:00.000Z',
  hasEarlybird: false,
  earlybirdDeadline: null,
  earlybirdPriceToDestination: null,
  earlybirdPriceFromDestination: null,
  earlybirdPriceRoundTrip: null,
  regularPriceToDestination: 30000,
  regularPriceFromDestination: 30000,
  regularPriceRoundTrip: 50000,
  maxPassengerCount: 28,
  toDestinationCount: 28,
  fromDestinationCount: 2,
  remainingSeatCount: 26,
  remainingSeatType: 'FROM_DESTINATION',
  status: 'OPEN',
  toDestinationShuttleRouteHubs: [
    {
      shuttleRouteHubId: '557485299995775001',
      regionHubId: '544813435813105666',
      regionId: '4',
      name: '종로3가역',
      address: '서울 종로구 묘동 20-5',
      latitude: 37.571592122471486,
      longitude: 126.99191767820236,
      type: 'TO_DESTINATION',
      sequence: 1,
      arrivalTime: '2025-03-25T01:00:00.000Z',
      status: 'ACTIVE',
    },
    {
      shuttleRouteHubId: '557485299995775002',
      regionHubId: '544813435813105666',
      regionId: '4',
      name: '종로2가역',
      address: '서울 종로구 묘동 20-5',
      latitude: 37.571592122471486,
      longitude: 126.99191767820236,
      type: 'TO_DESTINATION',
      sequence: 2,
      arrivalTime: '2025-03-25T01:00:00.000Z',
      status: 'ACTIVE',
    },
    {
      shuttleRouteHubId: '557485299995775003',
      regionHubId: '544813435813105666',
      regionId: '4',
      name: '종로1가역',
      address: '서울 종로구 묘동 20-5',
      latitude: 37.571592122471486,
      longitude: 126.99191767820236,
      type: 'TO_DESTINATION',
      sequence: 3,
      arrivalTime: '2025-03-25T01:00:00.000Z',
      status: 'ACTIVE',
    },
    {
      shuttleRouteHubId: '557485299995775010',
      regionHubId: '546915639063745079',
      regionId: '1',
      name: '신논현역',
      address: '서울 강남구 논현동 280',
      latitude: 37.50453291032636,
      longitude: 127.02450234752524,
      type: 'TO_DESTINATION',
      sequence: 4,
      arrivalTime: '2025-03-25T03:00:00.000Z',
      status: 'ACTIVE',
    },
  ],
  fromDestinationShuttleRouteHubs: [
    {
      shuttleRouteHubId: '557485299995775007',
      regionHubId: '546915639063745079',
      regionId: '1',
      name: '신논현역',
      address: '서울 강남구 논현동 280',
      latitude: 37.50453291032636,
      longitude: 127.02450234752524,
      type: 'FROM_DESTINATION',
      sequence: 1,
      arrivalTime: '2025-03-25T11:00:00.000Z',
      status: 'ACTIVE',
    },
    {
      shuttleRouteHubId: '557485299995775008',
      regionHubId: '544813435813105666',
      regionId: '4',
      name: '종로3가역',
      address: '서울 종로구 묘동 20-5',
      latitude: 37.571592122471486,
      longitude: 126.99191767820236,
      type: 'FROM_DESTINATION',
      sequence: 2,
      arrivalTime: '2025-03-25T13:00:00.000Z',
      status: 'ACTIVE',
    },
  ],
  createdAt: '2025-03-19T08:47:33.000Z',
  updatedAt: '2025-03-19T08:47:33.000Z',
  event: {
    eventId: '557484219874414616',
    eventName: '인앤아웃 내한 콘서트',
    eventType: 'CONCERT',
    regionId: '1',
    regionHubId: '546915639063745079',
    eventStatus: 'CLOSED',
    eventImageUrl:
      'https://d2mcfseiqyiloq.cloudfront.net/concerts/images/e0a9d9f4-a4c2-4767-a1e6-8bee78410873.jpeg',
    eventLocationName: '신논현역',
    eventLocationAddress: '서울 강남구 논현동 280',
    eventLocationLatitude: 37.50453291032636,
    eventLocationLongitude: 127.02450234752524,
    eventArtists: [
      {
        artistId: '557484153835098134',
        artistName: '햄부기',
      },
      {
        artistId: '557484153835098134',
        artistName: '햄부기',
      },
      {
        artistId: '557484153835098134',
        artistName: '햄부기',
      },
    ],
    dailyEvents: [
      {
        dailyEventId: '557484219870220311',
        date: '2025-03-24T15:00:00.000Z',
        status: 'CLOSED',
      },
    ],
    startDate: '2025-03-24T15:00:00.000Z',
    endDate: '2025-03-24T15:00:00.000Z',
    createdAt: '2025-03-19T08:43:16.000Z',
    updatedAt: '2025-03-19T09:00:02.000Z',
    minRoutePrice: 39000,
  },
};
