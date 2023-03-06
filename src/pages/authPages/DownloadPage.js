/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

import { getDownloadAllDevices, getDownloadDeviceReadings } from '../../redux/actions/auth/auth.action';
import { connect, useSelector } from 'react-redux';

import { Spin, Form, notification, Select, DatePicker, Button} from 'antd';
import { CaretDownFilled, DownloadOutlined } from '@ant-design/icons';
import { Input } from 'antd';


function DownloadPage(props) {
  const [form] = Form.useForm();
  const [size, setSize] = useState('large');
  const [searchParams] = useSearchParams()

  const {RangePicker} = DatePicker

  useEffect(() => {
    const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
    const endDate = moment().format('DD-MM-YYYY HH:MM');
  }, []);

  useEffect(() => {
      const branchId = searchParams.get("branch_id");
      const clientId = searchParams.get("client_id");

      // if (!props.auth?.allDevicesfetched) {
      //     props.getDownloadAllDevices();
      // }

      // if (!props.auth?.fetchedDeviceReadings) {
      //     props.getDownloadDeviceReadings();
      // }
      console.log(" All d Devices List>>>>>>>>>>", props.auth.allDevicesfetched);

  }, [])

  const { Option } = Select;
  
  const devicesSelector = (
    <Select
        className='cost-tracker-select h-4-br'
        id='role-state'
        showSearch
        suffixIcon={<CaretDownFilled />}
    >
        {props.auth?.allDevicesfetched && props.auth?.allDevicesfetched?.map((device) =>
            <Option key={device.device_id} className='active-state-option' value={device.device_id}>
                {device.name}
            </Option>
        )}
    </Select>
)

const onUserFormSubmit = async () => {
  const request = await props.getDownloadAllDevices();

  if (request.fulfilled) {
      notification.info({
          message: 'successful',
          description: request.message,
      });
      form.resetFields();
      // return props.setVisibleUserBranch(false);
  }
  return notification.error({
      message: 'failed',
      description: request.message,
  });

}

  // const onSubmit = async ({ username, password }) => {
  //   const request = await props.loginAUser({ username, password });

  //   if (!request.fulfilled) {
  //     return notification.error({
  //       message: 'Failed',
  //       description: request.message,
  //     });
  //   }
  //   const query = new URLSearchParams(location.search);
  //   const from = query.get('from') || '/';
  //   window.location.href = '/';
  // };


//   return (
//     <div className='auth-page-container'>
//       <Spin spinning={props.auth.loginUserLoading} >
//         <div
//           className='signup-login-contact-form'
//         >
//           <Form
//             form={form}
//             name='loginForm'
//             onFinish={onSubmit}
//             layout='vertical'
//             labelAlign="center"
//             style={{ display: 'block' }}
//           >
//             <h1 className='signup-login-heading first-heading--auth'>
//               Welcome Back
//             </h1>
//             <Form.Item
//               name='username'
//               label='Username'
//               rules={[
//                 { required: true, message: 'Please enter user name' },
//                 { max: 40, message: 'username cannot be more than 40 characters' }
//               ]}

//             >
//               <Input className='signup-login-contact-input outlined-input' size='large' />
//             </Form.Item>

            // <Form.Item
            //   name='password'
            //   label='Password'
            //   validateTrigger={['onChange', 'onBlur']}
            //   rules={[
            //     { required: true, message: 'Please enter password' },
            //     { max: 60, message: 'username cannot be more than 60 characters' }
            //   ]}
            // >
            //   <Input size='large' className='signup-login-contact-input outlined-input' type='password' />
            // </Form.Item>


//             <p className='signup-login-contact-error-message'>{errorMessage}</p>

//             <div className='forgot-password-wrapper'>
//               {/* <Link className='forgot-password' to='/reset-password'>
//             Forgot Password?
//           </Link> */}
//             </div>
//             <Form.Item>
//               <button type='submit' className='signup-login-contact-button'>Log in</button>
//             </Form.Item>


//           </Form>
//         </div>

//         {/* <SocialCluster /> */}
//       </Spin>
//     </div>
//   );
// }

return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.newUserBranchLoading}>
            <h1 className='center-main-heading'>Download CSV File</h1>
            { 
              !props.auth.allDevicesfetched ? (<section className='cost-tracker-form-section'>
              <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  autoComplete="off"
                  className='cost-tracker-form'
                  onFinish={onUserFormSubmit}
              >
                  <div className='add-cclient-form-inputs-wrapper'>

                      {/* <div className='add-client-input-container-half'>
                          {
                              <Form.Item
                                  labelCol={{ span: 24 }}
                                  wrapperCol={{ span: 24 }}
                                  label="Device"
                                  name="device_id"
                                  rules={[{ required: true, message: 'Please select a device!' }]}
                              >
                                  {devicesSelector}
                              </Form.Item>
                          }
                      </div>

                      <div className='add-client-input-container-half'>
                          {
                              <Form.Item
                                  labelCol={{ span: 24 }}
                                  wrapperCol={{ span: 24 }}
                                  label="Pick a Date"
                                  name=""
                                  rules={[{ required: true, message: 'Please select a date range!' }]}
                              >
                                  <RangePicker />
                              </Form.Item>
                          }
                      </div> */}
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

                  </div>

                  <div className='add_user_form_btn_align'>
                      <button className='generic-submit-button cost-tracker-form-submit-button'>
                          submit
                      </button>
                      {/* <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                        Download
                      </Button> */}
                  </div>
              </Form>
          </section>) : (
                <section className='cost-tracker-form-section'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    className='cost-tracker-form'
                    onFinish={onUserFormSubmit}
                >
                    <div className='add-cclient-form-inputs-wrapper'>

                        {/* <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Device"
                                    name="device_id"
                                    rules={[{ required: true, message: 'Please select a device!' }]}
                                >
                                    {devicesSelector}
                                </Form.Item>
                            }
                        </div>

                        <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Pick a Date"
                                    name=""
                                    rules={[{ required: true, message: 'Please select a date range!' }]}
                                >
                                    <RangePicker />
                                </Form.Item>
                            }
                        </div> */}
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

                    </div>

                    <div className='add_user_form_btn_align'>
                        <button className='generic-submit-button cost-tracker-form-submit-button'>
                            submit
                        </button>
                        {/* <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                          Download
                        </Button> */}
                    </div>
                </Form>
            </section>
              )
            }
            <section className='cost-tracker-form-section'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    className='cost-tracker-form'
                    onFinish={onUserFormSubmit}
                >
                    <div className='add-cclient-form-inputs-wrapper'>

                        {/* <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Device"
                                    name="device_id"
                                    rules={[{ required: true, message: 'Please select a device!' }]}
                                >
                                    {devicesSelector}
                                </Form.Item>
                            }
                        </div>

                        <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Pick a Date"
                                    name=""
                                    rules={[{ required: true, message: 'Please select a date range!' }]}
                                >
                                    <RangePicker />
                                </Form.Item>
                            }
                        </div> */}
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

                    </div>

                    <div className='add_user_form_btn_align'>
                        <button className='generic-submit-button cost-tracker-form-submit-button'>
                            submit
                        </button>
                        {/* <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                          Download
                        </Button> */}
                    </div>
                </Form>
            </section>
        </Spin>
    </div>
}

const mapDispatchToProps = {
  getDownloadAllDevices,
  getDownloadDeviceReadings,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPage);






// end of script