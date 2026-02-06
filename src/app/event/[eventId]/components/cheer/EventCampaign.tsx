'use client';

import { isCheerCampaignRunningAtom } from '../../store/cheerAtom';
import CheerCampaignInfo from './CheerCampaignInfo';
import { useAtomValue } from 'jotai';

const EventCampaign = () => {
  const isCheerCampaignRunning = useAtomValue(isCheerCampaignRunningAtom);
  if (!isCheerCampaignRunning) {
    return null;
  }
  return <CheerCampaignInfo />;
};

export default EventCampaign;
