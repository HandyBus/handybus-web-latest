import { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/inputs/TextArea',
  component: TextArea,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Primary: Story = {
  args: {},
};
