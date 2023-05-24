/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

import { getDownloadAllDevices, getDownloadDeviceReadings } from '../../redux/actions/auth/auth.action';
import { connect } from 'react-redux';

import { Spin, Form, Table, notification } from 'antd';

import { Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { APIServiceNoAuth } from '../../config/api/apiConfig';
import EnvData from '../../config/EnvData';



function FillDieselEntry(props) {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [formData, setFormData] = useState();
    const [branchId, setBranchId] = useState();
    const openNotification = ({ title, description }) => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    useEffect(() => {
        const branch = searchParams.get('branch_id');
        const branch_info = searchParams.get('branch_info');

        console.log('this is the  ==========>>>>>>>>>>>', { branch_id: branchId, branch_info })
        // console.log('this is branch_info  ==========>>>>>>>>>>>', branch_info)

        // Creating the buffer object with utf8 encoding
        let branchString = Buffer.from(branch, "base64").toString();
        // let bufferObjj = Buffer.from(branch_info, "base64");
        const branchInfoString = Buffer.from(branch_info, "base64").toString();
        //   return JSON.parse(json);

        if (branchString) {
            setBranchId(branchString)
        }

        if (branchInfoString) {
            // let stringTwo = bufferObjj.toString("utf8");
            // const d = JSON.parse(stringTwo);
            console.log('this ios the deviation report', (branchInfoString))
            const yy = branchInfoString.replace(/'/g, '"');

            const data = JSON.parse(yy)



            const myData = Object.keys(data).map((key) => {
                // const keyData
                return { 'date': key, diesel_consumed: data[key], day: moment([key], 'YYYY-MM-DD').format('dddd') }
                // console.log('here is the dydydydyd', dd)
            }).filter((newData) => !newData.diesel_consumed)
            setFormData(myData);
            console.log('this ios the dddddddde', myData)
        }
    }, [])


    const onFormSubmit = async (values) => {
        console.log('this is the on submit and here we are ===============>>>>.', values);

        // submit the form here
        try {
            const submitForm = await APIServiceNoAuth.post(`${EnvData.REACT_APP_API_BASE_URL}/api/v1/post_weekly_diesel_usage/${branchId}/`, values);
            // show success notification here
        } catch (error) {
            // Notification.
            // show error notification here
            notification.error({
                message: 'Requiest failed',
                description:
                    error.response.data.error,
            });
        }

    }


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
            render: (_, record) => (
                <Form.Item
                rules={[
                    {
                      required: true,
                      message: "this field is required and must be numbers only",
                      pattern: new RegExp(/^[0-9]{1,10}$/)
                    },
                  ]}
                name={record.date}>
                    <Input type="text" />
                </Form.Item>

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
                            dataSource={formData}
                            // loading={loading}
                            rowKey={(record) => record.id}
                            pagination={false}
                            footer={() => ``}
                        />
                        <div className='' style={{ display: 'flex', 'justifyContent': 'center' }}>
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