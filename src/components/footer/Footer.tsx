import LogoIcon from 'public/icons/logo.svg';
import TwitterIcon from 'public/icons/twitter.svg';
import InstagramIcon from 'public/icons/instagram.svg';
import NaverBlogIcon from 'public/icons/naver-blog.svg';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-16 px-16 py-[28px]">
      <LogoIcon fill="#808080" width="106" height="23" viewBox="0 0 83 18" />
      <div className="text-12 font-400 leading-[1.6] text-grey-400">
        상호명: 핸디버스 <br />
        대표자명: 정지용 <br />
        전화번호: 010-8514-6141 <br />
        사업자등록번호: 522-59-00696 <br />
        통신판매업신고번호: 2024-서울강북-0849 <br />
        주소: 서울특별시 강북구 도봉로76가길 55, 지하 1층 B-126호 (미아동,
        성신여자대학교운정그린캠퍼스)
      </div>
      <div className="flex gap-16">
        <a
          href="https://www.instagram.com/handy.bus/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://x.com/Handy_Bus?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://blog.naver.com/handy_bus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NaverBlogIcon />
        </a>
      </div>
      <div className="text-12 font-600 text-grey-500">
        <Link href="/policy">이용약관</Link>
        <span className="font-400"> | </span>
        <a
          href="http://pf.kakao.com/_AxncxhG"
          target="_blank"
          rel="noopener noreferrer"
        >
          카카오톡 문의하기
        </a>
      </div>
    </footer>
  );
};

export default Footer;
