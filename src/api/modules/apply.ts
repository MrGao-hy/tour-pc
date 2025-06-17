import http from "@/api/request";
import { ApplyListType, ApplyVo } from "@/typing";
/**
 * 应用列表
 * */
const getApplyListApi = (): Promise<ApplyListType[]> => {
  return http.get("/apply/list");
};

/**
 * 创建应用
 * */
const addApplyApi = (data: ApplyVo) => {
  return http.post("/apply/add", data);
};

/**
 * 删除应用
 * */
const deleteApplyApi = (id: React.Key[]) => {
  return http.post("/apply/delete", {
    id
  });
};

/**
 * 更改应用状态
 * */
const updateApplyApi = (data: ApplyListType) => {
  return http.post("/apply/change", data);
};

export {
  getApplyListApi,
  addApplyApi,
  deleteApplyApi,
  updateApplyApi
}