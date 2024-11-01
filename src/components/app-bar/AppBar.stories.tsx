import { Meta, StoryObj } from '@storybook/react';
import AppBar from './AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Components/AppBar',
  component: AppBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AppBar>;

export const Primary: Story = {
  args: {},
};
