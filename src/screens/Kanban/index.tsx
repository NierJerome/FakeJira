import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans = [] } = useKanbans();
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      {kanbans.map((kanban) => (
        <div key={kanban.id}>{kanban.name}</div>
      ))}
    </div>
  );
};
