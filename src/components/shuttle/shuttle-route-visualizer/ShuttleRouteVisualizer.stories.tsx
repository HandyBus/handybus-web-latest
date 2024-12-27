import { Meta, StoryObj } from '@storybook/react';
import ShuttleRouteVisualizer from './ShuttleRouteVisualizer';
import { SECTION } from '@/types/shuttle.types';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { RouteMockData } from '@/app/shuttle/[id]/write/page';

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
