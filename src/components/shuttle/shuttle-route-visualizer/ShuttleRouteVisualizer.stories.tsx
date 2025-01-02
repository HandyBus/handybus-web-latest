import { Meta, StoryObj } from '@storybook/react';
import ShuttleRouteVisualizer from './ShuttleRouteVisualizer';
import { SECTION, ShuttleRouteHubObject } from '@/types/shuttle.types';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

const RouteMockData: ShuttleRouteHubObject[] = [
  {
    arrivalTime: '2024-03-20 14:30:00',
    name: '청주터미널',
    shuttleRouteHubId: 1,
    sequence: 1,
    regionId: 1,
  },
  {
    arrivalTime: '2024-03-20 14:40:00',
    name: '청주대학교',
    shuttleRouteHubId: 2,
    sequence: 2,
    regionId: 1,
  },
  {
    arrivalTime: '2024-03-20 14:50:00',
    name: '장소3',
    shuttleRouteHubId: 3,
    sequence: 3,
    regionId: 1,
    selected: true,
  },
  {
    arrivalTime: '2024-03-20 15:00:00',
    name: '장소4',
    shuttleRouteHubId: 4,
    sequence: 4,
    regionId: 1,
  },
  {
    arrivalTime: '2024-03-20 15:10:00',
    name: '장소5',
    shuttleRouteHubId: 5,
    sequence: 5,
    regionId: 1,
  },
  {
    arrivalTime: '2024-03-20 15:20:00',
    name: '장소6',
    shuttleRouteHubId: 6,
    sequence: 6,
    regionId: 1,
  },
];

const ShuttleRouteVisualizerWrapper = (
  props: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <ShuttleRouteVisualizer {...props} />
    </FormProvider>
  );
};

const meta: Meta<typeof ShuttleRouteVisualizer> = {
  title: 'Components/ShuttleRouteVisualizer',
  component: ShuttleRouteVisualizerWrapper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShuttleRouteVisualizer>;

export const ShuttleDetail: Story = {
  args: {
    toDestinationObject: RouteMockData,
    fromDestinationObject: RouteMockData,
    type: 'ROUND_TRIP',
    section: SECTION.SHUTTLE_DETAIL,
  },
};

export const ReservationDetail: Story = {
  args: {
    toDestinationObject: RouteMockData,
    fromDestinationObject: RouteMockData,
    type: 'ROUND_TRIP',
    section: SECTION.RESERVATION_DETAIL,
  },
};

export const MyReservation: Story = {
  args: {
    toDestinationObject: RouteMockData,
    fromDestinationObject: RouteMockData,
    type: 'ROUND_TRIP',
    section: SECTION.MY_RESERVATION,
  },
};
