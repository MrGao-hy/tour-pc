import {
  Row,
  Col,
  Card,
  Table,
  TableColumnsType,
  TableProps,
  Space,
  Button,
  Modal,
  Checkbox,
  Avatar,
  notification
} from "antd";
import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import { bindLimitsApi, exportUserInfoExcelApi, getRoleListApi, getUserListApi, selectUserInfoApi } from "@/api";
import type { RoleType, UserInfoType } from "@/typing";
import { Link } from "react-router-dom";
import TheSearch from "./components/TheSearch";
import TheRoleTag from "@/components/TheRoleTag/TheRoleTag";
import config from "@/config";
import {deepClone, downloadFile, getAge} from "@/utils";
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrent, setCurrent} from "@/store/reducer/userSlice";
import {AppDispatch} from "@/store";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface ActionPropsType {
  record: UserInfoType;
  handleOpenModal: (e: UserInfoType) => void;
  setCheckRole: Dispatch<SetStateAction<number[]>>;
}

/**
 * 操作按钮
 * */
const ActionComponent = ({ record, handleOpenModal, setCheckRole }: ActionPropsType) => {

  /**
   * 打卡对话框
   * */
  const onSetLimit = (temp: UserInfoType) => {
    handleOpenModal(temp);
    if(record.roles?.length) {
      setCheckRole(record.roles.map(item => item.id));
    }
  };

  return (
    <>
      <Space wrap>
        <Button type="primary"
                ghost
                size={ "small" }
                onClick={ () => onSetLimit(record) }>设置权限</Button>
        <Link to={ "/user/detail" }
              state={ { id: record.id } }>
          <Button type="primary"
                  ghost
                  size={ "small" }>查看</Button>
        </Link>
      </Space>
    </>
  );
};

const UserList = () => {
  const [ userList, setUserList ] = useState<UserInfoType[]>([]);
  const [ id, setId ] = useState("");
  const [ openModal, setOpenModal ] = useState(false);
  const [ roleList, setRoleList ] = useState<RoleType[]>([]);
  const [ checkRole, setCheckRole ] = useState<number[]>([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
  const current = useSelector(selectCurrent);
  const [ page, setPage ] = useState({
    current,
    size: config.pageSize,
    total: 0
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    userListService(page.current, page.size).then(res => {
      setPage(prevPage => ({
        ...prevPage,
        total: res,
      }))
    });
    getRoleListApi().then(res => {
      setRoleList(res);
    })
  }, []);

  /**
   * 搜索请求接口
   * */
  const onSearchUserInput = async (e: UserInfoType) => {
    const res = await selectUserInfoApi(e);
    setUserList(res.map(item => ({
      ...item,
      key: item.id,
      age: getAge(item.birthDate)
    })));
    setPage({
      ...page,
      total: res.length
    });
  };

  /**
   * 打开对话框
   * */
  const handleOpenModal = async (e: UserInfoType) => {
    setId(e.id as string);
    setOpenModal(true);
  };

  /**
   * 选择权限
   * */
  const onChangeRole = (e: number[]) => {
    setCheckRole(e);
  };

  /**
   * 请求接口, 绑定权限
   * */
  const onSelectRole = async () => {
    await bindLimitsApi({
      userId: id,
      roleIds: checkRole
    });
    setOpenModal(false);
  };


  /**
   * 表格选择行
   * */
  const rowSelection: TableRowSelection<UserInfoType> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  /**
   * 分页查询函数
   * */
  const onChange = async (current: number, pageSize: number) => {

    setPage(prevPage => ({
      ...prevPage,
      current,
      size: pageSize,
    }))
    // 存储当前页保存到本地
    dispatch(setCurrent(current));
    await userListService(current, pageSize);
  };

  /**
   * 删除用户
   * */
  const onDeleteUser = () => {
    notification.error({
      message: '做无法实现的梦'
    });
  };

  /**
   * 导出用户信息
   * */
  const exportUserInfoExcel = async () => {
    const res = await exportUserInfoExcelApi();
    downloadFile(res, "用户数据", ".xlsx");
  };

  /**
   * 请求列表接口
   * */
  const userListService = async (current: number, size: number) => {
    const res = await getUserListApi(current, size);
    setUserList(res.records.map(item => ({
      ...item,
      key: item.id,
      age: getAge(item.birthDate)
    })));
    return res.total;
  };

  const columns: TableColumnsType<UserInfoType> = [
    { title: "id", dataIndex: "id", key: "id" },
    {
      title: "用户名",
      width: 120,
      dataIndex: "userName",
      key: "userName",
      fixed: "left",
      sorter: true
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      width: 60,
      render: (record) => <Avatar icon={<UserOutlined />} src={ "/ms" + record?.url } />
    },
    {
      title: "权限",
      dataIndex: "roles",
      key: "roles",
      render: TheRoleTag
    },
    { title: "手机号", dataIndex: "phone", key: "phone" },
    { title: "身份证号", dataIndex: "idCard", key: "idCard" },
    { title: "邮箱", dataIndex: "emit", key: "emit" },
    { title: "出生日期", dataIndex: "birthDate", key: "birthDate" },
    { title: "性别", dataIndex: "sex", key: "sex" },
    { title: "年龄", dataIndex: "age", key: "age" },
    { title: "星座", dataIndex: "constellation", key: "constellation" },
    { title: "注册时间", dataIndex: "createTime", key: "createTime" },
    { title: "签名", dataIndex: "signature", key: "signature", ellipsis: true },
    { title: "省/自治区", dataIndex: "province", key: "province", },
    { title: "市", dataIndex: "city", key: "city" },
    { title: "县/区", dataIndex: "counties", key: "counties", },
    { title: "详细地址", dataIndex: "address", key: "address", ellipsis: true },
    { title: "学历", dataIndex: "education", key: "education" },
    { title: "院校", dataIndex: "school", key: "school" },
    { title: "专业", dataIndex: "major", key: "major" },
    {
      title: "操作",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (_, record) => <ActionComponent record={ record }
                                              handleOpenModal={ handleOpenModal } setCheckRole={ setCheckRole } />
    }
  ];


  return (
    <>
      <Card style={ { marginBottom: "16px" } }>
        <TheSearch onSearchUserInput={ onSearchUserInput }></TheSearch>
      </Card>
      <Card style={ { flex: 1 } }
            bordered={ false }
            title={ <Space wrap>
              <Button type="primary"
                      onClick={ exportUserInfoExcel }>导出</Button>
              <Button type="primary"
                      danger
                      disabled={ !selectedRowKeys.length }
                      onClick={ onDeleteUser }>删除</Button>
            </Space> }>
        <Table rowSelection={ rowSelection }
               columns={ columns }
               dataSource={ userList }
               scroll={ { y: 305, x: 3300 } }
               size={ "small" }
               pagination={ {
                 current: page.current,
                 showSizeChanger: true,
                 defaultPageSize: page.size,
                 hideOnSinglePage: true,
                 total: page.total,
                 showQuickJumper: true,
                 showTotal: (total) => `总数：${total}条`,
                 onChange: onChange
               } } />
      </Card>
      <Modal title="权限管理"
             open={ openModal }
             onOk={ onSelectRole }
             onCancel={ () => setOpenModal(false) }>
        <Checkbox.Group style={ { width: "100%" } }
                        onChange={ onChangeRole }
                        value={ checkRole }>
          <Row gutter={ [ 5, 24 ] }>
            { roleList.map(item => (<Col span={ 10 }
                                         key={ item.id }>
              <Checkbox value={ item.id }>{ item.label }</Checkbox>
            </Col>)) }
          </Row>
        </Checkbox.Group>
      </Modal>
    </>
  );
};
export default UserList;