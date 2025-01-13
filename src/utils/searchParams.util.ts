export const toSearchParams = (
  params: Record<string, string | number | undefined> | undefined,
) => {
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
