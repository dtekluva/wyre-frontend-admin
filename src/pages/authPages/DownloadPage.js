/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

import { getDownloadAllDevices, getDownloadDeviceReadings } from '../../redux/actions/auth/auth.action';
import { connect, useSelector } from 'react-redux';

import { Spin, Form, notification, Select, DatePicker, Button } from 'antd';
import { CaretDownFilled, DownloadOutlined } from '@ant-design/icons';
import { Input } from 'antd';


function DownloadPage(props) {
    const [form] = Form.useForm();
    const [formTwo] = Form.useForm();
    const [size, setSize] = useState('large');
    const [pPassword, setPPassword] = useState(null);

    const { RangePicker } = DatePicker


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

    const onPasswordFormSubmit = async (values) => {
        const { password } = values;
        const request = await props.getDownloadAllDevices(password);

        if (request.fulfilled) {
            setPPassword(password);
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

    }
    const onSelectFormSubmit = async (values) => {
        const { dateRange, deviceId } = values;
        console.log('this is the data that is coming in the values ====================>>>>>>>>>>.', values);
        const request = await props.getDownloadDeviceReadings(pPassword, deviceId, dateRange);

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

    }

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
                        onFinish={onPasswordFormSubmit}
                    >
                        <div className='add-cclient-form-inputs-wrapper'>

                            <Form.Item
                                name='password'
                                label='Password'
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    { required: true, message: 'Please enter password' },
                                    { max: 60, message: 'username cannot be more than 60 characters' }
                                ]}
                            >
                                <Input.Password size='large' className='signup-login-contact-input outlined-input' type='password' />
                            </Form.Item>

                        </div>

                        <div className='add_user_form_btn_align'>
                            <button className='generic-submit-button cost-tracker-form-submit-button'>
                                submit
                            </button>
                        </div>
                    </Form>
                </section>) :
                    (
                        <section className='cost-tracker-form-section'>
                            <Form
                                form={formTwo}
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                autoComplete="off"
                                className='cost-tracker-form'
                                onFinish={onSelectFormSubmit}
                            >
                                <div className='add-cclient-form-inputs-wrapper'>

                                    <div className='add-client-input-container-half'>
                                        {
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                label="Device"
                                                name="deviceId"
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
                                                name="dateRange"
                                                rules={[{ required: true, message: 'Please select a date range!' }]}
                                            >
                                                <RangePicker />
                                            </Form.Item>
                                        }
                                    </div>

                                </div>

                                {/* <div className='add_user_form_btn_align'>
                                    <Button type="submit" shape="round" icon={<DownloadOutlined />} size={size}>
                                        Download
                                    </Button>
                                </div> */}

                                <div className='add_user_form_btn_align'>
                                    <button className='generic-submit-button cost-tracker-form-submit-button'>
                                        Download
                                    </button>
                                </div>
                            </Form>
                        </section>
                    )
            }

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