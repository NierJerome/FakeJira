import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { LangButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  // const login = (param: { username: string; password: string }) => {

  // };
  const { register, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入账号" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LangButton htmlType={"submit"} type={"primary"}>
          注册
        </LangButton>
      </Form.Item>
    </Form>
  );
};
