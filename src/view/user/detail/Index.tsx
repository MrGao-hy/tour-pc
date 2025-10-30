import { getUserInfoApi } from "@/api";
import TheRoleTag from "@/components/TheRoleTag/TheRoleTag";
import { UserInfoType } from "@/typing";
import { UserOutlined } from "@ant-design/icons";
import {Avatar, Button, Card, Descriptions, Divider, Image, Input, Space, Tag, Typography} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {getAge} from "@/utils";

const UserDetail = () => {
  const [ userDetail, setUserDetail ] = useState<UserInfoType>({});
  const { state } = useLocation();
  const id = state?.id || ""; // 根据参数名获取参数值
  useEffect(() => {
    getUserInfoApi({ id }).then(res => {
      setUserDetail(res);
    })
  }, []);

  const onBackPage = () => {
    window.history.back();
  };

  return (
    <Card style={ { flex: 1 } }
          extra={ id && (<Space wrap>
            <Button onClick={ onBackPage }>返回</Button>
          </Space>) }>
      <Descriptions title="用户信息"
                    style={ { marginBottom: 32 } }
                    column={ 4 }>
        <Descriptions.Item label="用户姓名">{ userDetail.userName }</Descriptions.Item>
        <Descriptions.Item label="性别">{ userDetail.sex }</Descriptions.Item>
        <Descriptions.Item label="年龄">{ getAge(userDetail.birthDate) }</Descriptions.Item>
        <Descriptions.Item label="出生日期">{ userDetail.birthDate }</Descriptions.Item>
        <Descriptions.Item label="联系电话">{ userDetail.phone }</Descriptions.Item>
        <Descriptions.Item label="学历">{ userDetail.education }</Descriptions.Item>
        <Descriptions.Item label="院校">{ userDetail.school }</Descriptions.Item>
        <Descriptions.Item label="专业">{ userDetail.major }</Descriptions.Item>
      </Descriptions>
      <Divider style={ { marginBottom: 32 } } />
      <Descriptions title="用户详情"
                    style={ { marginBottom: 32 } }
                    colon
                    column={ 1 }>
        <Descriptions.Item label="头像">{
            userDetail.avatar ? <Image width={64} src={ "/ms" + userDetail.avatar.url } style={{borderRadius: '50%'}}/> : <Avatar size={64} icon={<UserOutlined />}></Avatar>
        }</Descriptions.Item>
        <Descriptions.Item label="权限">{ TheRoleTag(userDetail.roles) }</Descriptions.Item>
        <Descriptions.Item label="注册时间">{ userDetail.createTime }</Descriptions.Item>
        <Descriptions.Item label="ID">{ userDetail.id }</Descriptions.Item>
        <Descriptions.Item label="身份证号">{ userDetail.idCard }</Descriptions.Item>
        <Descriptions.Item label="星座">{ userDetail.constellation }</Descriptions.Item>
        <Descriptions.Item label="邮箱">{ userDetail.email }</Descriptions.Item>
        <Descriptions.Item label="省/自治区">{ userDetail.province }</Descriptions.Item>
        <Descriptions.Item label="市">{ userDetail.city }</Descriptions.Item>
        <Descriptions.Item label="区">{ userDetail.counties }</Descriptions.Item>
        <Descriptions.Item label="住址">{ userDetail.address }</Descriptions.Item>
        <Descriptions.Item label="加密密码">{ userDetail.password }</Descriptions.Item>
        <Descriptions.Item label="签名">
          <Input.TextArea rows={ 4 }
                          disabled
                          value={ userDetail.signature }></Input.TextArea>
        </Descriptions.Item>
      </Descriptions>
      <Divider style={ { marginBottom: 32 } } />
    </Card>
  );
};

export default UserDetail;