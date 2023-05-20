/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { getDownloadAllDevices, getDownloadDeviceReadings } from '../../redux/actions/auth/auth.action';
import { connect } from 'react-redux';

import { Spin, Form, Table } from 'antd';

import { Input } from 'antd';



function FillDieselEntry(props) {
    const [form] = Form.useForm();

    const onFormSubmit = () => {
        console.log('this is the on submit and here we are ===============>>>>.')
    }

    const data = [
        { day: 'Monday', 'date': '13-05-2023', 'diesel_consumed': 0 },
        { day: 'Tuesday', 'date': '14-05-2023', 'diesel_consumed': 0 },
        { day: 'Wednesday', 'date': '15-05-2023', 'diesel_consumed': 0 },
        { day: 'Thursday', 'date': '16-05-2023', 'diesel_consumed': 0 },
        { day: 'Friday', 'date': '17-05-2023', 'diesel_consumed': 0 },
        { day: 'Saturday', 'date': '18-05-2023', 'diesel_consumed': 0 },
    ]


    const columns = [
        {
            title: 'Day',
            dataIndex: 'day',
            key: 'day',
            sorter: (a, b) => a.day.localeCompare(b.day),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date),
            sortDirections: ['descend', 'ascend'],

        },
        {
            title: 'Diesel Consumed(Liters)',
            dataIndex: 'diesel_consumed',
            key: 'diesel_consumed',
            sorter: (a, b) => a.device_id.localeCompare(b.device_id),
            sortDirections: ['descend', 'ascend'],
            render: (type) => (
                <p>
                    <Input type="text" />
                </p>

            )
        },
        // isActive()
    ];


    return <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.auth.allDevicesfetchLoading || props.auth.fetchDeviceReadingsLoading}>
            <h1 className='center-main-heading'>Polaris Bank</h1>
            <p style={{ display: 'flex', justifyContent: 'center' }}>
                Please fill in the required data below
            </p>
            {
                (<section className='cost-tracker-form-section'>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        autoComplete="off"
                        className='cost-tracker-form'
                        onFinish={onFormSubmit}
                    >

                        <Table
                            className='table-striped-rows'
                            columns={columns}
                            dataSource={data}
                            // loading={loading}
                            rowKey={(record) => record.id}
                            pagination={false}
                            footer={() => ``}
                        />
                        <div className='' style={{display: 'flex', 'justifyContent': 'center'}}>
                            <button className='generic-submit-button-other cost-tracker-form-submit-button'>
                                Submit
                            </button>
                        </div>
                    </Form>
                </section>)
            }

        </Spin>
    </div>
}

const mapDispatchToProps = {
    getDownloadAllDevices,
    getDownloadDeviceReadings,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(FillDieselEntry);






// end of script