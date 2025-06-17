import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LayoutHeaderContainer from "@/layout/default/components/TheHeaderContainer";
import HeaderActions from "@/layout/default/components/TheHeaderActions";
import { Button, Col, Menu, Row, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import {
  changeCollapsed,
  selectCollapsed,
  selectLayoutMode,
} from "@/store/reducer/settingSlice";
import { AppDispatch } from "@/store";
import { menus } from "@/config/menu";
import TheLogo from "@/layout/default/components/TheLogo";
import { useLocation, useNavigate } from "react-router-dom";
import type { SelectMenuType } from "@/typing";

const LayoutHeader = () => {
  const collapsed = useSelector(selectCollapsed);
  const layoutMode = useSelector(selectLayoutMode);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSelect = (e: SelectMenuType) => {
    navigate(e.key);
  };
  return (
    <>
      <LayoutHeaderContainer>
        <Row justify="space-between"
             align="middle">
          { layoutMode === "topmenu" && (
            <Col flex={ 1 }
                 style={ { display: "flex" } }>
              <TheLogo />
              <Menu mode="horizontal"
                    items={ menus }
                    onSelect={ onSelect }
                    defaultSelectedKeys={ [ "/" ] }
                    selectedKeys={ [ location.pathname || "/" ] } />
            </Col>
          ) }
          {
            layoutMode === "sidemenu" && (
              <Col>
                <Space>
                  <Button type="text"
                          icon={ collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
                          onClick={ () => dispatch(changeCollapsed()) } />
                  {/*<Breadcrumb />*/ }
                </Space>
              </Col>
            )
          }
          <Col>
            <HeaderActions />
          </Col>
        </Row>
      </LayoutHeaderContainer>
    </>
  );
};
export default LayoutHeader;
