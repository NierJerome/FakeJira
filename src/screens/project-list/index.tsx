import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUser();

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

const Container = styled.div`
  padding: 3.2rem;
`;
