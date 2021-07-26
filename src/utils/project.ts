import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { useHttp } from "utils/http";
import { cleanObject } from "utils/index";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    // loading
    run(client("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
