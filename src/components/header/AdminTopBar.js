import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Button, Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import AddDeviceForm from '../../pages/adminPages/modal/AddDeviceForm';
import AddBranchForm from '../../pages/adminPages/modal/AddBranchForm';
import AddUserForm from '../../pages/adminPages/modal/AddUserForm';
const isSidebarOpen = false;
function AdminTopBar(props) {
  // modal functions for add user form and add device form starts 
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visibleBranch, setVisibleBranch] = useState(false);
  const [isTopBarAdminDeviceRightDisplayed, setIsTopBarAdminDeviceRightDisplayed] = useState(false);
  const [isTopBarAdminDeviceLeftDisplayed, setIsTopBarAdminDeviceLeftDisplayed] = useState(false);
  const [isTopBarAdminDeviceRightDisplayed3, setIsTopBarAdminDeviceRightDisplayed3] = useState(false);
  const [isTopBarAdminOrganisationRightDisplayed, setIsTopBarAdminOrganisationRightDisplayed] = useState(false);
  const location = useLocation()
  // modal functions ends 

  // const { isSidebarOpen, currentUrl } = useContext(CompleteDataContext);
  // const currentUrl = ['view-client'];

  useEffect(() => {
    const locationPathName = location.pathname;
    setIsTopBarAdminDeviceRightDisplayed(locationPathName.includes('view-devices'));
    setIsTopBarAdminOrganisationRightDisplayed(locationPathName === '/' && props.auth.userData.role_text === 'SUPERADMIN');
    setIsTopBarAdminDeviceLeftDisplayed(locationPathName.includes('view-branches'));
    setIsTopBarAdminDeviceRightDisplayed3(locationPathName.includes('view-branch') && !locationPathName.includes('view-branches'));
  }, [])

  // const isTopBarAdminDeviceLeftDisplayed = currentUrl.includes('view-branches');
  // const isTopBarAdminDeviceLeftDisplayed = currentUrl.includes('view-branches');
  // const isTopBarAdminDeviceRightDisplayed3 = currentUrl.includes('view-branch');


  const isTopBarDisplayed = !location.pathname.includes('hide-top-bar');

  return (
    <div className={isTopBarDisplayed ? 'displayed' : 'h-hidden-medium-up'}>
      <div
        className={isSidebarOpen ? 'top-bar' : 'top-bar h-hidden-medium-down'}
      >
        <div className={isTopBarAdminDeviceLeftDisplayed ? '.top-bar__left' : '.top-bar__left h-hide'}>
          <div className="search_input-wrapper">
            <Input className='search___input' placeholder="Branches" prefix={<SearchOutlined />} />
          </div>
        </div>
        <div></div>

        <div
          className={
            isTopBarAdminOrganisationRightDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          {
            props.auth.userData.role_text === 'SUPERADMIN' && (
              <Link className='top-bar-right__button h-extra-padding' to='/add-clients' >
                Add Client
              </Link>
            )
          }


        </div>

        <div
          className={
            isTopBarAdminDeviceRightDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            to='/add-devices'
          >
            Add Device
          </Link>
        </div>
        <div
          className={
            isTopBarAdminDeviceLeftDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            to='/compare-branches'
          >
            Compare
          </Link>
          {
            (
              <Link
                className='top-bar-right__button h-extra-padding'
                onClick={(e) => 
                  {
                    e.preventDefault()
                    setVisibleBranch(true) }}
              >
                Add Branch
              </Link>
            )
          }

        </div>
        {/* <div
          className={
            isTopBarAdminDeviceLeftDisplayed
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            onClick={() => setVisible2(true)}
          >
            Add Branch
          </Link>
        </div> */}
        <div
          className={
            isTopBarAdminDeviceRightDisplayed3
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          <Link
            className='top-bar-right__button h-extra-padding'
            onClick={() => setVisible2(true)}
          >
            Add User
          </Link>
          <Link
            className='top-bar-right__button h-extra-padding'
            onClick={() => setVisible(true)}
          >
            Add Device
          </Link>
        </div>
      </div>
      {/* Add Device Form modal  */}
      <Modal open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)} width={1000} footer={null} >
        <AddDeviceForm />
      </Modal>
      {/* Add Branches Form modal  */}
      <Modal open={visibleBranch}
        onOk={() => setVisibleBranch(false)}
        onCancel={() => setVisibleBranch(false)} 
        width={1000} footer={null} 
        >
        <AddBranchForm setModal={setVisibleBranch} />
      </Modal>

      {/* Add User Form modal  */}
      <Modal open={visible2}
        onOk={() => setVisible2(false)}
        onCancel={() => setVisible2(false)} width={1000} footer={null} >
        <AddUserForm />
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AdminTopBar);
