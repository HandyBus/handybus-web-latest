import dayjs from 'dayjs';

export const trackFAQClick = (
  faqTitle: string,
  faqCategory: string,
  position: number,
  clickOrder: number,
  action: 'open' | 'close',
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'faq_click', {
      event_category: 'faq_engagement',
      faq_title: faqTitle.substring(0, 100), // 자주묻는 질문 제목
      faq_category: faqCategory, // 탭 이름 (reservation, boarding, etc)
      faq_position: position, // 목록에서의 위치 (1, 2, 3...)
      click_order: clickOrder, // 클릭 순서 (첫번째, 두번째...)
      action_type: action, // 열기/닫기
      timestamp: dayjs().toISOString(),
    });
  }
};
