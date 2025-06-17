type AppVo = {
  name: string;
}
type StatusVo = {
  [key: number] : string
}
type ApiVo = {
  /**
   * 接口地址
   * */
  baseUrl: string;
  /**
   * 接口响应时长
   * */
  timeout: number;
  /**
   * 接口sessionKey值
   * */
  sessionKey: string;
  /**
   * 接口状态
   * */
  status: StatusVo;
}
type RoleColorEnum = {
  [key: string]: string;
}
interface ConfigType {
  /**
   * app数据
   * */
  app: AppVo;
  /**
   * 接口配置
   * */
  api: ApiVo;
  /**
   * 主题色集合
   * */
  themeColors: string[];
  /**
   * 权限颜色
   * */
  roleColor: RoleColorEnum;
  fixedWidth: number;
  /**
   * 一页显示数量
   * */
  pageSize: number;
  /**
   * 前缀
   * */
  prefix:string;
  /**
   * 初始化向量
   * */
  iv: string;
}

/**
 * 分页
 * */
export interface PageConfigType {
  /**
   * 当前页
   * */
  current: number;
  /**
   * 页数
   * */
  size: number;
}

export interface PageConfigVo<T> extends ConfigType {
  /**
   * 总页数
   * */
  total: number;
  /**
   * 数据列表
   * */
  records: T;
  /**
   * 搜索当前页
   * */
  searchCount: boolean;
}

export type {
  ConfigType
}