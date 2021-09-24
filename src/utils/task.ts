import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "utils/http";

export const useKTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
