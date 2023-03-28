import React, { useEffect } from 'react';
import { Form, notification, Spin, Input } from 'antd';
import { connect } from 'react-redux';

import { getABranch, getAResellerBranch, getAResellerBranchEnergyStats } from '../../../redux/actions/branches/branches.action';
import { addATariff } from '../../../redux/actions/tariffs/tariffs.action';
import { useSearchParams } from 'react-router-dom';
import { getDevicesOverview } from '../../../redux/actions/devices/device.action';

function AddTariffForm(props) {
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();
    const deviceData = props.deviceData
    const setModal = props.setModal
    const resellerData = props.resellerData

    useEffect(() => {
        const branchId = searchParams.get("branch_id");
        const clientId = searchParams.get("client_id");

        if (!props.devices?.fetchedDeviceOverview) {
            props.getDevicesOverview(branchId);
        }

        if (!props.branches?.fetchedResellerBranch) {
            props.getAResellerBranch(branchId);
        }

        if (!props.branches?.fetchedResellerBranchEnergyStats) {
            // props.getAResellerBranchEnergyStats(clientId);
            props.getAResellerBranchEnergyStats();
        }

    }, [])

    const branch_id = searchParams.get("branch_id")
    const client_id = searchParams.get("client_id")
    const deviceId = resellerData.device_id

    const onTariffInputSubmit = async (values) => {
        const tariffParameters = {
            client: client_id,
            branch: branch_id,
            device: deviceId,
            amount: values.amount
        }
        
        const request = await props.addATariff(tariffParameters);

        if (request.fulfilled) {
            notification.info({
                message: 'successful',
                description: request.message,
            });
            form.resetFields();
            return setModal(false);
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });

    }

    const inputTariff = (
        <Input/>
    )

    // modal functions ends

    return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.newUserBranchLoading}>
            <h1 className='center-main-heading'>Add Tarrif</h1>

            <section className='cost-tracker-form-section'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    className='cost-tracker-form'
                    onFinish={onTariffInputSubmit}
                >
                    <div className='add-cclient-form-inputs-wrapper'>

                        <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Tariff"
                                    name="amount"
                                    rules={[{ required: true, message: 'Please enter a tariff!' }]}
                                >
                                    {inputTariff}
                                </Form.Item>
                            }
                        </div>

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
    addATariff,
    getABranch,
    getAResellerBranch,
    getAResellerBranchEnergyStats,
    getDevicesOverview
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    branches: state.branches,
    tariffs: state.tariffs,
    devices: state.devices
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTariffForm);