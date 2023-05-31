/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

import { getDownloadAllDevices, getDownloadDeviceReadings } from '../../redux/actions/auth/auth.action';
import { connect } from 'react-redux';

import { Spin, Form, Table, notification, Modal } from 'antd';

import { Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { APIServiceNoAuth } from '../../config/api/apiConfig';
import EnvData from '../../config/EnvData';
import FailedEmail from './FailedEmail';
import SuccessEmail from './SuccessEmail';


function FillDieselEntry(props) {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();
    const [formData, setFormData] = useState();
    const [branchId, setBranchId] = useState();
    const [openSucsModal, setOpenSucsModal] = useState(false);
    const [openFailModal, setOpenFailModal] = useState(false);
    const [responseMsg, setResponseMsg] = useState();
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
            }).filter((newData) => !newData.diesel_consumed)
            setFormData(myData);
        }
    }, [])


    const onFormSubmit = async (values) => {
        const handleSuccessModal = () =>setOpenSucsModal(true)
        const handleFailModal = () =>setOpenFailModal(true)

        try {
            const submitForm = await APIServiceNoAuth.post(`${EnvData.REACT_APP_API_BASE_URL}/api/v1/post_weekly_diesel_usage/${branchId}/`, values);
            // setResponseMsg(fulfill.response.data)
            handleSuccessModal()
        } catch (error) {
            setResponseMsg(error.response.data.error)
            handleFailModal()
           /* notification.error({
                message: 'Request failed',
                description:
                    error.response.data.error,
            }); */
            // openNotification()
            
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


    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="cost-tracker-forms-content-wrapper"
      >
        <Spin
          spinning={
            props.auth.allDevicesfetchLoading ||
            props.auth.fetchDeviceReadingsLoading
          }
        >
          <h1 className="center-main-heading">Diesel Register</h1>
          <h2 className="" style={{ display: "flex", justifyContent: "center" }}>Polaris Bank</h2>
          <p style={{ display: "flex", justifyContent: "center" }}>
            Please fill in the required data below
          </p>
          {
            <section className="cost-tracker-form-section">
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                className="cost-tracker-form"
                onFinish={onFormSubmit}
              >
                <Table
                  className="table-striped-rows row-head"
                  columns={columns}
                  dataSource={formData}
                  // loading={loading}
                  rowKey={(record) => record.id}
                  pagination={false}
                  footer={() => ``}
                />
                <div
                  className=""
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <button className="generic-submit-button-other cost-tracker-form-submit-button color" style={{color: "FFCC4D"}}>
                    Submit
                  </button>
                </div>
              </Form>
            </section>
          }
        </Spin>
        {/* Success Modal */}
        <Modal
          open={openSucsModal}
          onOk={() => setOpenSucsModal(false)}
          onCancel={() => setOpenSucsModal(false)}
          width={400}
          footer={null}
        >
          <SuccessEmail
            setModal={setOpenSucsModal}
            responseMsg={responseMsg}
          />
        </Modal>

        {/* Failed Modal */}
        <Modal
          open={openFailModal}
          onOk={() => setOpenFailModal(false)}
          onCancel={() => setOpenFailModal(false)}
          width={400}
          footer={null}
        >
          <FailedEmail
            setModal={setOpenFailModal}
            responseMsg={responseMsg}
          />
        </Modal>
      </div>
    );
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