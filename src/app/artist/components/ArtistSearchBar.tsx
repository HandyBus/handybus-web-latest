import CloseIcon from '../icons/close.svg';
import SearchIcon from '../icons/search.svg';

interface Props {
  query: string;
  onChangeQuery: (query: string) => void;
}

const ArtistSearchBar = ({ query, onChangeQuery }: Props) => {
  return (
    <div className="mt-12 flex items-center gap-12 rounded-full border border-basic-grey-200 px-12 py-8">
      <input
        type="text"
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder="그룹명, 아티스트명을 입력하세요."
        className="flex-1 text-14 font-500 leading-[160%] text-basic-black placeholder:text-basic-grey-400 focus:outline-none"
      />
      {query ? (
        <button
          type="button"
          onClick={() => onChangeQuery('')}
          className="flex shrink-0 items-center"
        >
          <CloseIcon className="h-20 w-20" />
        </button>
      ) : (
        <SearchIcon className="h-20 w-20 shrink-0" />
      )}
    </div>
  );
};

export default ArtistSearchBar;
