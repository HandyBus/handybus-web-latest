import { Meta, StoryObj } from '@storybook/react';
import SelectableChip from './SelectableChip';

const meta: Meta<typeof SelectableChip> = {
  title: 'Components/chips/SelectableChip',
  component: SelectableChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SelectableChip>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};

export const PrimarySelected: Story = {
  args: {
    children: 'Primary Button',
    selected: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const SecondarySelected: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    selected: true,
  },
};
