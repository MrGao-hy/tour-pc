/* eslint-disable no-undef */
/**
 * Generating routes
 * Issues to consider here:
 * 1. Route nesting
 * 2. Route parameter
 * 3. Route authentication
 */
import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import {
  defaultPageConfig,
  pageConfig,
  LayoutType,
  PageConfig
} from "@/config/pageConfig";
import AuthRoute from "@/router/AuthRoute";

// const AuthRoute = lazy(() => import('./AuthRoute'));
const ErrorPage = lazy(() => import("@/components/ErrorBoundary"));
const NotFound = lazy(() => import("@/view/404/404"));

const pageComponentModules = import.meta.glob([
  "@/view/**/*.tsx",
  "!@/view/**/components/**/*.tsx"
]);

const layoutComponentModules = import.meta.glob([
  "@/layout/*.tsx",
  "@/layout/*/Index.tsx"
]);

type LayoutConfig = { type: LayoutType; component: React.ReactNode };
//
const layoutConfigs = Object.entries(layoutComponentModules).map(
  ([ layoutPath, layoutComp ]: [ string, any ]) => {
    const layoutType = layoutPath
      .replace("/src/layout/", "")
      .replace(/.tsx|\/Index.tsx/, "") as LayoutType;
    const LayoutComponent = lazy(layoutComp);
    return { type: layoutType, component: <LayoutComponent /> } as LayoutConfig;
  }
);
//
export type RouteConfig = RouteObject & Partial<PageConfig>;
const routeConfigs: Array<RouteConfig> = Object.entries(
  pageComponentModules
).map(([ pagePath, dynamicImport ]) => {
  const PageComponent = lazy(dynamicImport as any);
  const path = parsePath(pagePath);
  const config = { ...defaultPageConfig, ...(pageConfig[path] || {}) };
  return {
    ...config,
    path,
    element: config.auth ? (
      <AuthRoute>
        <PageComponent />
      </AuthRoute>
    ) : (
      <PageComponent />
    )
  };
});


export const routes = generateRoutes(layoutConfigs, routeConfigs);

export default createBrowserRouter(
  [ ...routes, { path: "*", element: <NotFound /> } ],
  { basename: import.meta.env.BASE_URL }
);

/**
 * 根据页面文件地址生成路由路径
 * @param pagePath
 * @returns
 */
function parsePath (pagePath: string) {
  let path = pagePath.replace("/src/view", "").replace(/.tsx|\/Index.tsx/, "");
  if ( /\[\[.+?]]/.test(path) ) {
    return path.replace(/\[\[/g, ":").replace(/]]/g, "?");
  }
  if ( /\[.+?]/.test(path) ) {
    return path.replace(/\[/g, ":").replace(/]/g, "");
  }
  return path || "/";
}

/**
 * 生成路由器配置
 * @param layoutConfigs
 * @param routeConfigs
 * @returns
 */
function generateRoutes (
  layoutConfigs: Array<LayoutConfig>,
  routeConfigs: Array<RouteConfig>
): RouteConfig[] {
  const noUseLayoutRoutes = routeConfigs.filter(
    (routeConfig) => routeConfig.layout === false
  );
  const useLayoutRoutes = layoutConfigs.map((layoutConf) => {
    const layoutRoutes = routeConfigs.filter(
      (routeConf) => routeConf.layout === layoutConf.type
    );
    return {
      errorElement: <ErrorPage />,
      element: layoutConf.component,
      children: layoutRoutes
    };
  });
  return [ ...useLayoutRoutes, ...noUseLayoutRoutes ];
}