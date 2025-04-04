import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const LARGE: Story = {
  args: {
    variant: 'LARGE',
    image: null,
    isSaleStarted: false,
  },
};

export const MEDIUM: Story = {
  args: {
    variant: 'MEDIUM',
    image: null,
  },
};

export const SMALL: Story = {
  args: {
    variant: 'SMALL',
    image: null,
  },
};
