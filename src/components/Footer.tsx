import LogoIcon from '@/icons/logo.svg';
import TwitterIcon from '@/icons/twitter.svg';
import InstagramIcon from '@/icons/instagram.svg';
import NaverBlogIcon from '@/icons/naver-blog.svg';

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-16 px-16 py-[28px]">
      <LogoIcon fill="#808080" width="106" height="23" viewBox="0 0 83 18" />
      <div className="text-12 font-400 leading-[1.6] text-grey-400">
        상호명: 핸디버스 <br />
        대표자명: 정지용 <br />
        사업자등록번호: 522-59-00696 <br />
        주소: 서울특별시 강북구 도봉로76가길 55, 지하 1층 B-126호 (미아동,
        성신여자대학교운정그린캠퍼스)
      </div>
      <div className="flex gap-16">
        <button>
          <InstagramIcon />
        </button>
        <button>
          <TwitterIcon />
        </button>
        <button>
          <NaverBlogIcon />
        </button>
      </div>
      <div className="text-12 font-600 text-grey-500">
        <button>이용약관</button>
        <span className="font-400"> | </span>
        <button>개인정보처리방침</button>
      </div>
    </footer>
  );
};

export default Footer;
