/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

import { Spin, Form, Modal, DatePicker } from 'antd';

import { Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { APIServiceNoAuth } from '../../config/api/apiConfig';
import EnvData from '../../config/EnvData';
import FailedEmail from './FailedEmail';
import SuccessEmail from './SuccessEmail';
import FilledEmail from './FilledEmail';
import NoUrlEmail from './NoUrlEmail';

import jwtDecode from 'jwt-decode';

const { RangePicker } = DatePicker

function FillPostpaidUtilityEntry(props) {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState();
  const [openSucsModal, setOpenSucsModal] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  const [openNoUrlModal, setOpenNoUrlModal] = useState(false);
  const [openCompletedEntryModal, setOpenCompletedEntryModal] = useState(false);
  const [responseMsg, setResponseMsg] = useState();
  const [checkResponseMsg, setCheckResponseMsg] = useState();
  const [checkMailStatus, setCheckMailStatus] = useState();
  const [loading, setIsLoading] = useState(false);
  const [branchIdInfo, setBranchIdInfo] = useState(false);
  const [handledi, setHandleDi] = useState();
  const [handledj, setHandleDj] = useState();

  useEffect(() => {
    const branch = searchParams.get('dj');
    const formEntry = searchParams.get('di');

    if (fetchExpiration?.exp > Date.now()) {
      return setOpenNoUrlModal(true)
    } else {
      setOpenNoUrlModal(false)
    }

    if (!branch || !formEntry) {
     return setOpenNoUrlModal(true)
    }
    
    setHandleDj(branch)
    setHandleDi(formEntry)

    if (checkMailStatus === false) {
      return setOpenCompletedEntryModal(true)
    }
    // Creating the buffer object with utf8 encoding

    let branchString = Buffer.from(branch, "base64").toString();
    const postPaidEntry = Buffer.from(formEntry, "base64").toString();
    let branchIdInfo

    if (branchString) {
      const ab = branchString.replace(/'/g, '"');
      branchIdInfo = JSON.parse(ab);
      setBranchIdInfo(branchIdInfo);
    }
  }, [])
  
  const formEntry = searchParams.get('di');
  var fetchExpiration = jwtDecode(formEntry);
  
  const onFormSubmit = async (values) => {
    const {date, ...rest} = values
    const newValues = {
      token : formEntry,
      entry : {
      branch : branchIdInfo.id,
      ...rest,
      date : moment(date[0]).format("YYYY-MM-DD"),
      end_date : moment(date[1]).format("YYYY-MM-DD")
    }
    }
    
    const handleSuccessModal = () => setOpenSucsModal(true)
    const handleFailModal = () => setOpenFailModal(true)

    try {
      setIsLoading(true)
      const submitForm = await APIServiceNoAuth
        .post(`${EnvData.REACT_APP_API_BASE_URL}/api/v1/cost_tracker/post-paid/`, newValues);
      setResponseMsg(submitForm.data.message)
      setIsLoading(false)
      
      handleSuccessModal()
    } catch (error) {
      setResponseMsg(error.response.data.error)
      setIsLoading(false)
      handleFailModal()
    }
  }

  return (
    <>
      {!handledj || !handledi ? (
        <Modal
          open={openNoUrlModal}
          onOk={() => setOpenNoUrlModal(false)}
          onCancel={() => setOpenNoUrlModal(false)}
          width={400}
          footer={null}
        >
          <NoUrlEmail setModal={setOpenNoUrlModal} />
        </Modal>
      ) : (
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
              <Spin spinning={loading}>
                <h1 className="center-main-heading">
                  Monthly PostPaid Utility Entry
                </h1>
                <h2
                  className=""
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {branchIdInfo.name}
                </h2>
                <p style={{ display: "flex", justifyContent: "center" }}>
                  Please Input Your Monthly PostPaid Utility Bills
                </p>
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
                      <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    { required: true, message: "Please enter amount" },
                    {
                      max: 40,
                      message: "amount cannot be more than 40 characters",
                    },
                  ]}
                >
                  <Input
                    className="signup-login-contact-input outlined-input"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="date"
                  label="Period Covered"
                  rules={[
                    { required: true, message: "Please enter the date period" },
                  ]}
                >
                  <RangePicker
                    className="signup-login-contact-input outlined-input"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="value"
                  label="Value"
                  rules={[
                    { required: true, message: "Please enter value" },
                    {
                      max: 40,
                      message: "value cannot be more than 40 characters",
                    },
                  ]}
                >
                  <Input
                    className="signup-login-contact-input outlined-input"
                    size="large"
                  />
                </Form.Item>
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
      )}
    </>
  );
}

export default FillPostpaidUtilityEntry