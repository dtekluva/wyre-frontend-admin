/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";

import {
  getDownloadAllDevices,
  getDownloadDeviceReadings,
  toggleNonPostingDevice,
} from "../../redux/actions/auth/auth.action";
import { connect } from "react-redux";
import { AlertFilled, FireFilled } from '@ant-design/icons';

import { Spin, Form, notification, Select, DatePicker, Table, Switch, Tag } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import { Input } from "antd";
import { downloadFile } from "../../helpers/GeneralHelper";
import moment from "moment";
import { Link } from "react-router-dom";
import EnvData from "../../config/EnvData";
import { render } from "react-dom";

const { convertArrayToCSV } = require("convert-array-to-csv");

function DownloadPage(props) {
  const [form] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [formThree] = Form.useForm();
  const [pPassword, setPPassword] = useState(null);
  const [deviceName, setDeviceName] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [branchName, setBranchName] = useState(false);
  const [deviceSwitch, setDeviceSwitch] = useState(false)
  const [deviceData, setDeviceData] = useState({});
  const [monitorDataState, setMonitorDataState] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const { RangePicker } = DatePicker;

  const onDeviceSelection = (selected, _) => {
    console.log(selected, _);
    setDeviceName(selected);
    setDeviceId(_.key);
  };
  const onBranchSelection = (selected, _) => {
    form.resetFields(["deviceId"]);
    setBranchName(selected);
  };


  const { Option } = Select;

  const branches =
    props.auth?.allDevicesfetched &&
    props.auth?.allDevicesfetched?.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.branch_name === value.branch_name)
    );  
    
  const handleNonPostingTurggle = async () => {
    const request = await props.toggleNonPostingDevice(deviceData.device_id);

    if (request.fulfilled) {
      return notification.info({
        message: "Successful",
        description: request.message,
      });
    }
  } 
  const tableData = props.auth.allDevicesfetched
  // const sortedData = tableData.sort((a,b) => parseFloat(a.hours_since_last_post) - parseFloat(b.hours_since_last_post))
  useEffect(() => {
    if (props.auth.allDevicesfetched) {
      setMonitorDataState(tableData.filter(newtable => newtable.non_post_attention))
    }
  }, [props.auth.allDevicesfetched])

  const deviceStatus = () => ({
    title: "Device Control",
    key: "control",
    width: "10%",
    dataIndex: "control",
    render: (_, record) => {
      return (
        <Switch
          defaultChecked
          onClick={() => {
            setDeviceSwitch(true);
            setDeviceData(record);
          }}
        />
      );
    },
  });

  const columnData = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Branch Name",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Hours Since Last Post",
      dataIndex: "hours_since_last_post",
      key: "hours_since_last_post",
      render : (value) => <>{value + " Hour(s) "} <br /> <span>({Math.floor(value/24) + "Days,"}  {Math.floor(value % 24)+ "Hrs"})</span></>
    },
    {
      title: "Last Posted",
      dataIndex: "last_posted",
      key: "last_posted",
      render: (value) => value === null ? value : new Date(value).toDateString()
    },
    // {
    //   title: "Non Post Attention",
    //   dataIndex: "non_post_attention",
    //   key: "non_post_attention",
    //   render: (value) => <>{value.toString()}</>
    // },
    {
      title: "Status",
      dataIndex: "hours_since_last_post",
      key: "hours_since_last_post",
      render: (value) => value <= 36 ? <Tag icon={<AlertFilled  color="green"/>} color="green" ></Tag> : <Tag icon={<FireFilled  color="red"/>} color="red" ></Tag>
    },
    // deviceStatus,
    {
      title: "Add to Monitor",
    key: "control",
    width: "10%",
    dataIndex: "control",
    render: (_, record) => {
      return (
        <Switch
          checked = {record.non_post_attention}
          onClick={(value) => {
            setDeviceData(record);
            setDeviceSwitch(value);
            handleNonPostingTurggle()
          }}
        />
      );
    },
    }
  ]
  const monitorColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Branch Name",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: "Hours Since Last Post",
      dataIndex: "hours_since_last_post",
      key: "hours_since_last_post",
      render : (value) => <>{value + " Hour(s) "} <br /> <span>({Math.floor(value/24) + "Days,"}  {Math.floor(value % 24)+ "Hrs"})</span></>
    },
    {
      title: "Last Posted",
      dataIndex: "last_posted",
      key: "last_posted",
      render: (value) => value === null ? value : new Date(value).toDateString()
    },
    // {
    //   title: "Non Post Attention",
    //   dataIndex: "non_post_attention",
    //   key: "non_post_attention",
    //   render: (value) => <>{value.toString()}</>
    // },
    {
      title: "Status",
      dataIndex: "hours_since_last_post",
      key: "hours_since_last_post",
      render: (value) => value <= 36 ? <Tag icon={<AlertFilled  color="green"/>} color="green" ></Tag> : <Tag icon={<FireFilled  color="red"/>} color="red" ></Tag>
    },
    {
      title: "Remove From Monitor",
    key: "control",
    width: "10%",
    dataIndex: "control",
    render: (_, record) => {
      return (
        <Switch
          checked = {record.non_post_attention}
          disabled
          // onClick={(value) => {
          //   setDeviceData(record);
          //   setDeviceSwitch(value);
          //   handleNonPostingTurggle()
          // }}
        />
      );
    },
    }
  ]

  const devicesSelector = (
    <Select
      className="cost-tracker-select h-4-br"
      id="role-state"
      showSearch
      size="large"
      style={{ width: "300px" }}
      disabled={!branchName}
      suffixIcon={<CaretDownFilled />}
      onSelect={onDeviceSelection}
    >
      {branchName &&
        props.auth?.allDevicesfetched?.map(
          (device) =>
            device.branch_name === branchName && (
              <Option
                key={device.device_id}
                className="active-state-option"
                value={device.name}
              >
                {device.name}
              </Option>
            )
        )}
    </Select>
  );
  const branchSelector = (
    <Select
      className="cost-tracker-select h-4-br"
      id="role-state"
      showSearch
      style={{ width: "300px", outline: "none" }}
      suffixIcon={<CaretDownFilled />}
      onSelect={onBranchSelection}
    >
      {props.auth?.allDevicesfetched &&
        branches?.map((device) => (
          <Option
            key={device.branch_name}
            className="active-state-option"
            value={device.branch_name}
          >
            {device.branch_name}
          </Option>
        ))}
    </Select>
  );

  const onPasswordFormSubmit = async (values) => {
    const { password } = values;
    const request = await props.getDownloadAllDevices(password);

    if (request.fulfilled) {
      setPPassword(password);
      form.resetFields();
      return notification.info({
        message: "successful",
        description: request.message,
      });
    }
    return notification.error({
      message: "failed",
      description: request.message,
    });
  };
  const onSelectFormSubmit = async (values) => {
    const { dateRange } = values;
    const request = await props.getDownloadDeviceReadings(
      pPassword,
      deviceId,
      dateRange
    );

    if (request.fulfilled) {
      const abc = convertArrayToCSV(request.data);

      const downloadName = `${deviceName}.csv`;
      downloadFile(abc, downloadName);

      form.resetFields();
      return notification.info({
        message: "successful",
        description: request.message,
      });
    }
    return notification.error({
      message: "failed",
      description: request.message,
    });
  };

  const onSelectAggregateFormSubmit = async (values) => {
    const { dateRange } = values;
    const downloadUrl = `/api/v1/get_aggregated_device_readings/${pPassword}/${deviceId}/${
      moment(dateRange[0]).format("DD-MM-YYYY HH:mm") +
      "/" +
      moment(dateRange[1]).format("DD-MM-YYYY HH:mm")
    }/`;

    form.resetFields();

    notification.info({
      message: "successful",
      description: "successful",
    });
    return (window.location.href = `${EnvData.REACT_APP_API_URL}${downloadUrl}`);
  };

  return (
    <div
      style={{
        //   height: "500px",
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
        <h1 className="center-main-heading">Download CSV File</h1>
        {!props.auth.allDevicesfetched ? (
          <section className="cost-tracker-form-section">
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              autoComplete="off"
              className="cost-tracker-form"
              onFinish={onPasswordFormSubmit}
            >
              <div className="add-cclient-form-inputs-wrapper">
                <div className="add-client-input-container-half">
                  <Form.Item
                    name="password"
                    label="Password"
                    labelCol={{ span: 24 }}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      { required: true, message: "Please enter password" },
                      {
                        max: 60,
                        message: "username cannot be more than 60 characters",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      className=" outlined-input_second"
                      type="password"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="add_user_form_btn_align">
                <button className="generic-submit-button cost-tracker-form-submit-button">
                  Submit
                </button>
              </div>
            </Form>
          </section>
        ) : (
          <>
            <section className="cost-tracker-form-section">
              <h2>Download Device Readings</h2>
              <Form
                form={formTwo}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                className="cost-tracker-form"
                onFinish={onSelectFormSubmit}
              >
                <div className="add-cclient-form-inputs-wrapper">
                  <div className="add-client-input-container-half">
                    {
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="branch"
                        name="branchId"
                        rules={[
                          {
                            required: true,
                            message: "Please select a branch!",
                          },
                        ]}
                      >
                        {branchSelector}
                      </Form.Item>
                    }
                  </div>
                  <div className="add-client-input-container-half">
                    {
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="Device"
                        name="deviceId"
                        disabled={!branchName}
                        rules={[
                          {
                            required: true,
                            message: "Please select a device!",
                          },
                        ]}
                      >
                        {devicesSelector}
                      </Form.Item>
                    }
                  </div>

                  <div className="add-client-input-container-half">
                    {
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="Pick a Date"
                        name="dateRange"
                        rules={[
                          {
                            required: true,
                            message: "Please select a date range!",
                          },
                        ]}
                      >
                        <RangePicker
                          style={{ width: "300px" }}
                          disabledDate={(current) => current.isAfter(moment())}
                          size="large"
                        />
                      </Form.Item>
                    }
                  </div>
                </div>

                <div className="add_user_form_btn_align">
                  <button className="generic-submit-button cost-tracker-form-submit-button">
                    Download
                  </button>
                </div>
              </Form>
            </section>
            <section className="cost-tracker-form-section">
              <h2>Download Aggregated Device Readings</h2>
              <Form
                form={formThree}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                className="cost-tracker-form"
                onFinish={onSelectAggregateFormSubmit}
              >
                <div className="add-cclient-form-inputs-wrapper">
                  <div className="add-client-input-container-half">
                    {
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="branch"
                        name="branchId"
                        rules={[
                          {
                            required: true,
                            message: "Please select a branch!",
                          },
                        ]}
                      >
                        {branchSelector}
                      </Form.Item>
                    }
                  </div>
                  <div className="add-client-input-container-half">
                    {
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="Device"
                        name="deviceId"
                        disabled={!branchName}
                        rules={[
                          {
                            required: true,
                            message: "Please select a device!",
                          },
                        ]}
                      >
                        {devicesSelector}
                      </Form.Item>
                    }
                  </div>

                  <div className="add-client-input-container-half">
                    {
                      <Form.Item
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        label="Pick a Date"
                        name="dateRange"
                        rules={[
                          {
                            required: true,
                            message: "Please select a date range!",
                          },
                        ]}
                      >
                        <RangePicker
                          style={{ width: "300px" }}
                          disabledDate={(current) => current.isAfter(moment())}
                          size="large"
                        />
                      </Form.Item>
                    }
                  </div>
                </div>

                <div className="add_user_form_btn_align">
                  <button className="generic-submit-button cost-tracker-form-submit-button">
                    Download
                  </button>
                </div>
              </Form>
            </section>
            <section className="cost-tracker-form-section">
              <>
                <div className="monitoring_table">
                  <h2>Monitoring Table</h2>
                  <Table dataSource={monitorDataState} columns={monitorColumn} />
                </div>
                <div className="all_devices_table">
                  <h2>All Devices Table</h2>
                  <Table dataSource={tableData} columns={columnData} />
                </div>
              </>
            </section>
          </>
        )}
      </Spin>
    </div>
  );
}

const mapDispatchToProps = {
  getDownloadAllDevices,
  getDownloadDeviceReadings,
  toggleNonPostingDevice,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadPage);

// end of script
