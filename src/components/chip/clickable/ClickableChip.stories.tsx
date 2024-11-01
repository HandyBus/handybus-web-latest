import { Meta, StoryObj } from '@storybook/react';
import ClickableChip from './ClickableChip';

const meta: Meta<typeof ClickableChip> = {
  title: 'Components/ClickableChip',
  component: ClickableChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ClickableChip>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading',
  },
};
