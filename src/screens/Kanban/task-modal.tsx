import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTaskModal, useTasksQueryKey } from "./util";
import { useDeleteTask, useEditTask } from "utils/task";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import { start } from "repl";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskMoadl = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close, isLoading } = useTaskModal();

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除任务吗？",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  return (
    <Modal
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
      forceRender={true}
    >
      <Form initialValues={editingTask} form={form} {...layout}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"}></UserSelect>
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button size={"small"} onClick={startDelete}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
