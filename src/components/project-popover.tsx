import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { projectListActions } from "screens/project-list/project-list.slice";
import { useProjects } from "utils/project";
import { ButtomNoPadding } from "./lib";

export const ProjectPopover = () => {
  const dispach = useDispatch();
  const { data: projects } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtomNoPadding
        onClick={() => dispach(projectListActions.openProjectModal())}
        type={"link"}
      >
        创建项目
      </ButtomNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
