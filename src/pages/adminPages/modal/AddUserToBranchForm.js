import React, { useEffect } from 'react';
import { Form, Select, notification, Spin } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { addUserToBranch } from '../../../redux/actions/auth/auth.action';
import { getClientUsersList } from '../../../redux/actions/users/user.action';

import { getABranch } from '../../../redux/actions/branches/branches.action';
import { useSearchParams } from 'react-router-dom';

function AddUserToBranchForm(props) {
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();

    useEffect(() => {
        const branchId = searchParams.get("branch_id");
        const clientId = searchParams.get("client_id");

        if (!props.branches?.fetchedBranch) {
            props.getABranch(branchId);
        }

        if (!props.user?.fetchedClientUser) {
            props.getClientUsersList(clientId);
        }

    }, [])

    const { Option } = Select;


    const onUserFormSubmit = async (values) => {

        const branch_id = searchParams.get("branch_id")
        const userValues = { branch: branch_id };
        const request = await props.addUserToBranch(values.userId, userValues);

        if (request.fulfilled) {
            notification.info({
                message: 'successful',
                description: request.message,
            });
            form.resetFields();
            return props.setVisibleUserBranch(false);
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });

    }

    const usersSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='role-state'
            showSearch
            suffixIcon={<CaretDownFilled />}
        >
            {props.user?.fetchedClientUser && props.user?.fetchedClientUser?.map((user) =>
                <Option key={user.id} className='active-state-option' value={user.id}>
                    {user.username}
                </Option>
            )}
        </Select>
    )

    // modal functions ends

    return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.newUserBranchLoading}>
            <h1 className='center-main-heading'>Add User To Branch</h1>

            <section className='cost-tracker-form-section'>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    className='cost-tracker-form'
                    onFinish={onUserFormSubmit}
                >
                    <div className='add-cclient-form-inputs-wrapper'>

                        <div className='add-client-input-container-half'>
                            {
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="User"
                                    name="userId"
                                    rules={[{ required: true, message: 'Please select a user!' }]}
                                >
                                    {usersSelector}
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
    getABranch,
    addUserToBranch,
    getClientUsersList,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    branches: state.branches
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToBranchForm);