/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

import { Spin, Form, Table, Modal } from 'antd';

import { Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { APIServiceNoAuth } from '../../config/api/apiConfig';
import EnvData from '../../config/EnvData';
import FailedEmail from './FailedEmail';
import SuccessEmail from './SuccessEmail';


function FillDieselEntry(props) {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState();
  const [openSucsModal, setOpenSucsModal] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  const [responseMsg, setResponseMsg] = useState();
  const [loading, setIsLoading] = useState(false);
  const [branchData, setBranchData] = useState(false);

  useEffect(() => {
    const branch = searchParams.get('ef');
    const entryData = searchParams.get('ej');

    // Creating the buffer object with utf8 encoding
    let branchString = Buffer.from(branch, "base64").toString();
    const dieselEntryString = Buffer.from(entryData, "base64").toString();

    if (branchString) {
      const ab = branchString.replace(/'/g, '"');
      const branchData = JSON.parse(ab);
      setBranchData(branchData);
    }

    if (dieselEntryString) {
      const yy = dieselEntryString.replace(/'/g, '"');
      const data = JSON.parse(yy)
    
 
      // format the data to be in the required format
      const myData = Object.keys(data).map((key) => {
        // const keyData
        return {
          'date': key, diesel_consumed: data[key],
          day: moment([key], 'YYYY-MM-DD').format('dddd')
        }
      }).filter((newData) => !newData.diesel_consumed)
      setFormData(myData);
    }
  }, [])


  const onFormSubmit = async (values) => {
    const handleSuccessModal = () => setOpenSucsModal(true)
    const handleFailModal = () => setOpenFailModal(true)

    try {
      setIsLoading(true)
      const submitForm = await APIServiceNoAuth
        .post(`${EnvData.REACT_APP_API_BASE_URL}/api/v1/post_weekly_diesel_usage/${branchData.branch_id}/`, values);
      setResponseMsg(submitForm.data.message)
      setIsLoading(false)
      handleSuccessModal()
    } catch (error) {
      setResponseMsg(error.response.data.error)
      setIsLoading(false)
      handleFailModal()
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
          <Input type="text" style={{ marginTop: '22px', display: 'flex', justifyContent: 'center' }} />
        </Form.Item>

      )
    },
  ];


  return (
    <>
      <div className="diesel_container_1">
        <div className="diesel_container_2">
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
                loading
              }
            >
              <h1 className="center-main-heading">Diesel Register</h1>
              <h2
                className=""
                style={{ display: "flex", justifyContent: "center" }}
              >
                {branchData.name}
              </h2>
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
                      <button
                        className="generic-submit-button-other cost-tracker-form-submit-button color"
                        style={{ color: "FFCC4D" }}
                      >
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
        </div>
      </div>
    </>
  );
}


export default FillDieselEntry






// end of script