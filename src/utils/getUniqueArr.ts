export const getUniqueArr = (arr: any, prop: string) => {
  const set = new Set();
  return arr.filter((o: any) => !set.has(o[prop]) && set.add(o[prop]));
};
