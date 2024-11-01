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
    status: 'demand-survey',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
  },
};

export const Closed: Story = {
  args: {
    status: 'closed',
  },
};

export const Ended: Story = {
  args: {
    status: 'ended',
  },
};
