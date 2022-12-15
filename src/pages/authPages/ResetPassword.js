import { Form, Input } from 'antd';
import React from 'react';
// import { useForm } from 'react-hook-form';

// import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
// import OutlinedInput from '../smallComponents/OutlinedInput';
// import SocialCluster from '../smallComponents/SocialCluster';

function ResetPassword() {
    const [form] = Form.useForm();
    const onSubmit = ({ email, password }) => {
        console.log(email, password);
    };

    return (
        <div className='auth-page-container'>
            <div className='signup-login-contact-form' >
                <Form
                    form={form}
                    name='loginForm'
                    onFinish={onSubmit}
                    layout='vertical'
                    labelAlign="center"
                    style={{ display: 'block' }}
                >
                    <p className='reset-password-note'>
                        Please fill in the form below with the email address associated with
                        your account and click "Reset My Password". Instructions for resetting
                        your password will be sent to you.
                    </p>

                    <Form.Item name='email'
                        label='Email'
                        rules={[
                            { required: true, type: 'email', message: 'Please enter email' },
                        ]}

                    >
                        <Input className='signup-login-contact-input outlined-input' size='large' />
                    </Form.Item>

                    <button className='signup-login-contact-button'>Reset Password</button>
                </Form>
            </div>
            {/* <SocialCluster /> */}
        </div>
    );
}

export default ResetPassword;
