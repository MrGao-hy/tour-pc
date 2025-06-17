import { Button, Menu, Layout } from "antd";
import LayoutLogo from "@/layout/default/components/TheLogo";
import { useSelector } from "react-redux";
import { menus } from "@/config/menu";
import { useEffect, useState } from "react";
import { selectCollapsed, selectIsDarkMode, selectLayoutMode } from "@/store/reducer/settingSlice";
import { useLocation, useNavigate } from "react-router-dom";
import type { SelectMenuType } from "@/typing";

const TheMenu = () => {
  const collapsed = useSelector(selectCollapsed);
  const isDarkMode = useSelector(selectIsDarkMode);
  const layoutMode = useSelector(selectLayoutMode);
  const navigate = useNavigate();
  const location = useLocation();

  const onSelect = (e: SelectMenuType) => {
    navigate(e.key)
  };
  
  
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location])

  return layoutMode === 'sidemenu' ? (
    <Layout.Sider width={ 260 }
                  collapsedWidth={ 80 }
                  trigger={ null }
                  collapsed={ collapsed }
                  style={{
                    background: !isDarkMode ? "#FFF" : "",
                    overflowY: "auto",
                    height: "100vh",
                    position: "sticky",
                    top: 0
                  }}>
      <LayoutLogo />
      <Menu mode="inline"
            theme={ isDarkMode ? "dark" : "light" }
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname || '/']}
            items={ menus }
            onSelect={onSelect}
      />
    </Layout.Sider>
  ) : null;
};

export default TheMenu;