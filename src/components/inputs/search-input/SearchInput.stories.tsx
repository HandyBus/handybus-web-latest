import { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/inputs/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchInput>;

export const Primary: Story = {
  args: {},
};
