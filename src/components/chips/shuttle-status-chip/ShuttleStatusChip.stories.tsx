import { Meta, StoryObj } from '@storybook/react';
import ShuttleStatusChip from './ShuttleStatusChip';

const meta: Meta<typeof ShuttleStatusChip> = {
  title: 'Components/chips/ShuttleStatusChip',
  component: ShuttleStatusChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShuttleStatusChip>;

export const DemandSurvey: Story = {
  args: {
    status: 'DEMAND_SURVEY',
  },
};

export const DemandClosed: Story = {
  args: {
    status: 'SURVEY_CLOSED',
  },
};

export const Pending: Story = {
  args: {
    status: 'PENDING',
  },
};

export const ReservationClosed: Story = {
  args: {
    status: 'RESERVATION_CLOSED',
  },
};

export const Ended: Story = {
  args: {
    status: 'ENDED',
  },
};
