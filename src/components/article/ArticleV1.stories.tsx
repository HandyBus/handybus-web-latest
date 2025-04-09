import { Meta, StoryObj } from '@storybook/react';
import Article from './ArticleV1';

const meta: Meta<typeof Article> = {
  title: 'Components/Section',
  component: Article,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Article>;

export const Primary: Story = {
  args: {
    title: '수요조사 진행 중',
    showMore: '/',
  },
};
