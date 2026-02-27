import dayjs from 'dayjs';
import { pushDataLayerEvent } from './dataLayer.util';

export const gtagFAQClick = (
  faqTitle: string,
  faqCategory: string,
  position: number,
  clickOrder: number | undefined,
  action: 'open' | 'close',
) => {
  pushDataLayerEvent('faq_click', {
    event_category: 'faq_engagement',
    faq_title: faqTitle.substring(0, 100),
    faq_category: faqCategory,
    faq_position: position,
    click_order: clickOrder,
    action_type: action,
    timestamp: dayjs(),
  });
};
