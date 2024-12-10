import { Meta, StoryObj } from '@storybook/react';
import Counter from './Counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Counter>;

export const Primary: Story = {
  args: {},
};
