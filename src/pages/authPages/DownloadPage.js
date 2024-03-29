/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { getDownloadAllDevices, getDownloadDeviceReadings } from '../../redux/actions/auth/auth.action';
import { connect } from 'react-redux';

import { Spin, Form, notification, Select, DatePicker } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { Input } from 'antd';
import { downloadFile } from '../../helpers/GeneralHelper';
import moment from 'moment';

const { convertArrayToCSV } = require('convert-array-to-csv');


function DownloadPage(props) {
    const [form] = Form.useForm();
    const [formTwo] = Form.useForm();
    const [pPassword, setPPassword] = useState(null);
    const [deviceName, setDeviceName] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [branchName, setBranchName] = useState(false);

    const { RangePicker } = DatePicker

    const onDeviceSelection = (selected, _) => {
        console.log(selected, _)
        setDeviceName(selected);
        setDeviceId(_.key);
    }
    const onBranchSelection = (selected, _) => {
        form.resetFields(['deviceId'])
        setBranchName(selected);
    }

    const { Option } = Select;


    const branches = props.auth?.allDevicesfetched && props.auth?.allDevicesfetched?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.branch_name === value.branch_name
        ))
    )

    const devicesSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='role-state'
            showSearch
            size='large'
            style={{width: '300px'}}
            disabled={!branchName}
            suffixIcon={<CaretDownFilled />}
            onSelect={onDeviceSelection}
        >
            {branchName && props.auth?.allDevicesfetched?.map((device) => device.branch_name === branchName
                &&
                <Option key={device.device_id} className='active-state-option' value={device.name}>
                    {device.name}
                </Option>
            )}
        </Select>
    )
    const branchSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='role-state'
            showSearch
            style={{width: '300px', outline: 'none'}}
            suffixIcon={<CaretDownFilled />}
            onSelect={onBranchSelection}
        >
            {props.auth?.allDevicesfetched && branches?.map((device) =>
                <Option key={device.branch_name} className='active-state-option' value={device.branch_name}>
                    {device.branch_name}
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
        const { dateRange } = values;
        const request = await props.getDownloadDeviceReadings(pPassword, deviceId, dateRange);

        if (request.fulfilled) {

            const abc = convertArrayToCSV(request.data);

            const downloadName = `${deviceName}.csv`;
            downloadFile(abc, downloadName)

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

    return <div style={{ height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.allDevicesfetchLoading || props.auth.fetchDeviceReadingsLoading}>
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

                            <div className='add-client-input-container-half'>
                                <Form.Item
                                    name='password'
                                    label='Password'
                                    labelCol={{ span: 24 }}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        { required: true, message: 'Please enter password' },
                                        { max: 60, message: 'username cannot be more than 60 characters' }
                                    ]}
                                >
                                    <Input.Password size='large' className=' outlined-input_second' type='password' />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='add_user_form_btn_align'>
                            <button className='generic-submit-button cost-tracker-form-submit-button'>
                                Submit
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
                                                label="branch"
                                                name="branchId"
                                                rules={[{ required: true, message: 'Please select a branch!' }]}
                                            >
                                                {branchSelector}
                                            </Form.Item>
                                        }
                                    </div>
                                    <div className='add-client-input-container-half'>
                                        {
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                wrapperCol={{ span: 24 }}
                                                label="Device"
                                                name="deviceId"
                                                disabled={!branchName}
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
                                                <RangePicker style={{width: '300px'}} disabledDate={(current) => current.isAfter(moment())} size='large' />
                                            </Form.Item>
                                        }
                                    </div>

                                </div>

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