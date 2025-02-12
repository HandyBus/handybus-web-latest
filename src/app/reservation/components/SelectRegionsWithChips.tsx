'use client';

import { type Dispatch, useState, useEffect } from 'react';
import SelectableChip from '@/components/chips/selectable-chip/SelectableChip';
import type { Region, RegionAction } from '@/hooks/useRegion';
import {
  SMALL_REGIONS,
  type BigRegionsType,
  type SmallRegionsType,
} from '@/constants/regions';
import ChevronDown from '../icons/chevron-down.svg';

const SelectRegionsWithChips = ({
  region,
  setRegion,
  showBar,
  onClose,
}: {
  region: Region;
  setRegion: Dispatch<RegionAction>;
  showBar: () => void;
  onClose: () => void;
}) => {
  const regions = SMALL_REGIONS;

  const [showFirstRegion, setShowFirstRegion] = useState<boolean | undefined>(
    undefined,
  );
  const [showSecondRegion, setShowSecondRegion] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    if (showFirstRegion === false || showSecondRegion === false) {
      onClose();
    }
  }, [showFirstRegion, showSecondRegion, onClose]);

  useEffect(() => {
    const timeout = setTimeout(showBar, 0);
    return () => clearTimeout(timeout);
  }, [showBar, showFirstRegion, showSecondRegion]);

  return (
    <>
      <button
        className="flex w-full cursor-pointer flex-row  items-center justify-between pb-8 pl-20 pr-16 pt-16"
        onClick={() => {
          setShowFirstRegion((prev) => !prev);
        }}
      >
        <div className="text-12 font-500 text-grey-500">도/광역시 선택</div>
        <div className="flex flex-row items-center justify-start gap-8">
          <span className="">
            {region.bigRegion === undefined ? '전체' : region.bigRegion}
          </span>
          <span className={showFirstRegion ? 'rotate-180' : ''}>
            <ChevronDown />
          </span>
        </div>
      </button>
      {showFirstRegion && (
        <div className="flex w-full flex-row flex-wrap gap-x-[6px] gap-y-[8px] bg-white px-16 pb-16 pt-4">
          <SelectableChip
            variant="secondary"
            selected={region.bigRegion === undefined}
            onClick={() => {
              setRegion({
                type: 'RESET',
              });
              setShowSecondRegion(false);
              setShowFirstRegion(false);
            }}
          >
            전체
          </SelectableChip>
          {Object.keys(regions).map((bigName) => (
            <SelectableChip
              key={bigName}
              selected={region.bigRegion === bigName}
              onClick={() => {
                setRegion({
                  type: 'SET_FIRST',
                  bigRegion: bigName as BigRegionsType,
                });
                setShowSecondRegion(true);
                setShowFirstRegion(false);
              }}
            >
              {bigName}
            </SelectableChip>
          ))}
        </div>
      )}
      <button
        className="flex w-full cursor-pointer flex-row items-center justify-between pb-8 pl-20 pr-16 pt-16"
        onClick={() => {
          setShowSecondRegion((prev) => !prev);
        }}
      >
        <div className="text-12 font-500 text-grey-500">시/군/구 선택</div>
        <div className="flex flex-row items-center justify-start gap-8">
          <span>
            {region.bigRegion === undefined
              ? '-'
              : region.smallRegion === undefined
                ? '전체'
                : region.smallRegion}
          </span>
          <span className={showSecondRegion ? 'rotate-180' : ''}>
            <ChevronDown />
          </span>
        </div>
      </button>
      {showSecondRegion && region.bigRegion && (
        <div className="flex w-full flex-row flex-wrap gap-x-[6px] gap-y-[8px] bg-white px-16 pb-16 pt-4">
          <SelectableChip
            variant="secondary"
            selected={region.smallRegion === undefined}
            onClick={() => {
              setRegion({
                type: 'SET_SECOND',
                smallRegion: undefined,
              });
              setShowSecondRegion(false);
              setShowFirstRegion(false);
            }}
          >
            전체
          </SelectableChip>
          {regions[region.bigRegion as BigRegionsType]
            ?.toSorted()
            .map((smallName) => (
              <SelectableChip
                key={smallName}
                selected={region.smallRegion === smallName}
                onClick={() => {
                  setRegion({
                    type: 'SET_SECOND',
                    smallRegion: smallName as SmallRegionsType,
                  });
                  setShowSecondRegion(false);
                  setShowFirstRegion(false);
                }}
              >
                {smallName}
              </SelectableChip>
            ))}
        </div>
      )}
    </>
  );
};

export default SelectRegionsWithChips;
