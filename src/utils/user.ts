import { User } from "types/user";
import { useAsync } from "utils/use-async";
import { useHttp } from "utils/http";
import { useEffect } from "react";
import { cleanObject } from "utils/index";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();

  useEffect(() => {
    // loading
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
