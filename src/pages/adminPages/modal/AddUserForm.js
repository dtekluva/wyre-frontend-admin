import React, { useEffect } from 'react';
import { Form, Select, Input, notification, Spin } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { getAllRoles, addUsers } from '../../../redux/actions/auth/auth.action';
import { getClients } from '../../../redux/actions/clients/client.action';

function AddUserForm(props) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!props.auth?.fetchedRoles) {
            props.getAllRoles();
        }
        if (!props.client?.fetchedClient) {
            props.getClients();
        }
    }, [])
    // modal form 
    const { Option } = Select;


    const onUserFormSubmit = async (values) => {
        const request = await props.addUsers(values);

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
            <h1 className='center-main-heading'>User Form</h1>

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
                        <div className='add-client-input-container'>
                            <Form.Item
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                label="Client"
                                name="client"
                                rules={[{ required: true, message: 'Please select a value!' }]}
                            >
                                {clientSelector}
                            </Form.Item>
                        </div>
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
    getAllRoles,
    getClients,
    addUsers,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    client: state.client
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);