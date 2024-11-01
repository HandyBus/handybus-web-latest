import { Meta, StoryObj } from '@storybook/react';
import DeadZone from './DeadZone';

const meta: Meta<typeof DeadZone> = {
  title: 'Components/DeadZone',
  component: DeadZone,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DeadZone>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading',
  },
};
