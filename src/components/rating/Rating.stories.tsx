import { Meta, StoryObj } from '@storybook/react';
import { useState } from '@storybook/preview-api';
import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
};

export default meta;

type Rating = StoryObj<typeof Rating>;

export const Medium = {
  args: {
    size: 'medium',
    value: 3,
  },
};

export const Large = {
  args: {
    size: 'large',
    value: 5,
  },
};

export const MediumInteractive = {
  args: {
    size: 'medium',
  },
  render: function Render(args: { size: 'medium' | 'large' }) {
    const [rating, setRating] = useState<number>(2);
    return <Rating size={args.size} value={rating} onChange={setRating} />;
  },
};

export const LargeInteractive = {
  args: {
    size: 'large',
  },
  render: function Render(args: { size: 'medium' | 'large' }) {
    const [rating, setRating] = useState<number>(4);
    return <Rating size={args.size} value={rating} onChange={setRating} />;
  },
};
