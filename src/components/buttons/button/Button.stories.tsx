import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/buttons/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;
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

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
};

export const PrimaryDestructive: Story = {
  args: {
    children: 'Primary Destructive Button',
    variant: 'p-destructive',
  },
};

export const SecondaryDestructive: Story = {
  args: {
    children: 'Secondary Destructive Button',
    variant: 's-destructive',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Custom: Story = {
  args: {
    children: 'Custom Button',
    variant: 'custom',
  },
};
