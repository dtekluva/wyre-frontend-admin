import React, { useEffect } from 'react';
import { Form, Input, notification, Spin } from 'antd';
import { connect, useSelector } from 'react-redux';

import { getAResellerBranch, getAResellerBranchEnergyStats } from '../../../redux/actions/branches/branches.action';
import { getATariff, updateATariff } from '../../../redux/actions/tariffs/tariffs.action';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';


function UpadateTariffForm(props) {
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();
    const setModal = props.setModal
    const resellerData = props.resellerData
    const headers = useSelector((state) => state.headers);
    
    const branchId = searchParams.get("branch_id");

    useEffect(() => {
        const branchId = searchParams.get("branch_id");
        const clientId = searchParams.get("client_id");
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            amount: resellerData.tariff
        })
    }, [])

    const tariffId = resellerData.tariff_id

    const onUpdateTariffSubmit = async (values) => {
        const tariffParameters = {
            amount: values.amount
        }
        
        const request = await props.updateATariff(tariffId, tariffParameters);
        const defaultDataValue =  moment(headers.selectedDate, 'DD-MM-YYYY');
        const startDate = defaultDataValue.startOf('month').format('DD-MM-YYYY HH:mm');
        const endDate = defaultDataValue.endOf('month').format('DD-MM-YYYY HH:mm');

        const branch_id = searchParams.get("branch_id") || props.auth.deviceData.branch_id;

        if (request.fulfilled) {
            notification.info({
                message: 'Updated',
                description: request.message,
            });
            form.resetFields();
            props.getAResellerBranchEnergyStats(branch_id, startDate, endDate)
            return setModal(false);
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });

    }

    const inputTariff = (
        <Input
            className='cost-tracker-select h-4-br'
            id='role-state'
        />
    )

    // modal functions ends

    return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.newUserBranchLoading}>
            <h1 className='center-main-heading'>Change Tariff</h1>

            <section className='cost-tracker-form-section'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    className='cost-tracker-form'
                    onFinish={onUpdateTariffSubmit}
                >
                    <div className='add-cclient-form-inputs-wrapper'>

                        <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Tariff"
                                    name="amount"
                                    rules={[{ required: true, message: 'Please enter the new tariff!' }]}
                                >
                                    {inputTariff}
                                </Form.Item>
                            }
                        </div>

                    </div>

                    <div className='add_user_form_btn_align'>
                        <button className='generic-submit-button cost-tracker-form-submit-button'>
                            Update
                        </button>
                    </div>
                </Form>
            </section>
        </Spin>
    </div>
}

const mapDispatchToProps = {
    updateATariff,
    getATariff,
    getAResellerBranch,
    getAResellerBranchEnergyStats,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    branches: state.branches,
    tariffs: state.tariffs,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpadateTariffForm);