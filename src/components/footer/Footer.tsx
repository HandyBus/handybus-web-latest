'use client';

import LogoIcon from 'public/icons/logo.svg';
import TwitterXIcon from 'public/icons/twitter-x.svg';
import InstagramIcon from 'public/icons/instagram.svg';
import NaverBlogIcon from 'public/icons/naver-blog.svg';
import Link from 'next/link';
import { handleExternalLink } from '@/utils/externalLink.util';

const Footer = () => {
  return (
    <footer className="flex w-full flex-col gap-8 px-16 py-[28px]">
      <div className="flex justify-between">
        <LogoIcon fill="#808080" width="106" height="23" viewBox="0 0 83 18" />
        <div className="flex gap-16">
          <button
            type="button"
            onClick={() =>
              handleExternalLink('https://www.instagram.com/handy.bus/')
            }
          >
            <InstagramIcon />
          </button>
          <button
            type="button"
            onClick={() =>
              handleExternalLink(
                'https://x.com/Handy_Bus?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
              )
            }
          >
            <TwitterXIcon />
          </button>
          <button
            type="button"
            onClick={() =>
              handleExternalLink('https://blog.naver.com/handy_bus')
            }
          >
            <NaverBlogIcon />
          </button>
        </div>
      </div>
      <div className="flex gap-8 text-12 font-600 text-basic-grey-600">
        <Link href="/help/faq">고객센터</Link>
        <span className="font-400"> | </span>
        <Link href="/help/faq/terms-of-service">이용약관</Link>
        <span className="font-400"> | </span>
        <Link href="/help/faq/privacy-policy">개인정보처리방침</Link>
        <span className="font-400"> | </span>
        <Link href="/help/faq/marketing-consent">마케팅 활용 동의</Link>
      </div>
      <div className="text-12 font-400 leading-[1.6] text-basic-grey-400">
        상호명: (주) 스테이브 | 대표자: 정지용 | 전화번호: 0507-1372-6141 |
        이메일: handybus@handybus.co.kr | 사업자등록번호: 834-87-03565 |
        통신판매업신고번호: 2024-서울강북-0849 | 주소: 서울특별시 성북구
        안암로145, 경영본관 219호
      </div>
    </footer>
  );
};

export default Footer;
