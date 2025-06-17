import { Layout } from "antd";
import React from "react";
import TheHeader from "@/layout/default/components/TheHeader";
import TheMenu from "@/layout/default/components/TheMenu";
import TheContent from "@/layout/default/components/TheContent";
import TheFooter from "@/layout/default/components/TheFooter";
import { useSelector } from "react-redux";
import { selectLayoutMode } from "@/store/reducer/settingSlice";

const DefaultLayout = () => {
  const layoutMode = useSelector(selectLayoutMode)
  return (
    <Layout hasSider={layoutMode === 'sidemenu'}>
      <TheMenu></TheMenu>
      <Layout className="site-layout">
        <TheHeader />
        {/*<LocalSettingsDrawer />*/ }
        <TheContent />
        <TheFooter />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;