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

import { addADevice, getDeviceTypes } from '../../../redux/actions/devices/device.action';



function AddDeviceForm(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    // modal form 
    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {
        if (!props.devices?.fetchedDeviceType) {
            props.getDeviceTypes();
        }
    }, [])

    const onSubmit = async (values) => {

        const branch_id = searchParams.get("branch_id");
        const client_id = searchParams.get("client_id");
        const { operating_hours_start, operating_hours_end, ...others } = values;
        const formatedOperatingStart = moment(operating_hours_start).format('hh:mm');
        const formatedOperatingEnd = moment(operating_hours_end).format('hh:mm');
        console.log(formatedOperatingEnd)
        const request = await props.addADevice({
            ...others,
            operating_hours_start: formatedOperatingStart,
            operating_hours_end: formatedOperatingEnd,
            branch: branch_id,
            client: client_id
        });
        if (request.fulfilled) {
            form.resetFields();
            props.setModal(false);
            notification.info({
                message: 'successful',
                description: request.message,
            });

            const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
            const endDate = moment().format('DD-MM-YYYY HH:MM');
            props.getABranch(branch_id, startDate, endDate);
            props.getDevicesOverview(branch_id, startDate, endDate)
            props.getBranches(branch_id, startDate, endDate);
            return props.getBranchesTop(branch_id, startDate, endDate)
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
                props.devices?.fetchedDeviceType && props.devices?.fetchedDeviceType[0]?.map((deviceType) =>
                    <Option key={deviceType.id} className='active-state-option' value={deviceType.id}>
                        {deviceType.choice_name}
                    </Option>
                )
            }
        </Select>
    );
    // modal functions ends

    return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.devices?.newDeviceLoading}>
            <h1 className='center-main-heading'>Device Form</h1>

            <section className='cost-tracker-form-section'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onSubmit}
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
                            Add
                        </button>
                    </div>
                </Form>
            </section>
        </Spin>
    </div>
}


const mapDispatchToProps = {
    addADevice,
    getDeviceTypes
};

const mapStateToProps = (state) => ({
    devices: state.devices,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceForm); 