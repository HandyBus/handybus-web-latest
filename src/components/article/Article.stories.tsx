import { Meta, StoryObj } from '@storybook/react';
import Article from './Article';

const meta: Meta<typeof Article> = {
  title: 'Components/Section',
  component: Article,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Article>;

export const Primary: Story = {
  args: {
    title: '수요 확인 중인 셔틀',
    showMore: '/',
  },
};
