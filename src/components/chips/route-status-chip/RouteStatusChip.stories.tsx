import { Meta, StoryObj } from '@storybook/react';
import RouteStatusChip from './RouteStatusChip';

const meta: Meta<typeof RouteStatusChip> = {
  title: 'Components/chips/RouteStatusChip',
  component: RouteStatusChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RouteStatusChip>;

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

export const Pending: Story = {
  args: {
    status: 'CONFIRMED',
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
