import React, { useEffect } from 'react';

import { Form, Input, notification, Spin } from 'antd';


import { getBranches, updateBranch } from '../../../redux/actions/branches/branches.action';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';



function UpdateBranchForm(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const initialValues= {
    name: 'Branch',
    address: 'Officesssssssssssss'
  }

  useEffect(() => {
    form.setFieldsValue({
      name: props.branchData.name,
      address: props.branchData.organisation
    })
  }, [props.branchData])
  
  const onSubmit = async (values) => {
    const client_id = searchParams.get("client_id");
    const branch_id = props.branchData.branch_id

    const bodyParams = {
      ...values,
      client: client_id
  }

    const request = await props.updateBranch(branch_id, bodyParams);
    if (request.fulfilled) {
      form.resetFields();
      props.setModal(false);
      notification.info({
        message: 'successful',
        description: request.message,
      });

      const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
      const endDate = moment().format('DD-MM-YYYY HH:MM');
      props.getBranches(client_id, startDate, endDate);
    }
    return notification.error({
      message: 'failed',
      description: request.message,
    });
  };

  return (
    <>
      <div className='cost-tracker-forms-content-wrapper'>
        <Spin spinning={props.branches?.newViewBranchesLoading}>


          <h1 className='center-main-heading'>Edit Branch Form</h1>

          <section className='cost-tracker-form-section'>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues= {initialValues}
              onFinish={onSubmit}
              autoComplete="off"
              form={form}
            >
              <div className='add-cclient-form-inputs-wrapper'>

                {/* BRANCH NAME  */}
                <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Branch Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input a bramch name!' }]}
                  >
                    <Input placeholder="Branch Name" size="large" />
                  </Form.Item>
                </div>

                {/* OFFICE ADDRESS  */}
                <div className='add-client-input-container'>
                  <Form.Item
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    label="Office Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input an office address!' }]}
                  >
                    <Input placeholder="Office Address" size="large" />
                  </Form.Item>
                </div>

              </div>
              <div className='add-client-button-wrapper'>
                <button className='generic-submit-button'>
                  Update Branch
                </button>
              </div>
            </Form>
          </section>
        </Spin>
      </div>
    </>
  );  
}

const mapDispatchToProps = {
  updateBranch,
  getBranches
};

const mapStateToProps = (state) => ({
  branches: state.branches
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBranchForm);  
