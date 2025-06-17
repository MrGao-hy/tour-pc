import { getLoginCodeApi, loginApi } from "@/api";
import {
  Button,
  Checkbox,
  CheckboxProps,
  Form,
  FormProps,
  Input,
  Image,
} from "antd";
import { UserOutlined, SafetyOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserLoginType } from "@/typing";
import "./theUserLogin.scss";
import { setUserInfo } from "@/store/reducer/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { encrypt } from "@/utils";
import config from "@/config";
import cookie from "@/config/cookie";

interface UserPropsType {
  userFrom: UserLoginType;
}

const TheUserLogin: React.FunctionComponent<UserPropsType> = (
  props: UserPropsType,
) => {
  const { userFrom } = props;
  const navigate = useNavigate();
  const [outlineForm] = Form.useForm();
  const [verifyCode, setVerifyCode] = useState("");
  const dispatch: AppDispatch = useDispatch();

  /**
   * 是否记住密码
   * */
  const onChangeMsg: CheckboxProps["onChange"] = () => {
    // userFrom.remember = e.target.checked
  };

  /**
   * 登录操作
   * */
  const onFinish: FormProps<UserLoginType>["onFinish"] = async (
    values: UserLoginType,
  ) => {
    const uuid = cookie.get(config.prefix + "uuid");
    const res = await loginApi(
      Object.assign(values, {
        uuid,
      }),
    );
    cookie.set(config.prefix + "token", res.token);
    cookie.remove(config.prefix + "uuid");
    if (values.remember) {
      cookie.set(
        config.prefix + "login",
        encrypt(JSON.stringify(values), res.salt, config.iv),
      );
      cookie.set(config.prefix + "salt", res.salt);
    }
    dispatch(setUserInfo());
    navigate("/");
  };

  /**
   * 刷新验证码
   * */
  const refreshVerifyCodeFn = () => {
    const uuid: string = new Date().getTime().toString();
    cookie.set(config.prefix + "uuid", uuid);
    getLoginCodeApi({
      uuid,
    }).then((res) => {
      setVerifyCode("data:image/png;base64," + res);
    });
  };

  useEffect(() => {
    refreshVerifyCodeFn();
    outlineForm.setFieldsValue(userFrom);
  }, [userFrom]);

  return (
    <>
      <Form
        variant="filled"
        form={outlineForm}
        initialValues={userFrom}
        onFinish={onFinish}
        className={"login-form"}
      >
        <Form.Item<UserLoginType>
          name="userName"
          rules={[{ required: true, message: "请输入您的名字!" }]}
        >
          <Input prefix={<UserOutlined />} variant={"borderless"} />
        </Form.Item>
        <Form.Item<UserLoginType>
          name="password"
          rules={[{ required: true, message: "请输入您的密码!" }]}
        >
          <Input.Password prefix={<SafetyOutlined />} variant={"borderless"} />
        </Form.Item>
        <Form.Item<UserLoginType>
          name="code"
          rules={[{ required: true, message: "请输入您的名字!" }]}
        >
          <Input
            variant={"borderless"}
            suffix={
              <Image
                src={verifyCode}
                width={80}
                preview={false}
                onClick={refreshVerifyCodeFn}
              ></Image>
            }
          />
        </Form.Item>
        <Form.Item<UserLoginType> name="remember" valuePropName="checked">
          <Checkbox onChange={onChangeMsg}>记住密码</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block shape="round">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default TheUserLogin;
