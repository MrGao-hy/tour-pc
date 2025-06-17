import { useNavigate } from 'react-router-dom';
import { Spin, Row, Col } from 'antd';
import cookie from "@/config/cookie";
import config from "@/config";

/**
 * Route authentication
 * @description Verify whether the user token is valid.
 * @workflow The current workflow is as follows: This component will be executed once each time the route authentication page that enters the system is initialized, and will not be executed again when the subsequent non-refresh mode jumps the page.
 * Instead, it is checked by the api used in the page, and if the api returns 401, authentication fails.
 */
// eslint-disable-next-line no-undef
export default function AuthRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const token = cookie.get(config.prefix + "token");
  // const { data: tokenIsValid, loading } = useRequest(fetchIsTokenValid, {
    // If you need to require authentication each time you switch routes, open the following two lines of comments.
    // loadingDelay: 300,
    // refreshDeps: [location]
  // });
  

  if (!token) {
    navigate("/login");
    return;
  }

  return children;
}

function Loading() {
  return (
    <Row justify="center" align="middle" style={{ flex: 1 }}>
      <Col>
        <Spin tip="正在进行权限认证..." />
      </Col>
    </Row>
  );
}
