import {
  HomeOutlined,
  IdcardOutlined,
  AppstoreOutlined,
  SettingOutlined,
  TeamOutlined,
  RobotOutlined, MedicineBoxOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menus: MenuItem[] = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />
  },
  {
    label: "用户信息",
    key: "user",
    icon: <TeamOutlined />,
    children: [
      {
        label: "用户列表",
        key: "/user/list"
      },
      {
        label: "用户详情",
        key: "/user/detail"
      }
    ]
  },
  {
    label: "百宝箱",
    key: "tools",
    icon: <MedicineBoxOutlined />,
    children: [
      {
        label: "图片邮集",
        key: "/tools/image"
      },
      {
        label: "查询列表",
        key: "/list/table-list"
      }
    ]
  },
  {
    label: "chatGPT",
    key: "chatGPT",
    icon: <RobotOutlined />,
    children: [
      {
        label: "AI聊天",
        key: "/chatGPT/chatList"
      },
      {
        label: "豆包AI",
        key: "/chatGPT/chatGPT"
      }
    ]
  },
  {
    label: "应用",
    key: "apply",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: "应用列表",
        key: "/apply/list"
      },
      {
        label: "创建应用",
        key: "/apply/create"
      }
    ]
  },
  {
    label: "系统设置",
    key: "setting",
    icon: <SettingOutlined />,
    children: [
      {
        label: "代码模块",
        key: "/setting/modules"
      },
      {
        label: "编辑js代码",
        key: "/setting/editCode"
      }
    ]
  },
  {
    label: "个人信息",
    key: "info",
    icon: <IdcardOutlined />,
    children: [
      {
        label: "我的信息",
        key: "/user/info"
      },
      {
        label: "修改密码",
        key: "/user/changePwd"
      }
    ]
  }
];
