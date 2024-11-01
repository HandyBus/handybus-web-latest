import { Meta, StoryObj } from '@storybook/react';
import Indicator from './Indicator';

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  component: Indicator,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Indicator>;

export const Primary: Story = {
  args: {},
};
