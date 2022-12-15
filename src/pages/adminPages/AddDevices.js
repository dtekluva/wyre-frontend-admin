import React, { useEffect, useContext } from 'react';
// import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Form, Select, Button, Input, Checkbox, Space } from 'antd';
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

function AddDevices({ props, match }) {
  // const { setCurrentUrl } = useContext(CompleteDataContext);

  // const { register, handleSubmit, setValue, control, errors } = useForm();

  // useEffect(() => {
  //   if (match && match.url) {
  //     setCurrentUrl(match.url);
  //   }
  // }, [match, setCurrentUrl]);

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

  // const onSubmit = ({ deviceCode, deviceType, activeState, dateAdded }) => {
  //   console.log(deviceCode, deviceType, activeState, dateAdded);
  // };
  
  const deviceTypes= ["Dell", "Asus", "Toshiba", "Samsung"]
  const actives= ["Active", "Inactive"]
  const iconTypes= ["Master", "Slave", "Novice"]
  const opertHours= ["6Hrs", "12Hrs", "18Hrs", "24Hrs"]
  const onSubmit = async (values) => {
    const request = await props.addADevice();
    console.log('this is the values ==========>>>>>>>>>>>>>>>>>>>>>>>>>', request)
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
            // className='cost-tracker-form'
            // action='#'
            // // onSubmit={handleSubmit(onSubmit)}
            // onFinish={onSubmit}

            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className='add-cclient-form-inputs-wrapper'> 
              {/* <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='deviceCode'
                >
                  Device Code
                </label>
                <input
                  className='generic-input'
                  type='text'
                  name='deviceCode'
                  id='deviceCode'
                  // ref={register}
                  required
                  autoFocus
                />
              </div>   */}

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

              {/* <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='deviceType'
                >
                  Device Type
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='deviceType'
                  id='deviceType'
                  // ref={register}
                  required
                />
              </div> */}

              {/* DEVICE IDENTITY  */}
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
              {/* <div className='add-client-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='active-state'
                >
                  Is Active ?
                </label> */}

                {/* <Controller
                  as={activeStateSelector}
                  name='activeState'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  help={errors.activeState && 'Please select a value'}
                /> */}
                {/* <p className='input-error-message'>
                  {errors.activeState && 'Please select a value'}
                </p> */}
              {/* </div> */}

              {/* ACTIVE */}
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

              {/* <div className='add-client-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='equipment-purchase-date'
                >
                  Date Added
                </label> */}
                {/* <Controller
                  as={dateAddedPicker}
                  name='dateAdded'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errors.dateAdded && 'Please enter a date' ? 'error' : ''
                  }
                  help={errors.dateAdded && 'Please enter a date'}
                /> */}
                {/* <p className='input-error-message'>
                  {errors.dateAdded && 'Please enter a date'}
                </p>
              </div> */}
              
              {/* ICON TYPE */}
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
