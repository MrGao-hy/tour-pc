import { notification } from "antd";
import axios from "axios";
import cookie from "@/config/cookie";
import config from "@/config";

const http = axios.create({
  baseURL: "/ms/",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * http request 请求拦截器封装
 * */
http.interceptors.request.use(
  (conf) => {
    conf.data = JSON.stringify(conf.data);
    // message.loading({key: 'request',content: '加载中...'})
    if (!["user/login"].includes(conf.url as string)) {
      conf.headers["Authorization"] = cookie.get(config.prefix + "token");
    }
    return conf;
  },
  (error) => {
    notification.error({
      message: error,
    });
    return Promise.reject(error);
  },
);

/**
 * http response 响应拦截器封装
 * */
http.interceptors.response.use(
  (response) => {
    const { code, data, message: msg } = response.data;

    const errorCode = [
      20001, 30002, 30001, 40001, 40002, 40003, 40004, 40005, 40007, 50001,
    ].includes(code);
    if (errorCode) {
      // openNotificationWithIcon("error");
      if (code === 40001 || code === 40004) {
        window.location.href = "/login";
      }
      notification.error({
        message: msg,
      });
    } else {
      if (data) {
        return data;
      } else {
        return response.data;
      }
    }
    return Promise.reject(response);
  },
  (error) => {
    notification.error({
      message: error.message,
    });
    return Promise.reject(error);
  },
);

//失败提示
function msag(err: any) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        alert(err.response.data.error.details);
        break;
      case 401:
        alert("未授权，请登录");
        break;

      case 403:
        alert("拒绝访问");
        break;

      case 404:
        alert("请求地址出错");
        break;

      case 408:
        alert("请求超时");
        break;

      case 500:
        alert("服务器内部错误");
        break;

      case 501:
        alert("服务未实现");
        break;

      case 502:
        alert("网关错误");
        break;

      case 503:
        alert("服务不可用");
        break;

      case 504:
        alert("网关超时");
        break;

      case 505:
        alert("HTTP版本不受支持");
        break;
      default:
    }
  }
}

export default http;
