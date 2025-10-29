import { HANDY_PARTY_PREFIX } from '@/constants/common';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HANDY_PARTY_ROUTE_AREA,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

// 주소가 핸디팟 노선 개설 지역인지 확인
export const checkIsPossibleHandyPartyArea = (
  address: string,
  possibleHandyPartyAreas: HandyPartyRouteArea[],
  selectedArea: HandyPartyRouteArea,
) => {
  const itemHandyPartyArea = getHandyPartyArea(address);

  // 선택한 권역에 해당하지는지 확인
  if (!itemHandyPartyArea || selectedArea !== itemHandyPartyArea) {
    return false;
  }

  // 개설된 노선 내에 해당하는지 확인
  const isPossibleArea = !!possibleHandyPartyAreas.find(
    (e) => e === itemHandyPartyArea,
  );

  return isPossibleArea;
};

// 주소를 핸디팟 권역으로 변환
export const getHandyPartyArea = (address: string) => {
  const [itemSido, itemGungu, itemDong] = address.split(' ');

  // HANDY_PARTY_AREA_TO_ADDRESS에서 sido가 동일하고 gungu가 배열에 포함되는 entry 찾기
  const matchingArea = Object.entries(HANDY_PARTY_AREA_TO_ADDRESS).find(
    ([, addressInfo]) => {
      const isSidoMatch = addressInfo.sido === itemSido;
      const isGunguMatch = addressInfo.gungu.some(
        (gungu) => itemGungu === gungu,
      );
      const isDongMatch = addressInfo.dong
        ? addressInfo.dong.some((dong) => itemDong === dong)
        : true;

      return isSidoMatch && isGunguMatch && isDongMatch;
    },
  ) as
    | [HandyPartyRouteArea, { sido: string; gungu: string[]; dong?: string[] }]
    | undefined;

  return matchingArea ? matchingArea[0] : null;
};

export const checkIsHandyParty = (
  shuttleRoute: ShuttleRoutesViewEntity | null | undefined,
) => {
  if (!shuttleRoute) {
    return false;
  }

  return shuttleRoute.name.includes(HANDY_PARTY_PREFIX);
};

export const createFullAvailableHandyPartyAreaGuideString = (
  shuttleRoutes: ShuttleRoutesViewEntity[],
) => {
  const handyPartyAreas = shuttleRoutes
    .reduce((acc, route) => {
      const handyPartyArea = route.name.split('_')[1] as HandyPartyRouteArea;
      if (handyPartyArea && !acc.includes(handyPartyArea)) {
        acc.push(handyPartyArea);
      }
      return acc;
    }, [] as HandyPartyRouteArea[])
    .toSorted((a, b) => {
      const aIndex = HANDY_PARTY_ROUTE_AREA.indexOf(a);
      const bIndex = HANDY_PARTY_ROUTE_AREA.indexOf(b);
      return aIndex - bIndex;
    });

  const handyPartyAreaString = handyPartyAreas.reduce((acc, handyPartyArea) => {
    const areaInfo = HANDY_PARTY_AREA_TO_ADDRESS[handyPartyArea];
    // 동북권을 서울 대표 권역으로 사용. 서울 내 모든 권역은 일부만 열리는 경우 존재 X
    if (handyPartyArea === '동북권') {
      return [...acc, '서울 전역'];
    }
    if (areaInfo.sido === '서울') {
      return acc;
    }

    // 권역 내 지역이 1개 이하인 경우 권역 이름만 반환
    if (areaInfo.dong && areaInfo.dong.length >= 1) {
      return [...acc, `${handyPartyArea} (${areaInfo.dong.join(', ')})`];
    } else if (areaInfo.gungu.length > 1) {
      const stringWithGungu = `${handyPartyArea} (${areaInfo.gungu.join(', ')})`;
      return [...acc, stringWithGungu];
    } else {
      return [...acc, handyPartyArea];
    }
  }, [] as string[]);

  return `핸디팟 운행 가능 지역은 ${handyPartyAreaString.join(', ')}입니다.`;
};

export const createShortAvailableHandyPartyAreaGuideString = (
  shuttleRoutes: ShuttleRoutesViewEntity[],
) => {
  const handyPartyAreas = shuttleRoutes
    .reduce((acc, route) => {
      const handyPartyArea = route.name.split('_')[1] as HandyPartyRouteArea;
      if (handyPartyArea && !acc.includes(handyPartyArea)) {
        acc.push(handyPartyArea);
      }
      return acc;
    }, [] as HandyPartyRouteArea[])
    .toSorted((a, b) => {
      const aIndex = HANDY_PARTY_ROUTE_AREA.indexOf(a);
      const bIndex = HANDY_PARTY_ROUTE_AREA.indexOf(b);
      return aIndex - bIndex;
    });

  const groupedBySido = handyPartyAreas.reduce(
    (acc, handyPartyArea) => {
      const areaInfo = HANDY_PARTY_AREA_TO_ADDRESS[handyPartyArea];
      // 동북권을 서울 대표 권역으로 사용. 서울 내 모든 권역은 일부만 열리는 경우 존재 X
      if (handyPartyArea === '동북권') {
        return { ...acc, 서울: [handyPartyArea] };
      }
      if (areaInfo.sido === '서울') {
        return acc;
      } else if (areaInfo.sido === '경기') {
        return { ...acc, 경기: [...acc.경기, handyPartyArea] };
      } else if (areaInfo.sido === '인천') {
        return { ...acc, 인천: [...acc.인천, handyPartyArea] };
      }
      return acc;
    },
    { 서울: [], 경기: [], 인천: [] } as Record<string, HandyPartyRouteArea[]>,
  );

  const handyPartyAreaString = (() => {
    const seoulString = groupedBySido.서울.length > 0 ? '서울 전역' : '';
    const gyeonggiString =
      groupedBySido.경기.length > 0
        ? `경기도 일부 (${groupedBySido.경기
            .map((area) => {
              // 동탄 예외 처리
              if (area === '동탄') {
                return '동탄';
              }
              // 제한되는 지역들은 `일부` 접미사 추가
              const dongLength = HANDY_PARTY_AREA_TO_ADDRESS[area].dong?.length;
              if (dongLength && dongLength > 1) {
                return `${area} 일부`;
              }
              return area;
            })
            .join(', ')})`
        : '';
    const incheonString =
      groupedBySido.인천.length > 0
        ? `인천광역시 일부 (${groupedBySido.인천
            .map((area) => {
              // 제한되는 지역들은 `일부` 접미사 추가
              const dongLength = HANDY_PARTY_AREA_TO_ADDRESS[area].dong?.length;
              if (dongLength && dongLength > 1) {
                return `${area} 일부`;
              }
              return area;
            })
            .join(', ')})`
        : '';

    return [seoulString, gyeonggiString, incheonString]
      .filter(Boolean)
      .join(', ');
  })();

  return `핸디팟 운행 가능 지역은 ${handyPartyAreaString}입니다.`;
};
