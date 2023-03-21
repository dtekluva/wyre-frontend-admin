import React, { useEffect } from 'react';
import { Form, Select, InputNumber, notification, Spin } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addUserToBranch } from '../../../redux/actions/auth/auth.action';
import { getClientUsersList } from '../../../redux/actions/users/user.action';

import { getABranch, getAResellerBranch, getAResellerBranchEnergyStats, getResellerViewBranches } from '../../../redux/actions/branches/branches.action';
import { addATariff } from '../../../redux/actions/tariffs/tariffs.action';
import { useSearchParams } from 'react-router-dom';

function AddTariffForm(props) {
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();
    const deviceData = props.deviceData
    const setModal = props.setModal
    const deviceName = props.branches.fetchedResellerBranchEnergyStats[0].device_name
    console.log("Device-Name>>>>>>>", props.branches.fetchedResellerBranchEnergyStats[0].device_name);
    console.log("this is the Device-Name>>>>>>>", deviceName);

    useEffect(() => {
        const branchId = searchParams.get("branch_id");
        const clientId = searchParams.get("client_id");

        if (!props.branches?.fetchedResellerBranch) {
            props.getAResellerBranch(branchId);
        }

        if (!props.branches?.fetchedResellerBranchEnergyStats) {
            // props.getAResellerBranchEnergyStats(clientId);
            props.getAResellerBranchEnergyStats();
        }

    }, [])

    const { Option } = Select;


    const onTariffInputSubmit = async (values) => {

        const branch_id = searchParams.get("branch_id")
        const client_id = searchParams.get("client_id")
        const tariffParameters = { 
            branch: branch_id,
            client: client_id,
            device: deviceName
        };
        const request = await props.addATariff(values);

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
        <InputNumber
            className='cost-tracker-select h-4-br'
            id='role-state'
        />
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
                                    {/* {usersSelector} */}
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
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    branches: state.branches,
    tariffs: state.tariffs 
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTariffForm);