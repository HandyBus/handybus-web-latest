import { Meta, StoryObj } from '@storybook/react';
import EventTypeChip from './EventTypeChip';

const meta: Meta<typeof EventTypeChip> = {
  title: 'Components/chips/EventTypeChip',
  component: EventTypeChip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EventTypeChip>;

export const CONCERT: Story = {
  args: {
    isSelected: true,
    children: '콘서트',
  },
};

export const FESTIVAL: Story = {
  args: {
    isSelected: false,
    children: '페스티벌',
  },
};
