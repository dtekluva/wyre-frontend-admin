import React, { useEffect, useContext } from 'react';
import { Button, DatePicker, notification, Select, Upload } from 'antd';
// import CompleteDataContext from '../Context';

import { Input, Form } from 'antd';

import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../../components/BreadCrumb';
import { connect } from 'react-redux';
import { addAClient } from '../../redux/actions/clients/client.action';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/view-clients', name: 'Manage', id: 2 },
  { url: '/view-clients', name: 'View Clients', id: 3 },
  { url: '#', name: 'Add Clients', id: 4 },
];

const { Option } = Select;

const AddClients = (props) => {

  // const { setCurrentUrl } = useContext(CompleteDataContext);

  // const { register, handleSubmit, setValue, control, errors } = useForm();

  // useEffect(() => {
  //   if (match && match.url) {
  //     setCurrentUrl(match.url);
  //   }
  // }, [match, setCurrentUrl]);

  // const dateAddedPicker = (
  //   <DatePicker
  //     format='DD-MM-YYYY'
  //     className='generic-input'
  //     id='equipment-purchase-date'
  //     onChange={(e) => setValue('dateAdded', e.target.value, true)}
  //   />
  // );

  // const activeStateSelector = (
  //   <Select
  //     className='cost-tracker-select h-4-br'
  //     id='active-state'
  //     defaultValue='true'
  //     suffixIcon={<CaretDownFilled />}
  //     onChange={(e) => setValue('activeState', e.target.value, true)}
  //   >
  //     <Option className='active-state-option' value='true'>
  //       True
  //     </Option>
  //     <Option className='active-state-option' value='false'>
  //       False
  //     </Option>
  //   </Select>
  // );

  const onSubmit = async (values) => {
    console.log('this is the file =====================>>>>>>>', values)
    const { logo, others } = values;
    const request = await props.addAClient(others, logo.file);
    if (request.fulfilled) {
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

      <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>Clients</h1>

        <section className='cost-tracker-form-section'>
          {/* <form
            className='cost-tracker-form'
            action='#'
            onSubmit={handleSubmit(onSubmit)}
          > */}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
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
              <div className='add-client-input-container'>
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
              </div>
              <div className='add-client-input-container'>
              </div>

            </div>
            <div className='add-client-button-wrapper'>
              <button className='generic-submit-button'>
                Add Client
              </button>
            </div>

          </Form>
          {/* </form> */}
        </section>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  addAClient
};

const mapStateToProps = (state) => ({
  client: state.client,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddClients);

