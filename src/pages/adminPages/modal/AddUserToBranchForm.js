import React, { useEffect } from 'react';
import { Form, Select, Input, notification, Spin } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllRoles, addUserToBranch } from '../../../redux/actions/auth/auth.action';
import { getClients } from '../../../redux/actions/clients/client.action';
// import { updateUser } from '../../../redux/actions/users/user.action';
import { getABranch } from '../../../redux/actions/branches/branches.action';
import { useSearchParams } from 'react-router-dom';

function AddUserToBranchForm(props) {
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm();
    useEffect(() => {
        if (!props.auth?.fetchedRoles) {
            props.getAllRoles();
        }
        if (!props.client?.fetchedClient && props.auth.userData.role_text !== "CLIENT_ADMIN") {
            props.getClients();
        }

        const branchId = searchParams.get("branch_id");
        console.log("branch-id>>>>>>>>>", branchId);

        if (!props.branches?.fetchedBranch) {
            props.getABranch(branchId)
        }
    }, [])
    // modal form 
    const { Option } = Select;


    const onUserFormSubmit = async (values) => {
        // if userRole is SUPER-ADMIN, add branchId of the user to values      
        if (props.auth.userData.role_text === "SUPERADMIN") {
            values.branch = searchParams.get("branch_id");
        }

        const branch_id = searchParams.get("branch_id")
        console.log("values++++++++++++", values.branch);
        const request = await props.addUserToBranch(branch_id, values);

        if (request.fulfilled) {
            form.resetFields();
            props.setModal(false);
            notification.info({
                message: 'successful',
                description: request.message,
            });
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });

    }
    const roleSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='role-state'
            suffixIcon={<CaretDownFilled />}
        > {
                props.auth?.fetchedRoles && Object.entries(props.auth?.fetchedRoles).map(([roleName, roleValue]) =>
                // IF USER IS CLIENT_ADMIN && ROLENAME NOT INCLUDE [SUPERADMIN, ADMIN] && <Option key= .....
                ((props.auth.userData.role_text === "CLIENT_ADMIN" && (roleName !== "SUPERADMIN" && roleName !== "ADMIN")) || (props.auth.userData.role_text !== "CLIENT_ADMIN")) &&
                    <Option key={roleValue} className='active-state-option' value={roleValue}>
                        {roleName}
                    </Option>
                )
            }
        </Select>
    );
    const clientSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='role-state'
            showSearch
            disabled={true}
            suffixIcon={<CaretDownFilled />}
        > {
                props.client?.fetchedClient && props.client?.fetchedClient?.map((client) =>
                    <Option key={client.id} className='active-state-option' value={client.id}>
                        {client.name}
                    </Option>
                )
            }
        </Select>
    );

    // modal functions ends

    return <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.newUserLoading}>
            <h1 className='center-main-heading'>Branch User Form</h1>

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
                        {/* <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </div>
                    <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </div> */}

 
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your email address!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </div>
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Phone Number"
                                name="phone_number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>
                        </div>
                        <div className='add-client-input-container'>
                            {/* <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Email Address"
                            name="emailAddress"
                            rules={[{ required: true, message: 'Please input your email address!' }]}
                        >
                            <Input size="large" />
                        </Form.Item> */}
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your email address!' }]}
                            >
                                <Input type='password' size="large" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className='add-cclient-form-inputs-wrapper'>

                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Roles"
                                name="roles"
                                rules={[{ required: true, message: 'Please select a value!' }]}
                            >
                                {roleSelector}
                            </Form.Item>
                        </div>
                        {/* <div className='add-client-input-container'>
                            {props.auth.userData.role_text !== "CLIENT_ADMIN" && (
                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    label="Client"
                                    name="client"
                                    rules={[{ required: true, message: 'Please select a value!' }]}
                                >
                                {clientSelector}
                            </Form.Item>
                            )} 
                        </div> */}
                        <div className='add-client-input-container'>
                            {/* <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Pass word"
                                name="password"
                                rules={[{ required: true, message: 'Please input your email address!' }]}
                            >
                                <Input type='password' size="large" />
                            </Form.Item> */}
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
    getAllRoles,
    getClients,
    // updateUser,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    client: state.client,
    user: state.user,
    branches: state.branches
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserToBranchForm);