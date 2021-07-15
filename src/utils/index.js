export const isFalsy = (value) => (value == 0 ? true : !value);

// 工具函数应该是纯函数，且不应该改变原始值
export const cleanObject = (object) => {
  // object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
