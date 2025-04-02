// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toSearchParams = (params: Record<any, any> | undefined) => {
  const searchParams = new URLSearchParams();
  if (!params) {
    return searchParams;
  }
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });
  return searchParams;
};
