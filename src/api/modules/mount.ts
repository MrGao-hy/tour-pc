import http from "@/api/request";
import {MountType, PageConfigType, PageConfigVo} from "@/typing";
;
/**
 * 应用列表
 * */
export const getMountListApi = (data: PageConfigType): Promise<PageConfigVo<MountType[]>> => {
    return http.post("/mount/query/list", data);
};