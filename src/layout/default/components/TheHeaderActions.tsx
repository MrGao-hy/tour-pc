import { Space } from "antd";
import FullScreenHeaderButton from "@/layout/default/components/action/FullScreenHeaderButton";
import NoticeHeaderButton from "@/layout/default/components/action/NoticeHeaderButton";
import PersonalCenter from "@/layout/default/components/action/PersonalCenter";
import LocalSettingsHeaderButton from "@/layout/default/components/action/LocalSettingsHeaderButton";


const TheHeaderActions = () => {
  return (
    <>
      <Space>
        <FullScreenHeaderButton />
        <NoticeHeaderButton />
        <PersonalCenter />
        <LocalSettingsHeaderButton />
      </Space>
    </>
  );
};

export default TheHeaderActions;