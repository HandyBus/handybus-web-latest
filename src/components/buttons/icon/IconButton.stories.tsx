import { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

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
