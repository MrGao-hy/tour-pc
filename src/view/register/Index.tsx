import React, { useEffect, useRef } from "react";
import { Card } from "antd";
import {
  StepsForm,
  ProFormText,
  ProFormSelect,
  ProFormDateRangePicker
} from "@ant-design/pro-components";
import type { ProFormInstance } from "@ant-design/pro-components";
import { registerUserApi } from "@/api";
import { UserInfoType } from "@/typing";




const register = () => {

  const onRegister = async (e: UserInfoType) => {
    console.log(e);
    const res = await registerUserApi(e);
    window.history.back();
    return Promise.resolve();
  };

  return (
    <Card style={{ flex: 1, height: '100vh' }}>
      <StepsForm onFinish={onRegister}>
        <StepsForm.StepForm name="step1" title="注册用户">
          <ProFormText name="userName" label="姓名" />
          <ProFormText name="password" label="密码" />
          <ProFormText name="phone" label="手机号" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step2" title="用户信息">
          <ProFormText name="idCard" label="身份证信息" />
          <ProFormText name="address" label="家庭住址" />
        </StepsForm.StepForm>
      </StepsForm>
    </Card>
  );
};

export default register;
