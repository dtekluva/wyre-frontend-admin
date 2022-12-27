import React, { useEffect } from 'react';
import { Button, notification, Spin, Upload } from 'antd';

import { Input, Form } from 'antd';


import BreadCrumb from '../../components/BreadCrumb';
import { connect } from 'react-redux';
import { updateClient } from '../../redux/actions/clients/client.action';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/view-clients', name: 'Manage', id: 2 },
  { url: '/view-clients', name: 'View Clients', id: 3 },
  { url: '#', name: 'Add Clients', id: 4 },
];

const UpdateClientForm = (props) => {
  const [form] = Form.useForm();
  // const client_id = searchParams.get("client_id");
  const clientData = props.clientData
  const initialValues = {
    name: 'MyName',
    phone_number: '080897989695',
    email:"thismail@mail.com",
    address: 'Head Office'

  }

  useEffect(() => {
    console.log("CLIENT DATA here>>>>>>>>", clientData);
    form.setFieldsValue({
      name: clientData.name,
      phone_number: clientData.phone_number,
      email: clientData.email,
      address: clientData.address,
      id: clientData.client_id
      

      // logo: clientData.logo
    })
  }, [clientData])


  const onSubmit = async (values) => {
    const { logo, ...others } = values;
    const client_id = clientData.client_id;
    const bodyParams = {...others, client_id}
    // const {logo, ...bodyParams} = values
    console.log('OTHERS here>>>>>>>>>>>>>', bodyParams);
    const request = await props.updateClient(client_id, bodyParams);
    if (request.fulfilled) {
      form.resetFields();
      return notification.info({
        message: 'successful',
        description: request.message,
      });

    }
    return notification.error({
      message: 'failed',
      description: request.message,
    });
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <Spin spinning={props.client.newClientLoading}>
        <div className='cost-tracker-forms-content-wrapper'>
          <h1 className='center-main-heading'>Clients</h1>

          <section className='cost-tracker-form-section'>
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              // initialValues={{ remember: true }}
              initialValues={initialValues}
              // setFieldsValue={setFieldsValue}
              onFinish={onSubmit}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className='add-cclient-form-inputs-wrapper'>

                <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Company Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input company name!' }]}
                  >
                    <Input placeholder="ABC" size="large" />
                  </Form.Item>
                </div>
                <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Phone Number"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please input phone number!' },
                    { pattern: /^\d{11}$/gm, message: 'Phone number can only contain 11 numbers' },
                    ]}
                  >
                    <Input placeholder="Phone Number" size="large" />
                  </Form.Item>
                </div>
                <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      {
                        type: 'email',
                        message: 'Please enter a valid email!',
                      }
                    ]}
                  >
                    <Input placeholder="Email" size="large" />
                  </Form.Item>
                </div>
              </div>
              <div className='add-cclient-form-inputs-wrapper'>
                <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Office Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: 'Please input address!'
                      },
                    ]}
                  >
                    <Input placeholder="Office Address" size="large" />
                  </Form.Item>
                </div>
                {/* <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Client Logo"
                    name="logo"
                    rules={[
                      {
                        required: true,
                        message: 'Please add a client logo!'
                      }
                    ]}
                  >
                    <Upload accept="image/*"
                      multiple={false}
                      maxCount="1"
                      beforeUpload={async (file) => {
                        return false;
                      }}
                    >
                      <Button type='' >Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </div> */}
                <div className='add-client-input-container'>
                </div>

              </div>
              <div className='add-client-button-wrapper'>
                <Form.Item >
                  <button type='submit' className='generic-submit-button'>
                    Update Client
                  </button>
                </Form.Item>

              </div>

            </Form>
            {/* </form> */}
          </section>
        </div>
      </Spin>
    </>
  );
}

const mapDispatchToProps = {
  updateClient
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClientForm);

