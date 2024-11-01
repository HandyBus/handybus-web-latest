import { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    children: '+',
  },
};

export const Disabled: Story = {
  args: {
    children: '+',
    disabled: true,
  },
};
