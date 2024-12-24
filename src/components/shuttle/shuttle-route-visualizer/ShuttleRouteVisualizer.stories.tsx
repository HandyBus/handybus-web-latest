import { Meta, StoryObj } from '@storybook/react';
import ShuttleRouteVisualizer from './ShuttleRouteVisualizer';
import { SECTION } from '@/types/shuttle.types';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

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
    object: [
      { time: '2024-03-20 14:30:00', hubName: '청주터미널', hubId: '1' },
      { time: '2024-03-20 14:40:00', hubName: '청주대학교', hubId: '2' },
      { time: '2024-03-20 14:50:00', hubName: '장소3', hubId: '3' },
      { time: '2024-03-20 15:00:00', hubName: '장소4', hubId: '4' },
      { time: '2024-03-20 15:10:00', hubName: '장소5', hubId: '5' },
      { time: '2024-03-20 15:20:00', hubName: '장소6', hubId: '6' },
    ],
    section: SECTION.SHUTTLE_DETAIL,
  },
};

export const ReservationDetail: Story = {
  args: {
    object: [
      { time: '2024-03-20 14:30:00', hubName: '청주터미널', hubId: '1' },
      {
        time: '2024-03-20 14:40:00',
        hubName: '청주대학교',
        hubId: '2',
        isPickup: true,
      },
      { time: '2024-03-20 14:50:00', hubName: '장소3', hubId: '3' },
      { time: '2024-03-20 15:00:00', hubName: '장소4', hubId: '4' },
      { time: '2024-03-20 15:10:00', hubName: '장소5', hubId: '5' },
      {
        time: '2024-03-20 15:20:00',
        hubName: '장소6',
        hubId: '6',
        isDropoff: true,
      },
    ],
    section: SECTION.RESERVATION_DETAIL,
  },
};

export const MyReservation: Story = {
  args: {
    object: [
      { time: '2024-03-20 14:30:00', hubName: '청주터미널', hubId: '1' },
      {
        time: '2024-03-20 14:40:00',
        hubName: '청주대학교',
        hubId: '2',
        isPickup: true,
      },
      { time: '2024-03-20 14:50:00', hubName: '장소3', hubId: '3' },
      { time: '2024-03-20 15:00:00', hubName: '장소4', hubId: '4' },
      { time: '2024-03-20 15:10:00', hubName: '장소5', hubId: '5' },
      {
        time: '2024-03-20 15:20:00',
        hubName: '장소6',
        hubId: '6',
        isDropoff: true,
      },
    ],
    section: SECTION.MY_RESERVATION,
  },
};
