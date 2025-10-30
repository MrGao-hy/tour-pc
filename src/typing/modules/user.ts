import { RoleType } from "@/typing";

type UserVo = {
  /**
   * 唯一标识
   * */
  uuid?: string;
  /**
   * 验证码
   * */
  code?: string;
  /**
   * 用户名
   * */
  userName?: string;
  /**
   * 密码
   * */
  password?: string;
  /**
   * 旧密码
   * */
  oldPassword?: string;
};
type UserIdVo = {
  id?: string;
}

export type ImageType = {
  /**
   * 头像id
   * */
  id: string;
  /**
   * 头像地址
   * */
  url: string;
}

interface UserInfoType extends UserVo, UserIdVo {
  /**
   * 身份证号
   * */
  idCard?: string;
  /**
   * 手机号
   * */
  phone?: string;
  /**
   * 头像
   * */
  avatar?: ImageType;
  /**
   * 出生日期
   * */
  birthDate?: string;
  /**
   * 年龄
   * */
  age?: string;
  /**
   * 性别
   * */
  sex?: string;
  /**
   * 星座
   * */
  constellation?: string;
  /**
   * 邮箱
   * */
  email?: string;
  /**
   * 注册时间
   * */
  createTime?: string;
  /**
   * 签名
   * */
  signature?: string;
  /**
   * 省
   * */
  province?: string;
  /**
   * 市
   * */
  city?: string;
  /**
   * 县/区
   * */
  counties?: string;
  /**
   * 地区
   * */
  area?: string[];
  /**
   * 住址
   * */
  address?: string;
  /**
   * 学历
   * */
  education?: string;
  /**
   * 院校
   * */
  school?: string;
  /**
   * 专业
   * */
  major?: string;
  /**
   * 权限管理
   * */
  roles?: RoleType[];
}

interface UserLoginType extends UserVo {
  remember?: boolean;
}

export type {
  UserIdVo,
  UserVo,
  UserLoginType,
  UserInfoType
}