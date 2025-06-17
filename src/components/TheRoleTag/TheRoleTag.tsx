import config from "@/config";
import { RoleType } from "@/typing";
import { Space, Tag } from "antd";
import React from "react";

const TheRoleTag = (record?: RoleType[]) => {

  return (<Space wrap>
    {record?.map((item: RoleType) => (<Tag color={ config.roleColor[item.value] } key={item.id}>{ item.label }</Tag>))}
  </Space>)
}

export default TheRoleTag;