<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Modal } from 'antd';
=======
import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Spin, Modal, Button  } from 'antd';
>>>>>>> Stashed changes

import BreadCrumb from '../../../components/BreadCrumb';
import ExcelIcon from '../../../components/icons/ExcelIcon';

import AdminBranchUsersViewTable from '../../../components/tables/adminTables/AdminBranchUsersViewTable';
import AdminBranchDevicesViewTable from '../../../components/tables/adminTables/AdminBranchDevicesViewTable';

import { connect } from 'react-redux';

import { getDevicesOverview } from '../../../redux/actions/devices/device.action';
import { getUsersOverview, updateUser } from '../../../redux/actions/users/user.action';
import { getABranch } from '../../../redux/actions/branches/branches.action';

import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

import UpdateUserForm from '../modal/UpdateUserForm';

const breadCrumbRoutes = [
    { url: '/', name: 'Home', id: 1 },
    { url: '#', name: 'Manage', id: 2 },
    { url: '#', name: 'View Organisation', id: 3 },
];

function ViewBranch(props) {
<<<<<<< Updated upstream

    const [searchParams] = useSearchParams();
    const [visibleUser, setVisibleUser] = useState(false);
    const [userData, setUserData] = useState({});
=======
    // const { setCurrentUrl } = useContext(CompleteDataContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [adminBranchUsersViewData, setAdminBranchUsersViewData] = useState([]);
    const [adminBranchDevicesViewData, setAdminBranchDevicesViewData] = useState([]);
    console.log("DEVICES OVERVIEW HERE>>>>>>>>>>", props.device);
    console.log("GET-A-BRANCH data here>>>>>>>>>>", props.branch);
    console.log("BRANCH data TOP here>>>>>>>>>>", props.branch.fetchedBranch);
    const [visible2, setVisible2] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
>>>>>>> Stashed changes

    useEffect(() => {
        const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
        const endDate = moment().format('DD-MM-YYYY HH:MM');

        const branch_id =searchParams.get("branch_id") || props.auth.userData.branch_id;

        props.getABranch(branch_id, startDate, endDate);
        props.getDevicesOverview(branch_id, startDate, endDate)
        props.getUsersOverview(branch_id)

    }, []);

    return (
        <>
            <div className='breadcrumb-and-print-buttons'>
                <BreadCrumb routesArray={breadCrumbRoutes} />
            </div>

            <article className='table-with-header-container h-no-mt'>
                <div className='table-header h-border-bottom'>
                    <div className='h-hidden-medium-down'>
                        <button type='button' className='table-header__left-button'>
                            CSV
                        </button>
                    </div>

                    <h3 className='table-header__heading'>{props.branches?.fetchedBranch[0]?.name}</h3>

                    <button
                        type='button'
                        className='table-header__right-button h-hidden-medium-down'
                    >
                        <ExcelIcon />
                        <span>Download in Excel</span>
                    </button>
                </div>
<<<<<<< Updated upstream
                <Spin spinning={props.branches?.fetchBranchLoading}>
                <div className="view_branch_top">
=======
                <Spin spinning={props.branch?.fetchBranchLoading}>
                <div className="view_branch_top view_branch_top_left">
>>>>>>> Stashed changes
                    <Row>
                        <Col md={8}>
                            <div>
                                <p className='view_branch-text'>Total Energy: <span>{props.branches?.fetchedBranch[0]?.total_energy.toFixed(2)}</span></p>
                                <p className='view_branch-text'>Baseline Score: <span>{props.branches?.fetchedBranch[0]?.baseline.toFixed(2)}</span></p>
                                <p className='view_branch-text'>Cost of Energy: <span> {props.branches?.fetchedBranch[0]?.energy_cost.toFixed(2)}</span></p>
                            </div>
                        </Col>
                        <Col md={8}>
                            <div>
                                <p className='view_branch-text'>Generator Efficiency: <span> {props.branches?.fetchedBranch[0]?.generator_efficiency.toFixed(2)}</span></p>
                                <p className='view_branch-text'>Fuel Efficiency: <span> {props.branches?.fetchedBranch[0]?.fuel_efficiency.toFixed(2)}</span></p>
                                <p className='view_branch-text'>PAPR: <span>{props.branches?.fetchedBranch[0]?.papr.toFixed(2)}</span></p>
                            </div>
                        </Col>
                    </Row>


                </div>
                </Spin>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Devices</h3>
                    </div>
                    {/* <AdminBranchDevicesViewTable listOfBranchesData={adminBranchDevicesViewData} /> */}
                    <AdminBranchDevicesViewTable 
                      loading= {props.devices?.fetchDeviceOverviewLoading}
                      listOfDevicesData={props.devices?.fetchedDeviceOverview} />
                </div>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Users</h3>
<<<<<<< Updated upstream
                    </div> 
    
=======
                    </div>
                    <Button type="primary" onClick={showModal}>
                      Open Modal
                    </Button>
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                      <p>Some contents...</p>
                    </Modal>    
    
                    {/* <AdminBranchUsersViewTable listOfBranchesData={adminBranchUsersViewData} /> */}
>>>>>>> Stashed changes
                    <AdminBranchUsersViewTable
                      loading= {props.user?.fetchUserOverviewLoading}
                      branchName={props.branches?.fetchedBranch[0]?.name}
                      listOfBranchUsersViewData={props.user?.fetchedUserOverview}
                      showUserModal={setVisibleUser}
                      setUserData={setUserData}
                    />
                      <Modal open={visibleUser}
                        onOk={() => setVisibleUser(false)}
                        onCancel={() => setVisibleUser(false)} width={1000} footer={null} >
                        <UpdateUserForm 
                          setModal={setVisibleUser}
                          userData={userData}
                        />
                      </Modal>
                </div>
            </article>

        </>
    );
}

const mapDispatchToProps = {
    getABranch,
    getDevicesOverview,
    getUsersOverview,
    updateUser
  }
  
  const mapStateToProps = (state) => ({
    branches: state.branches,
    auth: state.auth,
    devices: state.devices,
    user: state.user
  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranch)