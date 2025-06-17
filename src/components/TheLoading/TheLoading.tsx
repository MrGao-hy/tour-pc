import { selectIsDarkMode } from "@/store/reducer/settingSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Row, Col } from 'antd';
import { useSelector } from "react-redux";

const antIcon = <LoadingOutlined />;

interface LoadingParams {
  height?: string | number;
}

/**
 * 正在加载图标
 * @param {LoadingParams} param0
 * @returns
 */
export default function TheLoading({ height }: LoadingParams) {
  const isDarkMode = useSelector(selectIsDarkMode);
  return (
    <Row
      align="middle"
      justify="center"
      style={{
        flex: 1,
        height: height || '100vh',
        backgroundColor: isDarkMode ? '#000' : '#fff'
      }}
    >
      <Col>
        <Spin indicator={antIcon} />
      </Col>
    </Row>
  );
}
