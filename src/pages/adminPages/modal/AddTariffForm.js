import React, { useEffect } from 'react';
import { Form, notification, Spin, Input } from 'antd';
import { connect, useSelector } from 'react-redux';

import { getAResellerBranchEnergyStats } from '../../../redux/actions/branches/branches.action';
import { addATariff } from '../../../redux/actions/tariffs/tariffs.action';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

function AddTariffForm(props) {
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();
    const setModal = props.setModal
    const resellerData = props.resellerData
    const headers = useSelector((state) => state.headers);
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
        const defaultDataValue =  moment(headers.selectedDate, 'DD-MM-YYYY');
        const startDate = defaultDataValue.startOf('month').format('DD-MM-YYYY HH:mm');
        const endDate = defaultDataValue.endOf('month').format('DD-MM-YYYY HH:mm');

        if (request.fulfilled) {
            notification.info({
                message: 'successful',
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
    getAResellerBranchEnergyStats,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    branches: state.branches,
    tariffs: state.tariffs,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTariffForm);