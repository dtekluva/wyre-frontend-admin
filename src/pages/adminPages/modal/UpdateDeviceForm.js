import React, { useEffect } from 'react';
import {
    Form, Select, Checkbox,
    Input, notification,
    TimePicker, Spin
} from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import moment from 'moment';
import { useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateDevice, getDeviceTypes, getDevicesOverview } from '../../../redux/actions/devices/device.action';



function UpdateDeviceForm(props) {
    const [searchParams] = useSearchParams();
    const initialValue = {
        name: 'Samsung'
    }
    const { Option } = Select;
    const [form] = Form.useForm(); 

    useEffect(() => {
        if (!props.devices?.fetchedDeviceType) {
            props.getDeviceTypes();
        }
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            name: props.deviceData.name,
            type: props.deviceData.type,
            device_id: props.deviceData.device_id,
            branch: props.deviceData.branch,
            operating_hours_start: moment(props.deviceData.operating_hours_start, 'HH:mm:ss'),
            operating_hours_end: moment(props.deviceData.operating_hours_end, 'HH:mm:ss'),
        })
    }, [props.deviceData])

    const onSubmit = async (values) => {

        const id = props.deviceData.id;
        const device_id = props.deviceData.device_id;
        const branch = props.deviceData.branch;
        const branch_id = searchParams.get("branch_id");
        const client_id = searchParams.get("client_id");
        const { operating_hours_start, operating_hours_end, ...others } = values;
        const formatedOperatingStart = moment(operating_hours_start).format('hh:mm');
        const formatedOperatingEnd = moment(operating_hours_end).format('hh:mm');

        const bodyParams = {
            ...others,
            device_id,
            branch,
            operating_hours_start: formatedOperatingStart,
            operating_hours_end: formatedOperatingEnd,
        }
        const request = await props.updateDevice(id, bodyParams);
        if (request.fulfilled) {
            form.resetFields();
            props.setModal(false);
            notification.info({
                message: 'successful',
                description: request.message,
            });

            return props.getDevicesOverview(branch_id)
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });
    };
    const deviceTypeSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='iconType-state'
            suffixIcon={<CaretDownFilled />}
        >
            {
                props.devices?.fetchedDeviceType && props.devices?.fetchedDeviceType?.map((deviceType) =>
                    <Option key={deviceType.id} className='active-state-option' value={deviceType.id}>
                        {deviceType.choice_name}
                    </Option>
                )
            }
        </Select>
    );

    return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.devices?.newDeviceLoading}>
            <h1 className='center-main-heading'>Edit Device Form</h1>

            <section className='cost-tracker-form-section'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    onFinish={onSubmit}
                    initialValues={initialValue}
                    form={form}
                    className='cost-tracker-form'
                >
                    <div className='add-cclient-form-inputs-wrapper large-time-picker' >
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Device Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your device name!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </div>
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Device Type"
                                name="type"
                                rules={[{ required: true, message: 'Please select a device type!' }]}
                            >
                                {deviceTypeSelector}

                            </Form.Item>
                        </div>
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Operating Hours Start"
                                name="operating_hours_start"
                                rules={[{ required: true, message: 'Please select a device type!' }]}
                            >
                                <TimePicker size="large" use12Hours format="h:mm a" />

                            </Form.Item>
                        </div>
                    </div>

                    <div className='add-cclient-form-inputs-wrapper large-time-picker'>
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Operating Hours End"
                                name="operating_hours_end"
                                rules={[{ required: true, message: 'Please select a device type!' }]}
                            >
                                <TimePicker size="large" use12Hours format="h:mm a" />

                            </Form.Item>
                        </div>
                        <div className='add-client-input-container'
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', marginTop: '42px' }}
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                name="is_source"
                                valuePropName="checked"
                            >
                                <Checkbox
                                    id='load'>Source</Checkbox>
                            </Form.Item>
                        </div>

                    </div>
                    <div className='add-cclient-form-inputs-wrapper'>


                    </div>
                    <div className='add_user_form_btn_align'>
                        <button className='generic-submit-button cost-tracker-form-submit-button'>
                            Update Device
                        </button>
                    </div>
                </Form>
            </section>
        </Spin>
    </div>
}


const mapDispatchToProps = {
    updateDevice,
    getDeviceTypes,
    getDevicesOverview
};

const mapStateToProps = (state) => ({
    devices: state.devices,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDeviceForm); 