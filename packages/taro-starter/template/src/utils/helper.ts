export const filterObj = (source: Object): Object => {
  const result = {};
  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined) continue;
    if (isObject(value)) {
      result[key] = filterObj(value);
    } else {
      result[key] = value;
    }
  }
  return result;
};

export const isObject = (value: any): boolean => {
  return Object.prototype.toString.call(value) === '[object Object]';
};
