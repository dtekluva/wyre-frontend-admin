import { Button, Form, Input } from 'antd';
import React from 'react';


const { TextArea } = Input;

// import { useForm } from 'react-hook-form';

// import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
// import OutlinedInput from '../smallComponents/OutlinedInput';

function Contact() {
//   const { register, handleSubmit } = useForm();
  const [form] = Form.useForm();

  const onSubmit = ({ givenName, email, contactMessage }) => {
    // obtain form inputs here
  };

  return (
    <div className='auth-page-container'>
    <div  className='signup-login-contact-form' >
      <Form 
        form={form}
        name='loginForm'
        onFinish={onSubmit}
        layout='vertical'
        labelAlign="center"
        style={{display: 'block'}}
        >
        <h1 className='contact-heading first-heading--auth'>Say hello!</h1>
        <Form.Item name='firstName'
        label='First Name'
        rules={[
          { required: true, message: 'Please enter first name' },
            { max: 40, message: 'username cannot be more than 40 characters' }
        ]}
    
        >
          <Input className='signup-login-contact-input outlined-input' size='large' />
        </Form.Item>
        <Form.Item 
        name='email'
        label='Email'
        rules={[
          { required: true, type: 'email', message: 'Please enter email' },
            { max: 40, message: 'username cannot be more than 40 characters' }
        ]}
    
        >
          <Input className='signup-login-contact-input outlined-input' size='large' type='email' />
        </Form.Item>

        <Form.Item name='contactMessage'
        label='Your Message'
        // hasFeedback
        validateTrigger={['onChange', 'onBlur']}
        rules={[
          { required: true, message: 'Please enter contactMessage' },
            { max: 500, message: 'username cannot be more than 500 characters' }
        ]}
        >
          <TextArea size='large' className='signup-login-contact-input outlined-input' />
        </Form.Item>
        <Form.Item 
        >
         <button className='signup-login-contact-button'>Send Message</button>
        </Form.Item>
        </Form>
        </div>
    </div>
  );
}

export default Contact;
