import type { HTMLProps } from 'react';
import Magnify from 'public/icons/magnify.svg';

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
}

const SearchBar = ({ children, ...rest }: Props) => {
  return (
    <button
      className="border-basic-grey-100 flex h-52 w-full items-center justify-start gap-[10px] overflow-hidden overflow-ellipsis whitespace-nowrap rounded-full border px-16"
      {...rest}
    >
      <div className="text-basic-grey-400 self-center text-[22px]">
        <Magnify />
      </div>
      <span className="text-basic-grey-300 my-12 overflow-hidden overflow-ellipsis whitespace-nowrap text-16 font-400">
        {children}
      </span>
    </button>
  );
};

export default SearchBar;
