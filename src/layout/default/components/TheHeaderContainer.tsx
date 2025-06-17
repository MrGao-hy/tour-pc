import type { ReactNode, CSSProperties } from "react";
import { Layout, theme } from "antd";

interface PropsType {
  children: ReactNode;
  style?: {}
}

const LayoutHeaderContainer = (props: PropsType) => {
  const { children, style } = props;
  const {
    token: { colorBgContainer, colorBorderSecondary }
  } = theme.useToken();
  const headerStyle: CSSProperties = { position: "sticky", top: 0, zIndex: 100 };
  return (
    <>
      <Layout.Header style={ {
        padding: "0 16px",
        backgroundColor: colorBgContainer,
        borderBottom: `1px solid ${ colorBorderSecondary }`,
        ...headerStyle,
        ...style
      } }>
        { children }
      </Layout.Header>
    </>
  );
}
export default LayoutHeaderContainer
