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
      faq_title: faqTitle.substring(0, 100),
      faq_category: faqCategory,
      faq_position: position,
      click_order: clickOrder,
      action_type: action,
      timestamp: dayjs(),
    });
  }
};
