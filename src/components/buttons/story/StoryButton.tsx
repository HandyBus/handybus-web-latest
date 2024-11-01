import React from 'react';
export const StoryButton = (props: {
  children: React.ReactNode;
  backgroundColor?: string;
}) => {
  return (
    <button style={{ backgroundColor: props.backgroundColor }}>
      {props.children}
    </button>
  );
};
