import React from "react";
import { CheckOutlined } from "@ant-design/icons";
import { ConfigProvider, Space } from "antd";
import { selectThemeColor, setThemeColor } from "@/store/reducer/settingSlice";
import { useSelector, useDispatch } from "react-redux";
import config from "@/config";
import { AppDispatch } from "@/store";

export function ThemeColorConfigProvider ({
                                            children
                                          }: {
  children: React.ReactNode;
}) {
  const themeColor = useSelector(selectThemeColor);
  return (
    <ConfigProvider theme={ {
      token: {
        colorPrimary: themeColor,
        colorBgTextHover: themeColor,
        colorBorderBg: themeColor,
        controlItemBgHover: themeColor,
        colorIcon: themeColor,
      },
        cssVar: true,
        hashed: false
    } }>
      { children }
    </ConfigProvider>
  );
}

const ThemeColorsSelect = () => {
  const themeColor = useSelector(selectThemeColor);
  const dispatch: AppDispatch = useDispatch();
  return (
    <Space wrap
           size="small"
           direction="horizontal">
      { config.themeColors.map((color, index) => (
        <ColorBlockItem key={ index }
                        color={ color }
                        isActive={ themeColor === color }
                        onClick={ () => {
                          dispatch(setThemeColor(color));
                        } } />
      )) }
    </Space>
  );
};

interface ColorBlockItemParams {
  color: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  isActive: boolean;
}

function ColorBlockItem ({ color, isActive, onClick }: ColorBlockItemParams) {
  return (
    <div style={ {
      cursor: "pointer",
      borderRadius: 6,
      width: 26,
      height: 26,
      overflow: "hidden",
      backgroundColor: color
    } }
         onClick={ onClick }>
      <ColorItemActive isShow={ isActive! } />
    </div>
  );
}

function ColorItemActive ({ isShow }: { isShow: boolean }) {
  return (
    <div style={ {
      display: isShow ? "block" : "none",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,.3)",
      textAlign: "center",
      lineHeight: "26px"
    } }>
      <CheckOutlined />
    </div>
  );
}

export default ThemeColorsSelect;