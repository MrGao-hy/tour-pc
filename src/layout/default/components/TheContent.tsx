import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

export default function LayoutContent () {
  return (
    <Layout.Content className="site-content">
      <Suspense>
        <Outlet />
      </Suspense>
    </Layout.Content>
  );
}
