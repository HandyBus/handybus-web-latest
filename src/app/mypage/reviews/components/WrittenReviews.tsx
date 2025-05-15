'use client';

import Loading from '@/components/loading/Loading';
import ReservationCard from '../../shuttle/components/reservations/reservation-card/ReservationCard';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
// import { useGetUserReservations } from '@/services/reservation.service';
import PeriodFilterBar from '../../shuttle/components/period-filter-bar/PeriodFilterBar';
import usePeriodFilter from '../../shuttle/components/period-filter-bar/hooks/usePeriodFilter';
import { ReservationsViewEntity } from '@/types/reservation.type';
import EmptyReview from './EmptyReview';

const WrittenReviews = () => {
  const { periodFilter, setPeriodFilter } = usePeriodFilter();
  // const { data: reservations, isLoading } = useGetUserReservations({
  //   monthsAgo: periodFilter,
  //   eventProgressStatus: 'PAST',
  // });

  const mockData = mockReservationData;

  return (
    <>
      <PeriodFilterBar
        periodFilter={periodFilter}
        setPeriodFilter={setPeriodFilter}
      />
      <DeferredSuspense fallback={<Loading style="grow" />} isLoading={false}>
        {mockData &&
          (mockData.length === 0 ? (
            // (true ? (
            <EmptyReview />
          ) : (
            <ul>
              {mockData.map((reservation) => (
                <ReservationCard
                  key={reservation.reservationId}
                  reservation={reservation}
                />
              ))}
            </ul>
          ))}
        {/* <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservations &&
          (reservations.length === 0 ? (
            <EmptyView />
          ) : (
            <ul>
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation.reservationId}
                  reservation={reservation}
                />
              ))}
            </ul>
          ))} */}
      </DeferredSuspense>
    </>
  );
};

export default WrittenReviews;

// 목데이터 추가
const mockReservationData = [
  {
    reservationId: '578075661151768667',
    userId: '567991079060639810',
    userNickname: 'S세한생선구이238',
    userPhoneNumber: '+821099068534',
    userProfileImage: null,
    shuttleRouteId: '578075067510952015',
    type: 'ROUND_TRIP',
    toDestinationShuttleRouteHubId: '578075067510952013',
    fromDestinationShuttleRouteHubId: '578075067510952012',
    handyStatus: 'SUPPORTED',
    hasReview: true,
    reservationStatus: 'COMPLETE_PAYMENT',
    cancelStatus: 'NONE',
    paymentId: '578075661587976284',
    paymentPrincipalAmount: 10000,
    paymentAmount: 10000,
    paymentDiscountAmount: 0,
    paymentCouponDiscountAmount: 0,
    paymentEarlybirdDiscountAmount: 0,
    paymentCreatedAt: '2025-05-15T04:26:18.000Z',
    paymentUpdatedAt: '2025-05-15T04:26:31.000Z',
    shuttleBusId: null,
    passengerCount: 1,
    shuttleRoute: {
      shuttleRouteId: '578075067510952015',
      eventId: '550561105617883471',
      dailyEventId: '578068670899556368',
      name: '건대 노선',
      reservationDeadline: '2025-05-14T15:00:00.000Z',
      hasEarlybird: false,
      earlybirdDeadline: null,
      earlybirdPriceToDestination: null,
      earlybirdPriceFromDestination: null,
      earlybirdPriceRoundTrip: null,
      regularPriceToDestination: 10000,
      regularPriceFromDestination: 10000,
      regularPriceRoundTrip: 10000,
      maxPassengerCount: 45,
      toDestinationCount: 2,
      fromDestinationCount: 3,
      remainingSeatCount: 42,
      remainingSeatType: 'ROUND_TRIP',
      status: 'ENDED',
      toDestinationShuttleRouteHubs: [
        {
          shuttleRouteHubId: '578075067510952013',
          regionHubId: '548543384583675424',
          regionId: '8',
          name: '건대입구역',
          address: '서울 광진구 화양동 4-9',
          latitude: 37.5399372322242,
          longitude: 127.07066211544493,
          type: 'TO_DESTINATION',
          // role: 'HUB',
          sequence: 1,
          arrivalTime: '2025-05-15T17:00:00.000Z',
          status: 'ACTIVE',
        },
        {
          shuttleRouteHubId: '578075067510952014',
          regionHubId: '545056344596549675',
          regionId: '27',
          name: 'KSPO DOME',
          address: '서울 송파구 방이동 88',
          latitude: 37.51925673395034,
          longitude: 127.12739422683498,
          type: 'TO_DESTINATION',
          // role: 'DESTINATION',
          sequence: 2,
          arrivalTime: '2025-05-15T17:30:00.000Z',
          status: 'ACTIVE',
        },
      ],
      fromDestinationShuttleRouteHubs: [
        {
          shuttleRouteHubId: '578075067510952011',
          regionHubId: '545056344596549675',
          regionId: '27',
          name: 'KSPO DOME',
          address: '서울 송파구 방이동 88',
          latitude: 37.51925673395034,
          longitude: 127.12739422683498,
          type: 'FROM_DESTINATION',
          // role: 'HUB',
          sequence: 1,
          arrivalTime: '2025-05-15T20:30:00.000Z',
          status: 'ACTIVE',
        },
        {
          shuttleRouteHubId: '578075067510952012',
          regionHubId: '548543384583675424',
          regionId: '8',
          name: '건대입구역',
          address: '서울 광진구 화양동 4-9',
          latitude: 37.5399372322242,
          longitude: 127.07066211544493,
          type: 'FROM_DESTINATION',
          // role: 'DESTINATION',
          sequence: 2,
          arrivalTime: '2025-05-15T22:00:00.000Z',
          status: 'ACTIVE',
        },
      ],
      createdAt: '2025-05-15T04:23:56.000Z',
      updatedAt: '2025-05-15T04:23:56.000Z',
      event: {
        eventId: '550561105617883471',
        eventName: '블랙핑크 월드투어',
        eventType: 'CONCERT',
        regionId: '110',
        regionHubId: '546561978550718485',
        eventStatus: 'OPEN',
        eventImageUrl:
          'https://d2mcfseiqyiloq.cloudfront.net/concerts/images/7e060637-1556-4daf-8fe8-578ab193ff10.png',
        eventLocationName: '고양종합운동장',
        eventLocationAddress: '경기 고양시 일산서구 대화동 2320',
        eventLocationLatitude: 37.67652995956127,
        eventLocationLongitude: 126.74313320684178,
        eventArtists: [
          {
            artistId: '550559906810302660',
            artistName: 'BLACKPINK (블랙핑크)',
          },
          {
            artistId: '550559906810302660',
            artistName: 'BLACKPINK (블랙핑크)',
          },
        ],
        dailyEvents: [
          {
            dailyEventId: '578068670899556369',
            date: '2025-05-15T15:00:00.000Z',
            status: 'CLOSED',
          },
          {
            dailyEventId: '578068670899556368',
            date: '2025-05-14T15:00:00.000Z',
            status: 'CLOSED',
          },
          {
            dailyEventId: '550561105613689165',
            date: '2025-07-05T15:00:00.000Z',
            status: 'OPEN',
          },
          {
            dailyEventId: '550561105617883470',
            date: '2025-07-06T15:00:00.000Z',
            status: 'OPEN',
          },
        ],
        startDate: '2025-05-14T15:00:00.000Z',
        endDate: '2025-07-06T15:00:00.000Z',
        createdAt: '2025-02-28T06:13:17.000Z',
        updatedAt: '2025-05-15T03:58:31.000Z',
      },
    },
    createdAt: '2025-05-15T04:26:18.000Z',
    updatedAt: '2025-05-15T04:26:32.000Z',
  },
] satisfies ReservationsViewEntity[];
