import React from "react";
import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "screens/project-list/search-panel";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtomNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";

// TODO 把所有ID都改为number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProjedct = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  const dispatch = useDispatch();
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin disabled={true} checked />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                //  柯里化
                onCheckedChange={pinProjedct(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtomNoPadding
                        onClick={() =>
                          dispatch(projectListActions.openProjectModal())
                        }
                        type={"link"}
                      >
                        编辑
                      </ButtomNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtomNoPadding type={"link"}>...</ButtomNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
