import http from "@/api/request";
import type {UserVo, UserInfoType, UserIdVo, Page, ImageType} from "@/typing";
import {ToolTipDataVo} from "components/EchartCard/TheMap";

/**
 * 用户注册
 * @param param 用户信息
 * @return
 */
const registerUserApi = (param: UserInfoType):Promise<null> => {
  return http.post('user/register', param)
}

/**
 * 获取验证码
 * @param param 用户信息
 * */
const getLoginCodeApi = (param: UserVo):Promise<string> => {
  return http.post("user/login/verifyCode", param);
};

/**
 * 登录
 * @param param 用户信息
 * */
const loginApi = (param: UserVo):Promise<{token: string,salt: string}> => {
  return http.post("user/login", param);
};

/**
 * 修改密码
 * @param param 用户信息
 * */
const changePasswordApi = (param: UserVo):Promise<null> => {
  return http.post("/user/change/password", param);
};

/**
 * 查看用户信息
 * @param param 用户信息
 * */
const getUserInfoApi = (param: UserIdVo = {id: ""}): Promise<UserInfoType> => {
  return http.post("user/info", param)
}

/**
 * 更新用户信息
 * @param param 用户信息
 * @return
 */
const updateUserInfoApi = (param: UserInfoType):Promise<null> => {
  return http.post('user/editInfo', param)
}

/**
 * 设置用户权限
 * @param userId 用户id
 * @param roleId 权限id
 * */
const setUserLimitApi = (userId: string, roleId: string): Promise<UserInfoType> => {
  return http.post("userRole/set/limit", {
    userId, 
    roleId
  })
}


/**
 * 查看所有用户
 * */
const getUserListApi = (current: number, size: number): Promise<Page<UserInfoType>> => {
  return http.post("/user/list", {
    current,
    size
  })
}

/**
 * 条件搜索用户
 * */
const selectUserInfoApi = (param: UserInfoType): Promise<UserInfoType[]> => {
  return http.post("/user/search", param)
}

/**
 * 导出数据
 * */
const exportUserInfoExcelApi = () => {
  return http.get("/user/export", {
    responseType: 'blob'
  })
}

/**
 * 删除图片
 * */
const deleteImageApi = (data: ImageType) => {
  return http.post("/file/delete", data)
}

/**
 * 查询省份注册数目
 * */
const queryCityCountApi = (): Promise<ToolTipDataVo[]> => {
  return http.get("/user/city/count")
}


export {
  registerUserApi,
  getLoginCodeApi,
  loginApi,
  changePasswordApi,
  getUserInfoApi,
  setUserLimitApi,
  getUserListApi,
  selectUserInfoApi,
  updateUserInfoApi,
  exportUserInfoExcelApi,
  deleteImageApi,
  queryCityCountApi
};