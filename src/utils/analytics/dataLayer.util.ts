export const pushDataLayerEvent = (
  event: string,
  eventParams?: Record<string, unknown>,
) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...eventParams,
  });
};
