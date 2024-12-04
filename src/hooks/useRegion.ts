'use client';

import { type Dispatch, useReducer } from 'react';
import {
  BIG_REGIONS,
  BigRegionsType,
  SmallRegionsType,
} from '@/constants/regions';

export type RegionAction =
  | {
      type: 'SET_FIRST';
      bigRegion: BigRegionsType;
    }
  | {
      type: 'SET_SECOND';
      smallRegion: SmallRegionsType | undefined;
    }
  | {
      type: 'RESET';
    };

export type PartialRegion = Partial<{
  readonly [K in BigRegionsType]: readonly SmallRegionsType[] /* should be nonempty */;
}>;

export type EmptyRegion = {
  bigRegion: undefined;
  smallRegion: undefined;
};

export type NonEmptyRegion = {
  bigRegion: BigRegionsType;
  smallRegion: SmallRegionsType | undefined;
};

export type Region = NonEmptyRegion | EmptyRegion;

/* NOTE regionData never be empty */
const regionReducer = (state: Region, action: RegionAction): Region => {
  switch (action.type) {
    case 'SET_FIRST':
      return {
        bigRegion: action.bigRegion,
        smallRegion:
          action.bigRegion === state.bigRegion ? state.smallRegion : undefined,
      };

    case 'SET_SECOND':
      return {
        bigRegion: (state.bigRegion
          ? state.bigRegion
          : BIG_REGIONS[0]) as BigRegionsType,
        smallRegion: action.smallRegion as SmallRegionsType | undefined,
      };

    case 'RESET':
      return {
        bigRegion: undefined,
        smallRegion: undefined,
      };
  }
};

const useRegion = (initial: Region): [Region, Dispatch<RegionAction>] => {
  return useReducer(regionReducer, initial);
};

export default useRegion;
