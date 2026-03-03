import Image from 'next/image';
import AddArtistImage from '../images/add-artist.png';
import { handleExternalLink } from '@/utils/externalLink.util';
import MagnifyIcon from 'public/icons/magnify.svg';

const ARTIST_REQUEST_URL =
  process.env.NEXT_PUBLIC_ARTIST_REQUEST_FORM_URL ?? '';

const EmptyResult = () => {
  return (
    <div className="mt-16 flex flex-1 flex-col items-center pt-24">
      <MagnifyIcon
        className="h-40 w-40
         text-basic-grey-300"
      />
      <p className="pb-16 pt-16 text-16 font-500 leading-[160%] text-basic-grey-400">
        등록되지 않은 아티스트입니다.
      </p>
      <div className="mt-16 w-full">
        <button
          type="button"
          onClick={() => {
            if (ARTIST_REQUEST_URL) {
              handleExternalLink(ARTIST_REQUEST_URL);
            }
          }}
          className="flex w-full items-center gap-8 rounded-12 border border-basic-grey-200 bg-basic-grey-50 p-16"
        >
          <Image src={AddArtistImage} alt="" width={40} height={40} />
          <div className="flex flex-col items-start">
            <span className="text-12 font-500 leading-[160%] text-basic-grey-500">
              아직 내 최애가 없다고요?
            </span>
            <span className="text-16 font-600 leading-[140%]">
              아티스트 요청하기
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default EmptyResult;
