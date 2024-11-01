import { Meta, StoryObj } from '@storybook/react';
import ShuttleStatusChip from './ShuttleStatusChip';

const meta: Meta<typeof ShuttleStatusChip> = {
  title: 'Components/ShuttleStatusChip',
  component: ShuttleStatusChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShuttleStatusChip>;

export const Primary: Story = {
  args: {},
};
