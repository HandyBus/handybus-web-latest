import { HANDY_PARTY_PREFIX } from '@/constants/common';
import {
  HANDY_PARTY_AREA_TO_GUNGU,
  HANDY_PARTY_AREA_TO_SIDO,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

export const checkIsHandyPartyArea = (
  address: string,
  possibleGungus: string[],
) => {
  const itemGungu = address.split(' ')?.[1];

  const isPossibleGungu = possibleGungus.find(
    (gungu) => itemGungu.includes(gungu) || gungu.includes(itemGungu),
  );

  const isServiceableArea = getHandyPartyArea(address);

  return isPossibleGungu && isServiceableArea;
};

export const getHandyPartyArea = (address: string) => {
  const [itemSido, itemGungu] = address.split(' ');

  const handyPartyArea = Object.entries(HANDY_PARTY_AREA_TO_GUNGU).find(
    ([handyPartyArea, gungus]) => {
      const targetSido =
        HANDY_PARTY_AREA_TO_SIDO[handyPartyArea as HandyPartyRouteArea];
      const sidoMatched = targetSido === itemSido;
      const gunguMatched = gungus.find(
        (gungu) => itemGungu.includes(gungu) || gungu.includes(itemGungu),
      );
      return sidoMatched && gunguMatched;
    },
  );

  return handyPartyArea ? handyPartyArea[0] : null;
};

export const checkIsHandyParty = (
  shuttleRoute: ShuttleRoutesViewEntity | null | undefined,
) => {
  if (!shuttleRoute) {
    return false;
  }

  return shuttleRoute.name.includes(HANDY_PARTY_PREFIX);
};
