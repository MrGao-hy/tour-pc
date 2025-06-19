import {App, Row, Col, Card, notification} from "antd";
import TheForm, { FormTypeVo } from "@/components/TheForm/TheForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, setUserInfo } from "@/store/reducer/userSlice";
import { UserInfoType } from "@/typing";
import { updateUserInfoApi } from "@/api";
import { AppDispatch } from "@/store";
import {deepClone} from "@/utils";

const selectData = [
  { name: "水瓶座", value: "水瓶座" },
  { name: "双鱼座", value: "双鱼座" },
  { name: "白羊座", value: "白羊座" },
  { name: "金牛座", value: "金牛座" },
  { name: "双子座", value: "双子座" },
  { name: "巨蟹座", value: "巨蟹座" },
  { name: "狮子座", value: "狮子座" },
  { name: "处女座", value: "处女座" },
  { name: "天秤座", value: "天秤座" },
  { name: "天蝎座", value: "天蝎座" },
  { name: "射手座", value: "射手座" },
  { name: "摩羯座", value: "摩羯座" }
];

const EditUserInfo = () => {
  const userInfo = useSelector(selectUserInfo);
  const userInfoVo = deepClone(userInfo);
  // userInfoVo.sex = userInfo.sex === '女生' ? '0' : userInfo.sex === '男生' ? '1' : '-1';
  const dispatch: AppDispatch = useDispatch();
  const educationColumns = [
    { name: "研究生", value: "研究生" },
    { name: "本科", value: "本科" },
    { name: "大专", value: "大专" },
    { name: "中专", value: "中专" },
    { name: "高中", value: "高中" },
    { name: "初中", value: "初中" },
    { name: "小学", value: "小学" },
  ]
  const columns = [
    { label: "用户名", field: "userName", type: FormTypeVo.INPUT, rules: [ { required: true, message: "请输入您的名字!" } ] },
    { label: "身份证号", field: "idCard", type: FormTypeVo.INPUT, rules: [ { message: "请输入您的名字!" } ] },
    {
      label: "手机号",
      field: "phone",
      type: FormTypeVo.INPUT,
      rules: [ { required: true, message: "请输入您的手机号!" }, {
        message: "请输入正确手机号!",
        pattern: new RegExp(/^1([3456789])\d{9}$/, "g")
      } ]
    },
    {
      label: "邮箱",
      field: "emit",
      type: FormTypeVo.EMIT,
      rules: [ { pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/, message: "请输入正确的邮箱" } ]
    },
    {
      label: "性别",
      field: "sex",
      type: FormTypeVo.RADIO,
      select: [ { name: "男", value: "男生" }, { name: "女", value: "女生" }, { name: "保密", value: "保密" } ]
    },
    { label: "出生日期", field: "birthDate", type: FormTypeVo.DATE },
    { label: "城区", field: "area", type: FormTypeVo.ADDRESS },
    { label: "详细地址", field: "address", type: FormTypeVo.INPUT },
    { label: "学历", field: "education", type: FormTypeVo.SELECT, select: educationColumns },
    { label: "院校", field: "school", type: FormTypeVo.INPUT },
    { label: "专业", field: "major", type: FormTypeVo.INPUT },
    { label: "星座", field: "constellation", type: FormTypeVo.SELECT, select: selectData },
    { label: "签名", field: "signature", type: FormTypeVo.TEXTAREA },
    { label: "头像", field: "avatarId", type: FormTypeVo.UPLOAD },
    { label: "提交", field: "button", type: FormTypeVo.BUTTON }
  ];

  /**
   * 提交修改用户信息表单
   * */
  const handleSubmitForm = async (e: UserInfoType) => {
    console.log(e)
    // TODO：后期删掉，需要优化
    if(e.avatar) {
      e.avatar.url = e.avatar.url.replace(/\/ms/, '')
    }

    if(e.area) {
      e.province = e.area[0]
      e.city = e.area[1]
      e.counties = e.area[2]
    }

    await updateUserInfoApi(e);
    try {
    	dispatch(setUserInfo());
      notification.success({
        message: "修改成功"
      });
    } catch (e) {
        notification.error({
          message: "提交表单失败"
        });
    	console.error(e);
    }
  };
  return (
    <App>
      <Card style={ { flex: 1 } }
            bordered={ false }>
        <Row>
          <Col offset={ 1 }
               xs={ 23 }
               md={ 18 }
               lg={ 16 }
               xl={ 12 }
               xxl={ 10 }>
            <TheForm columns={ columns }
                     sendDataFn={ handleSubmitForm }
                     data={ userInfoVo } />
          </Col>
        </Row>
      </Card>
    </App>
  );
};

export default EditUserInfo;