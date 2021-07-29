import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? true : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 工具函数应该是纯函数，且不应该改变原始值 键值对对象类型[key:string]:unknown
export const cleanObject = (object: { [key: string]: unknown }) => {
  // object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// Custom Hook hook只允许在组件中或其它hook中运行
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  // 页面加载时: 旧title
  // 加载后: 新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，则会读到旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 用来返回组件的加载状态，如果还没挂载，或者已经卸载，返回false；反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
