import { createStack } from './stack-config';
import HomeActivity from './home-activities/HomeActivity';
import EventDetailActivity from './event-activities/EventDetailActivity';
import EventListActivity from './event-activities/EventListActivity';
import PaymentActivity from './event-activities/PaymentActivity';
import HistoryActivity from './history-activities/HistoryActivity';
import LoginActivity from './extra-activities/LoginActivity';
import DemandDetailActivity from './history-activities/DemandDetailActivity';
import ReservationDetailActivity from './history-activities/ReservationDetailActivity';
import MyPageActivity from './mypage-activities/MyPageActivity';
import ReviewsActivity from './mypage-activities/ReviewsActivity';
import ReviewDetailActivity from './mypage-activities/ReviewDetailActivity';
import EditReviewActivity from './mypage-activities/EditReviewActivity';
import WriteReviewActivity from './mypage-activities/WriteReviewActivity';
import ReviewCompleteActivity from './mypage-activities/ReviewCompleteActivity';
import SettingsActivity from './mypage-activities/SettingsActivity';
import ProfileEditActivity from './mypage-activities/ProfileEditActivity';
import CouponsActivity from './mypage-activities/CouponsActivity';
import AlertRequestsActivity from './mypage-activities/AlertRequestsActivity';
import AlertRequestDetailActivity from './mypage-activities/AlertRequestDetailActivity';
import ReservationTransferSuccessActivity from './history-activities/ReservationTransferSuccessActivity';
import ReservationTransferActivity from './history-activities/ReservationTransferActivity';
import TicketListActivity from './ticket-activities/TicketListActivity';
import TicketDetailActivity from './ticket-activities/TicketDetailActivity';
import AnnouncementListActivity from './extra-activities/AnnouncementListActivity';
import AnnouncementDetailActivity from './extra-activities/AnnouncementDetailActivity';
import AboutActivity from './extra-activities/AboutActivity';
import HandybusGuideActivity from './extra-activities/HandybusGuideActivity';
import FaqActivity from './extra-activities/FaqActivity';
import DirectInquiryActivity from './extra-activities/DirectInquiryActivity';
import TermsOfServiceActivity from './extra-activities/TermsOfServiceActivity';
import PrivacyPolicyActivity from './extra-activities/PrivacyPolicyActivity';
import MarketingConsentActivity from './extra-activities/MarketingConsentActivity';
import EventListFromHomeActivity from './home-activities/EventListFromHomeActivity';
import AppLaunchEventActivity from './extra-activities/AppLaunchEventActivity';

const activities = {
  // home activities
  Home: HomeActivity,
  EventListFromHome: EventListFromHomeActivity,
  // event activities
  EventList: EventListActivity,
  EventDetail: EventDetailActivity,
  Payment: PaymentActivity,
  // history activities
  History: HistoryActivity,
  DemandDetail: DemandDetailActivity,
  ReservationDetail: ReservationDetailActivity,
  ReservationTransfer: ReservationTransferActivity,
  ReservationTransferSuccess: ReservationTransferSuccessActivity,
  // mypage activities
  MyPage: MyPageActivity,
  Reviews: ReviewsActivity,
  ReviewDetail: ReviewDetailActivity,
  EditReview: EditReviewActivity,
  WriteReview: WriteReviewActivity,
  ReviewComplete: ReviewCompleteActivity,
  Settings: SettingsActivity,
  ProfileEdit: ProfileEditActivity,
  Coupons: CouponsActivity,
  AlertRequests: AlertRequestsActivity,
  AlertRequestDetail: AlertRequestDetailActivity,
  // ticket activities
  Ticket: TicketListActivity,
  TicketDetail: TicketDetailActivity,
  // extra activities
  Login: LoginActivity,
  AnnouncementList: AnnouncementListActivity,
  AnnouncementDetail: AnnouncementDetailActivity,
  About: AboutActivity,
  HandybusGuide: HandybusGuideActivity,
  Faq: FaqActivity,
  DirectInquiry: DirectInquiryActivity,
  TermsOfService: TermsOfServiceActivity,
  PrivacyPolicy: PrivacyPolicyActivity,
  MarketingConsent: MarketingConsentActivity,
  AppLaunchEvent: AppLaunchEventActivity,
};

const routes = {
  // home activities
  Home: '/',
  EventListFromHome: '/event-from-home',
  // event activities
  EventList: '/event',
  EventDetail: '/event/:eventId',
  Payment:
    '/event/:eventId/dailyevent/:dailyEventId/route/:shuttleRouteId/payment',
  // history activities
  History: '/history',
  DemandDetail: '/history/demand/:demandId',
  ReservationDetail: '/history/reservation/:reservationId',
  ReservationTransfer:
    '/history/reservation/:reservationId/reservation-transfer',
  ReservationTransferSuccess:
    '/history/reservation/:reservationId/reservation-transfer/success',
  // mypage activities
  MyPage: '/mypage',
  Reviews: '/mypage/reviews',
  ReviewDetail: '/mypage/reviews/:reviewId',
  EditReview: '/mypage/reviews/edit/:reviewId',
  WriteReview: '/mypage/reviews/write/:reservationId',
  ReviewComplete: '/mypage/reviews/write/:reservationId/complete',
  Settings: '/mypage/settings',
  ProfileEdit: '/mypage/profile/edit',
  Coupons: '/mypage/coupons',
  AlertRequests: '/mypage/alert-requests',
  AlertRequestDetail: '/mypage/alert-requests/:alertRequestId',
  // ticket activities
  Ticket: '/ticket',
  TicketDetail: '/ticket/:reservationId',
  // extra activities
  Login: '/login',
  AnnouncementList: '/announcements',
  AnnouncementDetail: '/announcements/:id',
  About: '/help/about',
  HandybusGuide: '/help/handybus-guide',
  Faq: '/help/faq',
  DirectInquiry: '/help/faq/direct-inquiry',
  TermsOfService: '/help/faq/terms-of-service',
  PrivacyPolicy: '/help/faq/privacy-policy',
  MarketingConsent: '/help/faq/marketing-consent',
  AppLaunchEvent: '/app-launch-event',
};

export const { Stack, useFlow } = createStack(activities, routes, 'Home');
