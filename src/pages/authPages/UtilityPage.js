/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { CaretDownFilled } from '@ant-design/icons';
import { Buffer } from 'buffer';

import { Spin, Form, Modal, DatePicker, Select } from 'antd';

import { Input } from 'antd';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import { APIServiceNoAuth } from '../../config/api/apiConfig';
import EnvData from '../../config/EnvData';
import FailedEmail from './FailedEmail';
import SuccessEmail from './SuccessEmail';
import NoUrlEmail from './NoUrlEmail';

import jwtDecode from 'jwt-decode';


function UtilityPage(props) {
  const [selectionForm] = Form.useForm();
  const [utilityType, setUtilityType] = useState(null);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const [openSucsModal, setOpenSucsModal] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  const [openNoUrlModal, setOpenNoUrlModal] = useState(false);
  const [responseMsg, setResponseMsg] = useState();
  const [loading, setIsLoading] = useState(false);
  const [branchIdInfo, setBranchIdInfo] = useState(false);
  const [handledi, setHandleDi] = useState(null);
  const [handledj, setHandleDj] = useState(null);
  const [handleExpiration, setHandleExpiration] = useState(null);

  useEffect(() => {
    const branch = searchParams.get('dj');
    const formEntry = searchParams.get('di');
    if (!branch || !formEntry) {
      return setOpenNoUrlModal(true)
    }
    setHandleDj(branch)
    setHandleDi(formEntry)
    const fetchExpiration = jwtDecode(formEntry);
    const currentTime = (Date.now() - 30000) / 1000

    const handleExp = fetchExpiration?.exp < currentTime
    setHandleExpiration(handleExp)

    let branchString = Buffer.from(branch, "base64").toString();
    let branchIdInfo

    if (branchString) {
      const ab = branchString.replace(/'/g, '"');
      branchIdInfo = JSON.parse(ab);
      setBranchIdInfo(branchIdInfo);
    }

    if (handleExpiration) {
      return setOpenNoUrlModal(false)
    } else {
      setOpenNoUrlModal(true)
    }
  }, [])

  const formEntry = searchParams.get('di');

  const onPrepaidFormSubmit = async (values) => {
    const { date, ...rest } = values
    const newValues = {
      token: formEntry,
      entry: {
        branch: branchIdInfo.id,
        ...rest,
        date: moment(date[0]).format("YYYY-MM-DD"),
        end_date: moment(date[1]).format("YYYY-MM-DD")
      }
    }

    const handleSuccessModal = () => setOpenSucsModal(true)
    const handleFailModal = () => setOpenFailModal(true)

    try {
      setIsLoading(true)
      const submitForm = await APIServiceNoAuth
        .post(`${EnvData.REACT_APP_API_BASE_URL}/api/v1/cost_tracker/pre-paid/`, newValues);
      form.resetFields();
      setResponseMsg(submitForm.data.message)
      setIsLoading(false)

      handleSuccessModal()
    } catch (error) {
      setResponseMsg(error.response.data.error)
      setIsLoading(false)
      handleFailModal()
    }
  }

  const onPostpaidFormSubmit = async (values) => {
    const { date, ...rest } = values
    const newValues = {
      token: formEntry,
      entry: {
        branch: branchIdInfo.id,
        ...rest,
        date: moment(date[0]).format("YYYY-MM-DD"),
        end_date: moment(date[1]).format("YYYY-MM-DD")
      }
    }

    const handleSuccessModal = () => setOpenSucsModal(true)
    const handleFailModal = () => setOpenFailModal(true)

    try {
      setIsLoading(true)
      const submitForm = await APIServiceNoAuth
        .post(`${EnvData.REACT_APP_API_BASE_URL}/api/v1/cost_tracker/post-paid/`, newValues);
      form.resetFields();
      setResponseMsg(submitForm.data.message)
      setIsLoading(false)

      handleSuccessModal()
    } catch (error) {
      setResponseMsg(error.response.data.error)
      setIsLoading(false)
      handleFailModal()
    }
  }

  const onSelectUtility = (selected, _) => {
    setUtilityType(selected);
  };


  const utilities = [
    {
      value: "prepaid",
      label: "Pre Paid",
    },
    {
      value: "postPaid",
      label: "Post Paid",
    },
  ];

  const utilitySelector = (
    <Select
      className="cost-tracker-select h-4-br"
      id="role-state"
      showSearch
      style={{ width: "300px", outline: "none" }}
      suffixIcon={<CaretDownFilled />}
      onSelect={onSelectUtility}
      options={utilities}
    >
    </Select>
  );

  const onSelectSubmit = (values) => {
    const { utility } = values;

    setUtilityType(utility);
  };

  return (
    <>
      <>
        {(!handledj || !handledi || handleExpiration) && (
          <Modal
            open={openNoUrlModal}
            onOk={() => setOpenNoUrlModal(false)}
            onCancel={() => setOpenNoUrlModal(false)}
            width={400}
            footer={null}
          >
            <NoUrlEmail setModal={setOpenNoUrlModal} />
          </Modal>
        )}
      </>
      {
        utilityType === 'prepaid' ? (
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
                  <Spin spinning={loading}>
                    <h1 className="center-main-heading">
                      Pre Paid Utility Entry
                    </h1>
                    <h2
                      className=""
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {branchIdInfo.name}
                    </h2>
                    <p style={{ fontFamily: "montssera", display: "flex", justifyContent: "center" }}>
                      Please Input Your Pre Paid Utility Bills
                    </p>
                    <section className="cost-tracker-form-section">
                      <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 3.001 }}
                        wrapperCol={{ span: 6.002 }}
                        autoComplete="off"
                        className="cost-tracker-form"
                        onFinish={onPrepaidFormSubmit}
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
                            className="ant-select-selector"
                            size="large"
                          />
                        </Form.Item>

                        <Form.Item
                          name="date"
                          label="Date"
                          rules={[
                            { required: true, message: "Please select a date from calender" },
                          ]}
                        >
                          <DatePicker
                            className="ant-select-selector"
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
                            className="ant-select-selector"
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
          </>
        ) :
          utilityType === 'postPaid' ? (
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
                    <Spin spinning={loading}>
                      <h1 className="center-main-heading">
                        Monthly Post Paid Utility Entry
                      </h1>
                      <h2
                        className=""
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {branchIdInfo.name}
                      </h2>
                      <p style={{ fontFamily: "montssera", display: "flex", justifyContent: "center" }}>
                        Please Input Your Monthly Post Paid Utility Bills
                      </p>
                      <section className="cost-tracker-form-section">
                        <Form
                          form={form}
                          name="basic"
                          labelCol={{ span: 3.001 }}
                          wrapperCol={{ span: 6.002 }}
                          autoComplete="off"
                          className="cost-tracker-form"
                          onFinish={onPostpaidFormSubmit}
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
                              className="ant-select-selector"
                              size="large"
                            />
                          </Form.Item>

                          <Form.Item
                            name="date"
                            label="Month"
                            rules={[
                              { required: true, message: "Please select a month" },
                            ]}
                          >
                            <DatePicker picker='month'
                              className="ant-select-selector"
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
                              className="ant-select-selector"
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
            </>
          ) : (

            <div
              style={{
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="cost-tracker-forms-content-wrapper"
            >
              {(handledj && handledi && !handleExpiration) &&
                (
                  <div>
                    <h1 className="center-main-heading">Please Select A Utility Type</h1>
                    <section className="cost-tracker-form-section">
                      <Form
                        form={selectionForm}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        className="cost-tracker-form"
                        onFinish={onSelectSubmit}
                      >
                        <div className="add-cclient-form-inputs-wrapper">
                          <div className="add-client-input-container-half">
                            <Form.Item
                              name="utility"
                              label="Utility"
                              labelCol={{ span: 24 }}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                { required: true, message: "Please select a utility type" },
                              ]}
                            >
                              {/* <Select size='large' className=' outlined-input_second' /> */}
                              {utilitySelector}
                            </Form.Item>
                          </div>
                        </div>
                        <div className="add_user_form_btn_align">
                          <button className="generic-submit-button cost-tracker-form-submit-button">
                            Click here
                          </button>
                        </div>
                      </Form>
                    </section>
                  </div>
                )}
            </div>
          )
      }





    </>
  );
}

export default UtilityPage;