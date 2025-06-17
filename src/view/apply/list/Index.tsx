import { deleteApplyApi, getApplyListApi, updateApplyApi } from "@/api";
import { ApplyListType } from "@/typing";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Popconfirm,
  Space,
  Switch,
  Table, TableColumnsType,
  TableProps,
  Typography
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "date" | "text";
  record: ApplyListType;
  index: number;
}

const dateFormat = "YYYY-MM-DD";
/**
 * 编辑输入框组件
 * */
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
                                                                              editing,
                                                                              dataIndex,
                                                                              title,
                                                                              inputType,
                                                                              record,
                                                                              index,
                                                                              children,
                                                                              ...restProps
                                                                            }) => {
  const inputNode = inputType === "date" ? <DatePicker /> : <Input />;

  return (
    <td { ...restProps }>
      { editing ? (
        <Form.Item name={ dataIndex }
                   style={ { margin: 0 } }
                   rules={ [
                     {
                       required: true,
                       message: `请输入您的${ title }!`
                     }
                   ] }
                   getValueProps={ (value) => ({ value: inputType === "date" ? dayjs(value) : value }) }>
          { inputNode }
        </Form.Item>
      ) : (
        children
      ) }
    </td>
  );
};

/**
 * 开关组件
 * */
const SwitchComponent = (state: boolean, record: ApplyListType) => {
  /**
   * 启动禁用
   * */
  const onIsForbidden = async (checked: boolean) => {
    console.log(checked, record);
    const param = Object.assign({
      id: record.id,
      isFinish: !checked
    });
    await updateApplyApi(param);
  };

  return (<Switch defaultValue={ !state }
                  checkedChildren="启动"
                  unCheckedChildren="禁用"
                  onChange={ onIsForbidden }></Switch>);
};

const ApplyList: React.FC = () => {
  const [ form ] = Form.useForm();
  const [ applyList, setApplyList ] = useState<ApplyListType[]>([]);
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);
  const [ editingKey, setEditingKey ] = useState("");
  const isEditing = (record: ApplyListType) => record.id === editingKey;
  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    {
      title: "功能名称", dataIndex: "title",
      key: "title",
      editable: true
    },
    { title: "地址", dataIndex: "url", key: "url", editable: true },
    { title: "开始时间", dataIndex: "startDate", key: "startDate", editable: true },
    { title: "结束时间", dataIndex: "endDate", key: "endDate", editable: true },
    { title: "状态", dataIndex: "state", key: "state" },
    {
      title: "禁用",
      dataIndex: "isFinish",
      key: "isFinish",
      render: SwitchComponent
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_: any, record: ApplyListType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm title="确认要保存吗?"
                        onConfirm={ () => onSaveEdit(record.id) }>
              <Typography.Link style={ { marginRight: 8 } }>
              保存
            </Typography.Link>
            </Popconfirm>
            <Typography.Link onClick={ cancelEditApply }>取消</Typography.Link>
          </span>
        ) : (
          <Typography.Link disabled={ editingKey !== "" }
                           onClick={ () => onEditApply(record) }>
            编辑
          </Typography.Link>
        );
      }
    }
  ];

  const mergedColumns: TableColumnsType<ApplyListType> = columns.map((col) => {
    if ( !col.editable ) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ApplyListType) => ({
        record,
        inputType: (col.dataIndex === "startDate" || col.dataIndex === "endDate") ? "date" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });

  /**
   * 保存编辑
   * */
  const onSaveEdit = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as ApplyListType;

      const newData = [ ...applyList ];
      const index = newData.findIndex((item) => id === item.id);
      if ( index > -1 ) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        Object.assign(newData[index], {
          startDate: dayjs(newData[index].startDate).format(dateFormat),
          endDate: dayjs(newData[index].endDate).format(dateFormat)
        });
        setApplyList([ ...newData ]);
        setEditingKey("");
      } else {
        newData.push(row);
        setApplyList(newData);
      }
      await updateApplyApi(newData[index]);
    } catch (errInfo) {
      console.error("错误信息:", errInfo);
    }
  };

  /**
   * 编辑
   * */
  const onEditApply = (record: ApplyListType & { id: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

  /**
   * 取消编辑
   * */
  const cancelEditApply = () => {
    setEditingKey("");
  };

  /**
   * 表格选择行
   * */
  const rowSelection: TableRowSelection<ApplyListType> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  /**
   * 删除应用数据
   * */
  const onDeleteApply = async () => {
    await deleteApplyApi(selectedRowKeys);
    const list = applyList.filter(item => {
      return !selectedRowKeys.includes(item.id);
    });
    setApplyList(list);
    setSelectedRowKeys([]);
  };

  useEffect(() => {
    (async () => {
      const res = await getApplyListApi();
      setApplyList(res.map((item) => ({
        ...item
      })));
    })();
  }, []);

  return (
    <Card style={ { flex: 1 } }
          title={ <Space wrap>
            <Link to={ "/apply/create" }>
              <Button type="primary">
                创建
              </Button>
            </Link>
            <Button type="primary"
                    danger
                    disabled={ !selectedRowKeys.length }
                    onClick={ onDeleteApply }>删除</Button>
          </Space> }>
      <Form form={ form }
            component={ false }>
        <Table rowSelection={ rowSelection }
               columns={ mergedColumns }
               dataSource={ applyList }
               rowKey={ (record) => record.id }
               pagination={ {
                 hideOnSinglePage: true
               } }
               components={ {
                 body: {
                   cell: EditableCell
                 }
               } } />
      </Form>
    </Card>
  );
};
export default ApplyList;