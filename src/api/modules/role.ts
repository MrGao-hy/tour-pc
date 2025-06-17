import http from "@/api/request";
import { BindLimitType, RoleType } from "@/typing";
/**
 * 应用列表
 * */
const getRoleListApi = (): Promise<RoleType[]> => {
  return http.get("/role/list");
};

/**
 * 设置权限
 * @param userId 用户id
 * @param roleIds 权限id集合
 * */
const bindLimitsApi = (param: BindLimitType) => {
  return http.post("/userRole/set/limit", param)
}

export {
  getRoleListApi,
  bindLimitsApi
}