/* eslint-disable no-restricted-globals */
import React, { useState, useContext } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Spin, Form, notification } from 'antd';
// import { useForm, Controller } from 'react-hook-form';
// import jwt from 'jwt-decode';

// import CompleteDataContext from '../Context';
// import loginHttpServices from '../services/login';
// import dataHttpServices from '../services/devices';

// import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
// import OutlinedInput from '../smallComponents/OutlinedInput';
// import SocialCluster from '../smallComponents/SocialCluster';

// import usePasswordToggle from '../smallComponents/usePasswordToggle'
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { loginAUser } from '../../redux/actions/auth.action';
import { connect } from 'react-redux';



function Login(props) {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [form] = Form.useForm();

  // const { setUserData } = useContext(CompleteDataContext);
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);

  // const from = query.get('from') || 'dashboard';

  // const { register, handleSubmit, control } = useForm();

  const onSubmit = async ({ username, password }) => {
    const request = await props.loginAUser({ username, password });

    if (!request.fulfilled) {
      return notification.error({
        message: 'Failed',
        description: request.message,
      });
    }
    const query = new URLSearchParams(location.search);
    const from = query.get('from') || 'dashboard';
    // try {
    //   setIsAuthenticating(true);
    //   localStorage.clear();

    //   const user = await loginHttpServices.login2({
    //     username: username,
    //     password: password,
    //   });

    //   window.localStorage.setItem('loggedWyreUser', JSON.stringify(user));
    //   window.location.href = from;
    //   // dataHttpServices.setUserId(user.data.id);
    //   // dataHttpServices.setToken(user.data.token);
    //   // setUserData({ user, decodedUser: jwt(user.data.token)});
    //   setIsAuthenticating(false)
    // } catch (exception) {
    //   setIsAuthenticating(false)
    //   setErrorMessage(exception.response.data.error);
    // }

    // loginAUser
  };

  const removeErrorMessage = (e) => {
    setErrorMessage(undefined);
  };

  return (
    <div className='auth-page-container'>
      <Spin spinning={isAuthenticating} >
        <div
          className='signup-login-contact-form'
        // onSubmit={handleSubmit(onSubmit)}
        >
          <Form
            form={form}
            name='loginForm'
            onFinish={onSubmit}
            layout='vertical'
            labelAlign="center"
            style={{ display: 'block' }}
          >
            <h1 className='signup-login-heading first-heading--auth'>
              Welcome Back
            </h1>
            <Form.Item
              name='username'
              label='Username'
              rules={[
                { required: true, message: 'Please enter user name' },
                { max: 40, message: 'username cannot be more than 40 characters' }
              ]}

            >
              <Input className='signup-login-contact-input outlined-input' size='large' />
            </Form.Item>

            <Form.Item
              name='password'
              label='Password'
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'Please enter password' },
                { max: 60, message: 'username cannot be more than 60 characters' }
              ]}
            >
              <Input size='large' className='signup-login-contact-input outlined-input' type='password' />
            </Form.Item>


            <p className='signup-login-contact-error-message'>{errorMessage}</p>

            <div className='forgot-password-wrapper'>
              {/* <Link className='forgot-password' to='/reset-password'>
            Forgot Password?
          </Link> */}
            </div>
            <Form.Item>
              <button type='submit' className='signup-login-contact-button'>Log in</button>
            </Form.Item>


          </Form>
        </div>

        {/* <SocialCluster /> */}
      </Spin>
    </div>
  );
}

const mapDispatchToProps = {
  loginAUser
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);






// end of script