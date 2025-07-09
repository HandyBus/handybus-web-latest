import { HANDY_PARTY_PREFIX } from '@/constants/common';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HANDY_PARTY_ROUTE_AREA,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

// 주소가 핸디팟 노선 개설 지역인지 확인
export const checkIsHandyPartyArea = (
  address: string,
  possibleGungus: string[],
) => {
  const itemGungu = address.split(' ')?.[1];

  // 개설된 노선 내에 해당하는지 확인
  const isPossibleGungu = possibleGungus.find((gungu) => itemGungu === gungu);
  // 서비스 가능 지역인지 확이
  const isServiceableArea = !!getHandyPartyArea(address);

  return isPossibleGungu && isServiceableArea;
};

// 주소를 핸디팟 권역으로 변환
export const getHandyPartyArea = (address: string) => {
  const [itemSido, itemGungu] = address.split(' ');

  // HANDY_PARTY_AREA_TO_ADDRESS에서 sido가 동일하고 gungu가 배열에 포함되는 entry 찾기
  const matchingArea = Object.entries(HANDY_PARTY_AREA_TO_ADDRESS).find(
    ([, addressInfo]) => {
      const isSidoMatch = addressInfo.sido === itemSido;
      const isGunguMatch = addressInfo.gungu.some(
        (gungu) => itemGungu === gungu,
      );

      return isSidoMatch && isGunguMatch;
    },
  ) as [HandyPartyRouteArea, { sido: string; gungu: string[] }] | undefined;

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

export const createAvailableHandyPartyAreaGuideString = (
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
    if (areaInfo.gungu.length <= 1) {
      return [...acc, handyPartyArea];
    } else {
      const stringWithGungu = `${handyPartyArea} (${areaInfo.gungu.join(', ')})`;
      return [...acc, stringWithGungu];
    }
  }, [] as string[]);

  return `핸디팟 운행 가능 지역은 ${handyPartyAreaString.join(', ')}입니다.`;
};
