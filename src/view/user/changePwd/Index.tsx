import { Row, Col, Form, Card } from 'antd';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { changePasswordApi } from '@/api';
import { UserVo } from '@/typing';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const ChangePassword = () => {
  const onFinish = async (values: UserVo) => {
    await changePasswordApi(values);
  };
  return (
    <Card style={{ flex: 1 }} bordered={false}>
      <Row>
        <Col xs={24} md={18} lg={16} xl={12} xxl={10}>
          <ProForm
            {...formItemLayout}
            layout="horizontal"
            onFinish={onFinish}
            submitter={{
              searchConfig: {
                submitText: '保存'
              },
              resetButtonProps: {
                style: {
                  display: 'none'
                }
              },
              render(props, dom) {
                return <Form.Item wrapperCol={{ offset: 8 }}>{dom}</Form.Item>;
              }
            }}
          >
            <ProFormText.Password
              label="当前密码"
              placeholder="请输入此账户当前密码"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: '请输入此账户当前密码'
                }
              ]}
            />
            <ProFormText.Password
              label="新密码"
              placeholder="请输入新密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入新密码'
                }
              ]}
            />
            <ProFormText.Password
              label="确认密码"
              placeholder="请再次输入新密码"
              name="ConfirmPassword"
              rules={[
                {
                  required: true,
                  message: '请再次输入新密码'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('您输入的确认密码与新密码不一致！')
                    );
                  }
                })
              ]}
            />
          </ProForm>
        </Col>
      </Row>
    </Card>
  );
}

export default ChangePassword;
