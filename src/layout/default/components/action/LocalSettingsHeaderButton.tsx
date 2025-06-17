import { ReactNode, useState } from "react";
import { Tooltip, Drawer, Button, Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import DarkModeSwitch from "@/layout/default/components/action/DarkModeSwitch";
import ThemeColorsSelect from '@/layout/default/components/action/ThemeColor';
import LayoutToggle from '@/layout/default/components/action/LayoutToggle';


export default function LocalSettingsBtn () {

  const [ isOpenSetting, setIsOpenSetting ] = useState(false);
  return (
    <>
      <Tooltip placement="bottomRight"
               title="本地设置"
               arrow>
        <Button type="text"
                icon={ <SettingOutlined /> }
                onClick={ () => setIsOpenSetting(true) } />
      </Tooltip>
      <Drawer title="系统本地设置"
              placement="right"
              open={ isOpenSetting }
              onClose={() => setIsOpenSetting(false)}
      >
        <ConfigItem title="整体风格"
                    content={ <DarkModeSwitch /> } />
        <ConfigItem title="主题色" content={ <ThemeColorsSelect /> } />
        <ConfigItem title="导航模式" content={<LayoutToggle />} />
      </Drawer>
    </>
  );
}

function ConfigItem ({
                       title,
                       content
                     }: {
  title: ReactNode | string;
  content: ReactNode;
}) {
  return (
    <Card size="small"
          bordered={ false }
          style={ {
            width: "100%",
            marginBottom: 16
          } }
      >
      <div style={ {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center"
      } }>
        <div style={ { margin: "8px 0", fontSize: 15 } }>{ title }</div>
        { content }
      </div>
    </Card>
  );
}
