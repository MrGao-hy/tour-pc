import { Dropdown, Row, Col, Avatar } from "antd";
import { UserOutlined, IdcardOutlined, FormOutlined, PoweroffOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserInfo } from "@/store/reducer/userSlice";

const enum PersonalCenterMenuKeys {
  MyInfo = "MYINFO",
  ModifyPassword = "MODIFYPASSWORD",
  Logout = "LOGOUT"
}

export default function PersonalCenterEntry () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const items: MenuProps["items"] = [
    {
      key: PersonalCenterMenuKeys.MyInfo,
      label: "我的信息",
      icon: <IdcardOutlined />
    },
    {
      key: PersonalCenterMenuKeys.ModifyPassword,
      label: "修改密码",
      icon: <FormOutlined />
    },
    { type: "divider" },
    {
      key: PersonalCenterMenuKeys.Logout,
      danger: true,
      label: "退出登录",
      icon: <PoweroffOutlined />
    }
  ];
  return (
    <Dropdown trigger={ [ "hover" ] }
              menu={ {
                items,
                style: { width: 110 },
                onClick: (e) => {
                  switch (e.key) {
                    case PersonalCenterMenuKeys.MyInfo:
                      navigate("/user/detail");
                      break;
                    case PersonalCenterMenuKeys.ModifyPassword:
                      navigate("/user/changePwd");
                      break;
                    case PersonalCenterMenuKeys.Logout:
                      // persistor.purge(); // 清楚硬盘（如：localStorage）中的所有数据
                      dispatch(logout());
                      break;
                  }
                }
              } }>
      <Row gutter={ 10 }
           style={ {
             cursor: "pointer",
             marginTop: -2,
             userSelect: "none",
             padding: "0 10px"
           } }>
        <Col>
          <Avatar size="default"
                  icon={ <UserOutlined />} src={ userInfo?.avatar?.url } />
        </Col>
        <Col>{ userInfo?.userName || "Admin" }</Col>
      </Row>
    </Dropdown>
  );
}
