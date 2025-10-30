import http from "@/api/request";

/**
 * 查询省份注册数目
 * @param code 编码
 * */
export const queryChinaMapApi = (code: number): Promise<[]> => {
    return http.get(`aliyun/areas_v3/bound/geojson?code=${code}_full`)
}