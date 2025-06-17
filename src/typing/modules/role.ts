interface RoleType {
  id: number;
  /**
   * 中文说明
   * */
  label: string;
  /**
   * 值
   * */
  value: string;
}

interface BindLimitType {
  id?: number;
  /**
   * 用户id
   * */
  userId: string;
  /**
   * 权限id
   * */
  roleId?: string;
  /**
   * 权限id集合
   * */
  roleIds: (string | number)[];
}

export type {
  RoleType,
  BindLimitType
}