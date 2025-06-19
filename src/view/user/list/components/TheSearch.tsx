import { UserInfoType } from "@/typing";
import React from "react";
import {
  ProFormText,
  QueryFilter,
  ProFormSelect,
    ProFormDatePicker
} from "@ant-design/pro-components";

interface PropsType {
  onSearchUserInput: (e: UserInfoType) => void
}

const constellationEnum = {
    '水瓶座': '水瓶座',
    '双鱼座': '双鱼座',
    '白羊座': '白羊座',
    '金牛座': '金牛座',
    '双子座': '双子座',
    '巨蟹座': '巨蟹座',
    '狮子座': '狮子座',
    '处女座': '处女座',
    '天秤座': '天秤座',
    '天蝎座': '天蝎座',
    '射手座': '射手座',
    '摩羯座': '摩羯座',
}

const provinceEnum = {
    '北京市': '北京市',
    '天津市': '天津市',
    '上海市': '上海市',
    '重庆市': '重庆市',
    '河北省': '河北省',
    '山西省': '山西省',
    '辽宁省': '辽宁省',
    '吉林省': '吉林省',
    '黑龙江省': '黑龙江省',
    '江苏省': '江苏省',
    '浙江省': '浙江省',
    '安徽省': '安徽省',
    '福建省': '福建省',
    '江西省': '江西省',
    '山东省': '山东省',
    '河南省': '河南省',
    '湖北省': '湖北省',
    '湖南省': '湖南省',
    '广东省': '广东省',
    '海南省': '海南省',
    '四川省': '四川省',
    '贵州省': '贵州省',
    '云南省': '云南省',
    '陕西省': '陕西省',
    '甘肃省': '甘肃省',
    '青海省': '青海省',
    '台湾省': '台湾省',
    '内蒙古自治区': '内蒙古自治区',
    '广西壮族自治区': '广西壮族自治区',
    '西藏自治区': '西藏自治区',
    '宁夏回族自治区': '宁夏回族自治区',
    '新疆维吾尔自治区': '新疆维吾尔自治区',
    '香港特别行政区': '香港特别行政区',
    '澳门特别行政区': '澳门特别行政区'
};

const TheSearch = (props: PropsType): React.ReactElement => {
  const { onSearchUserInput } = props;
  
  /**
  * 搜索用户
  * */
  const handleSearchInput = (e: UserInfoType) => {
      console.log(e)
    onSearchUserInput(e)
  };
  
  return (
    <>
      <QueryFilter split
                   onFinish={ handleSearchInput }>
        <ProFormText name="userName"
                     label="姓名" />
        <ProFormSelect name="sex"
                       label="性别"
                       showSearch
                       valueEnum={ {
                         1: "男",
                         0: "女",
                         "-1": "保密",
                       } } />
        <ProFormSelect name="constellation"
                     label="星座"
                       showSearch
                       valueEnum={ constellationEnum }
        />
          <ProFormSelect name="province"
                         label="省"
                         showSearch
                         valueEnum={ provinceEnum }
          />
        <ProFormText name="phone"
                     label="手机号" />
        <ProFormText name="emit"
                     label="邮箱" />
        <ProFormText name="idCard"
                     label="身份证号" />
          <ProFormDatePicker.Year name="birthDate" label="年" />
      </QueryFilter>
    </>
  )
}

export default TheSearch;