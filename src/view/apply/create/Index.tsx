import { addApplyApi } from "@/api";
import TheForm, { FormTypeVo } from "@/components/TheForm/TheForm";
import { ApplyVo } from "@/typing";
import { Button, Card, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const selectStatus = [{name: "正常", value: "正常"}, {name: "异常", value: "异常"}, {name: "未开发", value: "未开发"}]
const columns = [
  { label: "应用名称", field: "title", type: FormTypeVo.INPUT, rules: [ { required: true, message: "请输入标题!" } ] },
  { label: "开始时间", field: "startDate", type: FormTypeVo.DATE, rules: [ { required: true, message: "请输入开始时间!" } ] },
  { label: "结束时间", field: "endDate", type: FormTypeVo.DATE, rules: [ { required: true, message: "请输入结束时间!" } ] },
  { label: "状态", field: "state", type: FormTypeVo.SELECT, rules: [ { required: true, message: "请输入应用状态!" } ], select: selectStatus },
  { label: "页面路径", field: "url", type: FormTypeVo.INPUT, rules: [ { required: true, message: "请输入页面路径!" } ] },
  { label: "是否禁用", field: "isFinish", type: FormTypeVo.SWITCH },
  { label: "提交", field: "", type: FormTypeVo.BUTTON },
]

const CreateApply: React.FC = () => {
  const formatDate = "YYYY-MM-DD";
  const navigate = useNavigate();
  const [apply, setApply] = useState<ApplyVo>({
    title: "",
    startDate: "",
    endDate: "",
    state: "",
    url: "",
    isFinish: false,
  });

  /**
   * 创建数据
   * */
  const handleSubmitForm = async (e: ApplyVo) => {
    const res = await addApplyApi(e);
    navigate("/apply/list")
  }

  return (
    <Card style={{ flex: 1 }} extra={<Space wrap>
      <Link to={"/apply/list"}>
        <Button>返回</Button>
      </Link>
    </Space>}>
      <TheForm columns={ columns }
               sendDataFn={ handleSubmitForm }
               data={ apply } />
    </Card>
  )
};

export default CreateApply;