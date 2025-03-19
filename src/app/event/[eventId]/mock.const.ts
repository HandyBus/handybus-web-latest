import { EventsViewEntity } from '@/types/event.type';

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
};
