import React from 'react';
import { Form, Select, Input } from 'antd';
// import { useForm, Controller } from 'react-hook-form';
import { CaretDownFilled } from '@ant-design/icons';
function AddUserForm() {
    // modal form 
    const { Option } = Select;

    const roleSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='role-state'
            defaultValue='true'
            suffixIcon={<CaretDownFilled />}
        >
            <Option className='active-state-option' value='administrator'>
                Administrator
            </Option>
            <Option className='active-state-option' value='manager'>
                Manager
            </Option>
            <Option className='active-state-option' value='viewer'>
                Viewer
            </Option>
        </Select>
    );
    const permissionSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='permission-state'
            defaultValue='true'
            suffixIcon={<CaretDownFilled />}
        >
            <Option className='active-state-option' value='1'>
                1
            </Option>
            <Option className='active-state-option' value='2'>
                2
            </Option>
            <Option className='active-state-option' value='3'>
                3
            </Option>
            <Option className='active-state-option' value='4'>
                4
            </Option>
            <Option className='active-state-option' value='5'>
                5
            </Option>
        </Select>
    );
    // modal functions ends

    return <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>User Form</h1>

        <section className='cost-tracker-form-section'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                className='cost-tracker-form'
            >
                <div className='add-cclient-form-inputs-wrapper'>
                    <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Name"
                            name="userName"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </div>
                    <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </div>
                    <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Email Address"
                            name="emailAddress"
                            rules={[{ required: true, message: 'Please input your email address!' }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                    </div>
                </div>

                <div className='add-cclient-form-inputs-wrapper'>
                    <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Roles"
                            name="role"
                            rules={[{ required: true, message: 'Please select a value!' }]}
                        >
                            {roleSelector}
                        </Form.Item>
                    </div>
                    <div className='add-client-input-container'>
                        <Form.Item
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label="Permission"
                            name="permission"
                            rules={[{ required: true, message: 'Please select a value!' }]}
                        >
                            {permissionSelector}
                        </Form.Item>
                    </div>
                </div>
                <div className='add_user_form_btn_align'>
                    <button className='generic-submit-button cost-tracker-form-submit-button'>
                        Add
                    </button>
                </div>
            </Form>
        </section>
    </div>
}

export default AddUserForm