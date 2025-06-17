export type LayoutType = "default" | false;

export interface PageConfig {
  // 当页面是非菜单页面时，此标题将显示在面包屑中。相反，在菜单页中配置此属性无效。
  title: string;
  layout?: LayoutType;
  // 是否进行路由认证
  auth?: boolean;
  // 如果该页不是菜单页，那么该页中的菜单是无状态的，此时您希望将该页指定为菜单的某种状态，添加此属性即可(同时呈现面包屑)
  // 相反，在菜单页中配置menuKey属性无效
  // 这个值是菜单key
  menuKey?: string;
  // wrappers?: Array<any>;
}

export const defaultPageConfig: Omit<PageConfig, "title"> = {
  layout: "default",
  auth: true
};

export const pageConfig: { [propName: string]: PageConfig } = {
  "/login": { title: "登录", layout: false, auth: false },
  "/register": { title: "注册", layout: false, auth: false },
  "/user/ChangePwd": { title: "修改密码", layout: false, auth: false },
  "/details/:id?": { title: "动态详情页", menuKey: "/test" }
};
