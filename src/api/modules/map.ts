import http from "@/api/request";
import type { IGeoJson } from "@/typing";


/**
 * 查询省份注册数目
 * @param code 编码
 * */
export const queryChinaMapApi = (code: number): Promise<IGeoJson> => {
    return http.get(`aliyun/areas_v3/bound/geojson?code=${code}_full`)
}