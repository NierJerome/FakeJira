import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  // 基本类型可以放到依赖里，组件状态可以放到依赖里；非组件状态的对象绝不可以放进依赖里
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  console.log(param, "param");

  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUser();
  useDocumentTitle("项目列表", false);
  // 组件加载只获取一次的优化

  return (
    <Container>
      <h1>项目列表 </h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
