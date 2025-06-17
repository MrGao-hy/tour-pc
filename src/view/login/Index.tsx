import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import "./index.scss";
import TheUserLogin from "@/components/TheUserLogin/TheUserLogin";
import { Tabs } from "antd";
import Logo from "@/static/image/logo.png";
import { Link } from "react-router-dom";
import { UserLoginType } from "@/typing";
import { decrypt } from "@/utils";
import config from "@/config";
import cookie from "@/config/cookie";


const Login: React.FC = () => {

  const [ userFrom, setUserFrom ] = useState<UserLoginType>({
    userName: "",
    password: "",
    code: "",
    remember: false
  });
  const [tabs] = useState([
    {
      label: "密码登录",
      key: "1"
    },
    {
      label: "手机号登录",
      key: "2"
    }
  ]);

  useEffect(() => {
    const salt = cookie.get(config.prefix + "salt");
    const data = cookie.get(config.prefix + "login");
    if(data && salt) {
      const param = JSON.parse(decrypt(data, salt, config.iv));
      setUserFrom({
        userName: param?.userName,
        password: param?.password,
        code: param?.code,
        remember: param?.remember,
      })
    }
  }, [])
  return (
    <>
      <div className={style.login}>
        <div className={style.login_container}>
          <img src={ Logo }
               className={style.login_container__logo}></img>
          <Tabs centered
                defaultActiveKey="1"
                tabBarGutter={ 80 }
                items={ tabs } />
          <TheUserLogin userFrom={ userFrom }></TheUserLogin>
          <div className={style.login_container__bottom}>
            <Link to={"/register"} className={style.login_container__bottom__left}>立即注册？</Link>
            <Link to={"/user/changePwd"} className={style.login_container__bottom__right}>忘记密码？</Link>
          </div>
        </div>

        <div className={style.login_footer}>山徒旅行 ©{new Date().getFullYear()} <a href={"https://beian.miit.gov.cn"} target="_blank">赣ICP备2024048852号-1</a></div>
      </div>
    </>
  );
};

export default Login;
