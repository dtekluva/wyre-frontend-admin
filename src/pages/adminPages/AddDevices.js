import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Form, Select, Input, Checkbox } from 'antd';
// import CompleteDataContext from '../Context';

// import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../../components/BreadCrumb';

import { addADevice } from '../../redux/actions/devices/device.action';
import { connect } from 'react-redux';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/view-devices', name: 'Manage', id: 2 },
  { url: '/view-devices', name: 'View Devices', id: 3 },
  { url: '#', name: 'Add Device', id: 4 },
];

const { Option } = Select;

function AddDevices(props) {


  const dateAddedPicker = (
    <DatePicker
      format='DD-MM-YYYY'
      className='generic-input'
      id='equipment-purchase-date'
      // onChange={(e) => setValue('dateAdded', e.target.value, true)}
    />
  );

  const activeStateSelector = (
    <Select
      className='cost-tracker-select h-4-br'
      id='active-state'
      defaultValue='true'
      // suffixIcon={<CaretDownFilled />}
      // onChange={(e) => setValue('activeState', e.target.value, true)}
    >
      <Option className='active-state-option' value='true'>
        True
      </Option>
      <Option className='active-state-option' value='false'>
        False
      </Option>
    </Select>
  );

  
  const deviceTypes= ["Dell", "Asus", "Toshiba", "Samsung"]
  const actives= ["Active", "Inactive"]
  const iconTypes= ["Master", "Slave", "Novice"]
  const opertHours= ["6Hrs", "12Hrs", "18Hrs", "24Hrs"]
  const onSubmit = async (values) => {
    const request = await props.addADevice();
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>Devices</h1>

        <section className='cost-tracker-form-section'>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <div className='add-cclient-form-inputs-wrapper'> 

               {/* DEVICE NAME  */}
               <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Device Name"
                  name="deviceName"
                  rules={[{ required: true, message: 'Please input your device name!' }]}
                >
                  <Input placeholder="Device Name" size="large" />
                </Form.Item>
              </div>
              <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Device Identity"
                  name="deviceIdentity"
                  rules={[{ required: true, message: 'Please input your device identity!' }]}
                >
                  <Input placeholder="Device Identy" size="large" />
                </Form.Item>
              </div>

              {/* DEVICE TYPE */}
              <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Device Type"
                  name="deviceType"
                  rules={[{ required: true, message: 'Please select a device type!' }]}
                >
                  <Select size='large' placeholder="Device Type">
                    {deviceTypes.map((deviceType, index) => {
                      return <Select.Option key={index} value={deviceType}>{deviceType}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>
          <div className='add-cclient-form-inputs-wrapper'>
              <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Active"
                  name="isActive"
                  rules={[{ required: true, message: 'Please select one!' }]}
                >
                  <Select size='large' placeholder="Active">
                  {actives.map((active, index) => {
                      return <Select.Option key={index} value={active}>{active}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </div>

              <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Icon Type"
                  name="iconType"
                  rules={[{ required: true, message: 'Please select an icon type!' }]}
                >
                  <Select size='large' placeholder="Icon Type">
                    {iconTypes.map((icontype, index) => {
                      return <Select.Option key={index} value={icontype}>{icontype}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </div>

              {/* OPERATING HOURS */}
              <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Operating Hours"
                  name="operatingHours"
                  rules={[{ required: true, message: 'Please select operating hours!' }]}
                >
                  <Select size='large' placeholder="Choose Operating Hours">
                  {opertHours.map((opertHour, index) => {
                      return <Select.Option key={index} value={opertHour}>{opertHour}</Select.Option>
                    })}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className='add-cclient-form-inputs-wrapper'>
              {/* SOURCES */}
              <div className='add-client-input-container'>
                <Form.Item 
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }} 
                  name="remember" 
                  valuePropName="checked" 
                >
                    <Checkbox>Sources</Checkbox>
                </Form.Item>
              </div>
              
            </div>

            {/* <Button className='generic-submit-button cost-tracker-form-submit-button'>
              Add
            </Button> */}
            <div className='add-client-button-wrapper'>
              <button className='generic-submit-button'>
                Add Device
              </button>
            </div>
          </Form>
        </section>
      </div> 
    </>
  );
}

const mapDispatchToProps = {
  addADevice
};

const mapStateToProps = (state) => ({
  device: state.device,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDevices);  
