import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { HANDY_PARTY_AREA_TO_ADDRESS } from '@/constants/handyPartyArea.const';
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
        (gungu) => itemGungu.includes(gungu) || gungu.includes(itemGungu),
      );

      return isSidoMatch && isGunguMatch;
    },
  );

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
