import React , {useState} from 'react';
import { Form, Checkbox, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import {setLoginStatus } from 'auth/_store/authSlice';
import useRouter from 'hooks/useRouter';
import { saveAuth, saveToken } from 'utils/jwt';
import Logo from 'assets/images/logo-masothue.png';
import { VALIDATE_MESSAGES, KEY } from 'modules/Commons/_store/constants';
import { login , getProfile } from '../_api';

import './../_styles/login.scss';
import { openNotificationWithIcon } from 'helpers/funcs';
// const valueDefault = {
//   username: 'admin',
//   password: 'admin',
//   remember: true,
// };

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  // const [messageLoginErr, setMessageErr] = useState('');
  const [form] = Form.useForm();

  const onSubmitLogin = (values) => {
    const {email, password} =  values;
    setLoading(true)
    login(email,password).then(res => {
      if (res && res.data.status === KEY.SUCCESS) {
        console.log(res.data, 'data login')
        const user = res.data.data
        saveToken(user.token);
        getProfile().then(res => {
          if (res && res.data.status === KEY.SUCCESS) {
            const profile = res.data.data;
            console.log(profile,'profile');
            saveAuth(profile);
            dispatch(setLoginStatus(true))
            router.push('/');
          }
        })
      }
    }).catch (error => {
      openNotificationWithIcon('error', error)
    }).finally(() => setLoading(false));
  };
  // const messageErrTpl = () => {
  //   return messageLoginErr ? <Form.Item><div className="ant-form-item-explain ant-form-item-explain-error"><div role="alert">{ messageLoginErr }</div></div></Form.Item> : null;
  // }

  return (
    <div className="login full-screen d-flex-center">
      <div className="login__wrap bg-color-light">
        <div className="login__logo text-center">
          <img src={Logo} />
        </div>
        <Form
          form={form}
          layout="vertical"
          className="login-form"
          validateMessages={VALIDATE_MESSAGES}
          onFinish={(values) => onSubmitLogin(values)}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <div className="d-flex justify-content-between">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </div>
          </Form.Item>
          {/* { messageErrTpl()} */}
          <Form.Item>
            <Button loading={loading} htmlType="submit" className="btn btn-blue full-width">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
