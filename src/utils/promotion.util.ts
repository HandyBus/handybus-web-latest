export const getInvitePaybackEventUrl = () => {
  const eventId = process.env.NEXT_PUBLIC_INVITE_PAYBACK_ANNOUNCEMENT_ID;
  if (eventId) {
    return `/announcements/${eventId}`;
  }
  return '/announcements';
};
