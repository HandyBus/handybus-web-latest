import { Meta, StoryObj } from '@storybook/react';
import Section from './Section';

const meta: Meta<typeof Section> = {
  title: 'Components/Section',
  component: Section,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Primary: Story = {
  args: {
    title: '수요 확인 중인 셔틀',
    showMore: '/',
  },
};
