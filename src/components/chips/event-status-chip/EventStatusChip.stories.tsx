import { Meta, StoryObj } from '@storybook/react';
import EventStatusChip from './EventStatusChip';

const meta: Meta<typeof EventStatusChip> = {
  title: 'Components/chips/EventStatusChip',
  component: EventStatusChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EventStatusChip>;

export const DemandSurvey: Story = {
  args: {
    status: 'OPEN',
  },
};

export const DemandClosed: Story = {
  args: {
    status: 'CLOSED',
  },
};

export const ReservationClosed: Story = {
  args: {
    status: 'ENDED',
  },
};

export const Inactive: Story = {
  args: {
    status: 'INACTIVE',
  },
};
