import { ReservationsViewEntity } from '@/types/reservation.type';
import { useMemo } from 'react';

const useTempSeventeen = (reservation: ReservationsViewEntity) => {
  const isSeventeenEvent =
    reservation.shuttleRoute.eventId === '603038379151464486';

  const temporaryNoticeRoomUrl: string | null = useMemo(() => {
    const SHUTTLE_ROUTE_ID_13_대구 = '613618546496246356';
    const SHUTTLE_ROUTE_ID_13_부산 = '613620913623012086';
    const SHUTTLE_ROUTE_ID_13_대전 = '611769613054644567';
    const SHUTTLE_ROUTE_ID_13_명동합정 = '618712186428070633';
    const SHUTTLE_ROUTE_ID_13_천안아산 = '613615679391666718';
    const SHUTTLE_ROUTE_ID_13_청주 = '611771163789496897';
    const OPEN_CHAT_URL_13_대구 = 'https://open.kakao.com/o/gwew7bQh';
    const OPEN_CHAT_URL_13_부산 = 'https://open.kakao.com/o/gp1J7bQh';
    const OPEN_CHAT_URL_13_대전 = 'https://open.kakao.com/o/gaoW7bQh';
    const OPEN_CHAT_URL_13_명동합정 = 'https://open.kakao.com/o/g5wSkfQh';
    const OPEN_CHAT_URL_13_천안아산 = 'https://open.kakao.com/o/gOF77bQh';
    const OPEN_CHAT_URL_13_청주 = 'https://open.kakao.com/o/grNn8bQh';
    const SHUTTLE_ROUTE_ID_14_대구 = '613623549873099706';
    const SHUTTLE_ROUTE_ID_14_부산 = '613622643945378707';
    const SHUTTLE_ROUTE_ID_14_대전 = '611770340053357083';
    const SHUTTLE_ROUTE_ID_14_명동합정 = '618712575495904064';
    const SHUTTLE_ROUTE_ID_14_천안아산 = '613624012286727144';
    const SHUTTLE_ROUTE_ID_14_청주 = '611771616103240128';
    const OPEN_CHAT_URL_14_대구 = 'https://open.kakao.com/o/gRTC8bQh';
    const OPEN_CHAT_URL_14_부산 = 'https://open.kakao.com/o/gSJS8bQh';
    const OPEN_CHAT_URL_14_대전 = 'https://open.kakao.com/o/gbVe9bQh';
    const OPEN_CHAT_URL_14_명동합정 = 'https://open.kakao.com/o/g5rnlfQh';
    const OPEN_CHAT_URL_14_천안아산 = 'https://open.kakao.com/o/gZau9bQh';
    const OPEN_CHAT_URL_14_청주 = 'https://open.kakao.com/o/g1QhacQh';

    switch (reservation.shuttleRouteId) {
      // 세븐틴 9/13 노선목록
      case SHUTTLE_ROUTE_ID_13_대구:
        return OPEN_CHAT_URL_13_대구;
      case SHUTTLE_ROUTE_ID_13_부산:
        return OPEN_CHAT_URL_13_부산;
      case SHUTTLE_ROUTE_ID_13_대전:
        return OPEN_CHAT_URL_13_대전;
      case SHUTTLE_ROUTE_ID_13_명동합정:
        return OPEN_CHAT_URL_13_명동합정;
      case SHUTTLE_ROUTE_ID_13_천안아산:
        return OPEN_CHAT_URL_13_천안아산;
      case SHUTTLE_ROUTE_ID_13_청주:
        return OPEN_CHAT_URL_13_청주;
      // 세븐틴 9/14 노선목록
      case SHUTTLE_ROUTE_ID_14_대구:
        return OPEN_CHAT_URL_14_대구;
      case SHUTTLE_ROUTE_ID_14_부산:
        return OPEN_CHAT_URL_14_부산;
      case SHUTTLE_ROUTE_ID_14_대전:
        return OPEN_CHAT_URL_14_대전;
      case SHUTTLE_ROUTE_ID_14_명동합정:
        return OPEN_CHAT_URL_14_명동합정;
      case SHUTTLE_ROUTE_ID_14_천안아산:
        return OPEN_CHAT_URL_14_천안아산;
      case SHUTTLE_ROUTE_ID_14_청주:
        return OPEN_CHAT_URL_14_청주;

      default:
        return null;
    }
  }, [reservation.shuttleRouteId]);

  return {
    isSeventeenEvent,
    temporaryNoticeRoomUrl,
  };
};

export default useTempSeventeen;
