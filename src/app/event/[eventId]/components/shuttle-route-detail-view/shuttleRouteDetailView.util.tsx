import { ReactNode } from 'react';
import PinIcon from '../../icons/pin-primary.svg';
import DotPrimaryIcon from '../../icons/dot-primary.svg';
import DotTertiaryIcon from '../../icons/dot-tertiary.svg';
import {
  HubType,
  TripTypeWithoutRoundTrip,
} from './shuttleRouteDetailView.type';

export const getHubType = ({
  index,
  selectedHubIndex,
  tripType,
  length,
}: {
  index: number;
  selectedHubIndex: number;
  tripType: TripTypeWithoutRoundTrip;
  length: number;
}): HubType => {
  if (index === selectedHubIndex) {
    return 'primary';
  }

  if (tripType === 'TO_DESTINATION') {
    if (index === length - 1) {
      return 'eventLocation';
    }
    return index > selectedHubIndex ? 'secondary' : 'tertiary';
  }

  if (tripType === 'FROM_DESTINATION') {
    if (index === 0) {
      return 'eventLocation';
    }
    return index < selectedHubIndex ? 'secondary' : 'tertiary';
  }

  return 'secondary';
};

export const getHubIcon = (type: HubType): ReactNode => {
  switch (type) {
    case 'primary':
      return <DotPrimaryIcon />;
    case 'secondary':
      return <DotPrimaryIcon />;
    case 'tertiary':
      return <DotTertiaryIcon />;
    case 'eventLocation':
      return <PinIcon />;
    default:
      return null;
  }
};
