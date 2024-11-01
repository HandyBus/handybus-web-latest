import { Meta, StoryObj } from '@storybook/react';
import SearchBarShapeButton from './SearchBarShapeButton';

const meta: Meta<typeof SearchBarShapeButton> = {
  title: 'Components/SearchBarShapeButton',
  component: SearchBarShapeButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchBarShapeButton>;

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
