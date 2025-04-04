import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    variant: 'LARGE',
    image: null,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'MEDIUM',
    image: null,
  },
};

export const Loading: Story = {
  args: {
    variant: 'SMALL',
    image: null,
  },
};
