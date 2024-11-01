import { Meta, StoryObj } from '@storybook/react';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/buttons/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Primary: Story = {
  args: {
    children: '최애 가수를 검색해보세요',
  },
};
