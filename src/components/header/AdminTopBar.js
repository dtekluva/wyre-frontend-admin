import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import AddDeviceForm from '../../pages/adminPages/modal/AddDeviceForm';
import AddBranchForm from '../../pages/adminPages/modal/AddBranchForm';
import AddUserForm from '../../pages/adminPages/modal/AddUserForm';
import AddUserToBranchForm from '../../pages/adminPages/modal/AddUserToBranchForm';

import { getAllRoles } from '../../redux/actions/auth/auth.action';
const isSidebarOpen = false;
function AdminTopBar(props) {
  // modal functions for add user form and add device form starts 
  const [visible, setVisible] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);
  const [visibleUserBranch, setVisibleUserBranch] = useState(false);
  const [visibleBranch, setVisibleBranch] = useState(false);
  const [isTopBarAdminDeviceRightDisplayedDevice, setIsTopBarAdminDeviceRightDisplayedDevice] = useState(false);
  const [isTopBarAdminDeviceLeftDisplayed, setIsTopBarAdminDeviceLeftDisplayed] = useState(false);
  const [isTopBarAdminDeviceRightDisplayedUser, setIsTopBarAdminDeviceRightDisplayedUser] = useState(false);
  const [isTopBarAdminOrganisationRightDisplayed, setIsTopBarAdminOrganisationRightDisplayed] = useState(false);
  const [isTopBarAdminClientUsersLeftDisplayed, setIsTopBarAdminClientUsersLeftDisplayed] = useState(false);
  const [isTopBarAdminUserBranchRightDisplayed, setIsTopBarAdminUserBranchRightDisplayed] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (!props.auth.fetchedRoles) {
      props.getAllRoles();
    }
    const locationPathName = location.pathname;
    setIsTopBarAdminDeviceRightDisplayedDevice(locationPathName === ('/view-branch'));
    setIsTopBarAdminOrganisationRightDisplayed(locationPathName === '/' && props.auth.userData.role_text === 'SUPERADMIN');
    setIsTopBarAdminClientUsersLeftDisplayed(locationPathName === '/' && props.auth.userData.role_text === 'SUPERADMIN');
    setIsTopBarAdminUserBranchRightDisplayed(locationPathName === ('/view-branch'));
    setIsTopBarAdminDeviceLeftDisplayed(locationPathName.includes('view-branches'));
    setIsTopBarAdminDeviceRightDisplayedUser(props.auth.userData.role_text === 'SUPERADMIN' || props.auth.userData.role_text === 'CLIENT_ADMIN');
  }, [location.pathname])

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
        <div className={isTopBarAdminClientUsersLeftDisplayed ? '.top-bar__left' : '.top-bar__left h-hide'}>
          <div className="search_input-wrapper">
            <Input className='search___input' placeholder="Branches" prefix={<SearchOutlined />} />
          </div>
        </div>
        <div></div>

        {/* <div
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


        </div> */}

        <div
          className={
            isTopBarAdminDeviceRightDisplayedUser
              ? 'top-bar__right'
              : 'top-bar__right h-hide'
          }
        >
          {isTopBarAdminOrganisationRightDisplayed && <Link className='top-bar-right__button h-extra-padding' to='/add-clients' >
                Add Client
              </Link>
          }
          {isTopBarAdminClientUsersLeftDisplayed && <Link className='top-bar-right__button h-extra-padding' to='/view-client-users' >
                View Client Users
              </Link>
          }
          {isTopBarAdminDeviceLeftDisplayed && <Link
            className='top-bar-right__button h-extra-padding'
            // to='/add-devices'
            onClick={(e) => {
              e.preventDefault()
              setVisibleBranch(true)
            }}
          >
            Add Branch
          </Link>
          }
          {isTopBarAdminDeviceRightDisplayedDevice && <Link
            className='top-bar-right__button h-extra-padding'
            // to='/add-devices'
            onClick={(e) => {
              e.preventDefault()
              setVisible(true)
            }}
          >
            Add Device
          </Link>
          }
          <Link
            className='top-bar-right__button h-extra-padding'
            onClick={() => setVisibleUser(true)}
          >
            Add User
          </Link>
          {isTopBarAdminUserBranchRightDisplayed && <Link
            className='top-bar-right__button h-extra-padding'
            // to='/add-devices'
            onClick={(e) => {
              e.preventDefault()
              setVisibleUserBranch(true)
            }}
          >
            Add User To Branch
          </Link>
          }
          {/* <Link
            className='top-bar-right__button h-extra-padding'
            onClick={() => setVisible(true)}
          >
            Add Device
          </Link> */}
        </div>
      </div>
      {/* Add Device Form modal  */}
      <Modal open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)} width={1000} footer={null} >
        <AddDeviceForm setModal={setVisible} />
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
      <Modal open={visibleUser}
        onOk={() => setVisibleUser(false)}
        onCancel={() => setVisibleUser(false)} width={1000} footer={null} >
        <AddUserForm setVisibleBranch={setVisibleUser} />
      </Modal>

      {/* Add User To Branch Form modal  */}
      <Modal open={visibleUserBranch}
        onOk={() => setVisibleUserBranch(false)}
        onCancel={() => setVisibleUserBranch(false)} width={1000} footer={null} >
        <AddUserToBranchForm setVisibleUserBranch={setVisibleUserBranch} />
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  getAllRoles
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTopBar);
