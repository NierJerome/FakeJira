import { useEffect, useState } from "react";
import { isSpreadAssignment } from "typescript";

export const isFalsy = (value: unknown) => (value === 0 ? true : !value);

// 工具函数应该是纯函数，且不应该改变原始值
export const cleanObject = (object: object) => {
  // object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// Custom Hook hook只允许在组件中或其它hook中运行
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// debounce 防抖
/*
 * 多次请求只保留最后一次请求的效果
 * 可以使用不够直观
 */
// export const debounce = (func, delay) => {
//   let timeout
//   return (...param) => {
//     // 闭包
//     if (timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       func(...param)
//     }, delay)
//   }
// }

// 后面用泛型规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialState: T[]) => {
  const [value, setValue] = useState(initialState);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
