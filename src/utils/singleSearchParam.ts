const singleSearchParam = (
  sp: string | string[] | null | undefined,
): string | undefined => {
  if (Array.isArray(sp)) return sp[0] || undefined;
  return sp || undefined;
};

export default singleSearchParam;
