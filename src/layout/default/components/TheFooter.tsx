import React from 'react';
import { Layout } from 'antd';

const Footer: React.FC = () => {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      山徒旅行 ©{new Date().getFullYear()} <a href={"https://beian.miit.gov.cn"} target="_blank">赣ICP备2024048852号-1</a>
    </Layout.Footer>
  );
};

export default Footer;
