import React, { useEffect, useContext } from 'react';
// import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Form, Select, Button, Input, notification, Checkbox, Space } from 'antd';
// import CompleteDataContext from '../Context';

// import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../../components/BreadCrumb';

import { addABranch } from '../../redux/actions/branches/branches.action';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/view-devices', name: 'Manage', id: 2 },
  { url: '/view-devices', name: 'View Devices', id: 3 },
  { url: '#', name: 'Add Device', id: 4 },
];

const { Option } = Select;

function AddBranches({ props, match }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const onSubmit = async (values) => {
    const client_id = searchParams.get('/client_id');
    console.log('This is client-id value', client_id);
    console.log('this is the AddBranches value =====================>>>>>>>', values)
    // window.location.href = `/view-branches?client_id=${values.client_id}`
    const request = await props.addABranch();
    if (request.fulfilled) {
      return notification.info({
        message: 'successful',
        description: request.message,
      });
    }
    return notification.error({
      message: 'failed',
      description: request.message,
    });
    // const request = await props.addABranch();
    // console.log('this is the values for AddBranch ==========>>>>>>>>>>>>>>>>>>>>>>>>>', request)
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>Branches</h1>

        <section className='cost-tracker-form-section'>
          <Form
            // className='cost-tracker-form'
            // action='#'
            // // onSubmit={handleSubmit(onSubmit)}
            // onFinish={onSubmit}

            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className='add-cclient-form-inputs-wrapper'> 

               {/* BRANCH NAME  */}
               <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Branch Name"
                  name="branchName"
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
                  name="officeAddress"
                  rules={[{ required: true, message: 'Please input an office address!' }]}
                >
                  <Input placeholder="Office Address" size="large" />
                </Form.Item>
              </div>

              {/* CLIENT NAME */}
              <div className='add-client-input-container'>
                <Form.Item
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label="Client's Name"
                  name="clientName"
                  rules={[{ required: true, message: 'Please input client name!' }]}
                >
                  <Input placeholder="Client's Name"/>
                </Form.Item>
              </div>
            </div>
            <div className='add-client-button-wrapper'>
              <button className='generic-submit-button'>
                Add Branch
              </button>
            </div>
          </Form>
        </section>
      </div> 
    </>
  );
}

const mapDispatchToProps = {
  addABranch
};

const mapStateToProps = (state) => ({
  branches: state.branches
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBranches);  
