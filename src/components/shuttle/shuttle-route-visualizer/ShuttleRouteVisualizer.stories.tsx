import { Meta, StoryObj } from '@storybook/react';
import ShuttleRouteVisualizer from './ShuttleRouteVisualizer';
import { SECTION } from '@/types/shuttle.types';

const meta: Meta<typeof ShuttleRouteVisualizer> = {
  title: 'Components/ShuttleRouteVisualizer',
  component: ShuttleRouteVisualizer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShuttleRouteVisualizer>;

export const ShuttleDetail: Story = {
  args: {
    object: [
      { time: '2024-03-20 14:30:00', location: '청주터미널' },
      { time: '2024-03-20 14:40:00', location: '청주대학교' },
      { time: '2024-03-20 14:50:00', location: '장소3' },
      { time: '2024-03-20 15:00:00', location: '장소4' },
      { time: '2024-03-20 15:10:00', location: '장소5' },
      { time: '2024-03-20 15:20:00', location: '장소6' },
    ],
    section: SECTION.SHUTTLE_DETAIL,
  },
};

export const ReservationDetail: Story = {
  args: {
    object: [
      { time: '2024-03-20 14:30:00', location: '청주터미널' },
      { time: '2024-03-20 14:40:00', location: '청주대학교', is_pickup: true },
      { time: '2024-03-20 14:50:00', location: '장소3' },
      { time: '2024-03-20 15:00:00', location: '장소4' },
      { time: '2024-03-20 15:10:00', location: '장소5' },
      { time: '2024-03-20 15:20:00', location: '장소6', is_dropoff: true },
    ],
    section: SECTION.RESERVATION_DETAIL,
  },
};

export const MyReservation: Story = {
  args: {
    object: [
      { time: '2024-03-20 14:30:00', location: '청주터미널' },
      { time: '2024-03-20 14:40:00', location: '청주대학교', is_pickup: true },
      { time: '2024-03-20 14:50:00', location: '장소3', is_dropoff: true },
      { time: '2024-03-20 15:00:00', location: '장소4' },
      { time: '2024-03-20 15:10:00', location: '장소5' },
      { time: '2024-03-20 15:20:00', location: '장소6' },
    ],
    section: SECTION.MY_RESERVATION,
  },
};
