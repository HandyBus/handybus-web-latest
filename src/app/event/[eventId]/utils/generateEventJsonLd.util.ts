import { EventsViewEntity } from '@/types/event.type';

/**
 * 이벤트 상태가 예약 가능한 상태인지 확인
 * OPEN 또는 STAND_BY 상태일 때 예약 가능
 */
const isEventAvailable = (status: EventsViewEntity['eventStatus']): boolean => {
  return status === 'OPEN' || status === 'STAND_BY';
};

export const generateEventJsonLd = (event: EventsViewEntity) => {
  const isAvailable = isEventAvailable(event.eventStatus);

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.eventName,
    description: `${event.eventName} 전용 셔틀 예약 서비스. 핸디버스를 통해 ${event.eventLocationName}까지 편리하게 이동하세요.`,
    image: [event.eventImageUrl],
    startDate: event.startDate,
    endDate: event.endDate,
    // 항상 정상 진행 중인 이벤트로 표시
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.eventLocationName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.eventLocationAddress,
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: event.eventLocationLatitude,
        longitude: event.eventLocationLongitude,
      },
    },
    offers: {
      '@type': 'Offer',
      name: `${event.eventName} 셔틀 티켓`,
      description: '행사 전용 셔틀 예약',
      url: `https://www.handybus.co.kr/event/${event.eventId}`,
      price: event.eventMinRoutePrice ?? 0,
      priceCurrency: 'KRW',
      category: 'Transportation',
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: '주식회사 스테이브',
        alternateName: '핸디버스',
        url: 'https://www.handybus.co.kr',
      },
    },
  };
};
