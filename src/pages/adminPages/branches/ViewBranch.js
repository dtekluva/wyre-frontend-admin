import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Spin } from 'antd';

import BreadCrumb from '../../../components/BreadCrumb';
import ExcelIcon from '../../../components/icons/ExcelIcon';

import AdminBranchUsersViewTable from '../../../components/tables/adminTables/AdminBranchUsersViewTable';
import AdminBranchDevicesViewTable from '../../../components/tables/adminTables/AdminBranchDevicesViewTable';

import { connect } from 'react-redux';
import { getBranches, getBranchesTop } from '../../../redux/actions/branches/branches.action';
import { getDevicesOverview } from '../../../redux/actions/devices/device.action';
import { getUsersOverview } from '../../../redux/actions/users/user.action';
import { getABranch } from '../../../redux/actions/branch/branch.action';

import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

const breadCrumbRoutes = [
    { url: '/', name: 'Home', id: 1 },
    { url: '#', name: 'Manage', id: 2 },
    { url: '#', name: 'View Organisation', id: 3 },
];

function ViewBranch(props) {
    // const { setCurrentUrl } = useContext(CompleteDataContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [adminBranchUsersViewData, setAdminBranchUsersViewData] = useState([]);
    const [adminBranchDevicesViewData, setAdminBranchDevicesViewData] = useState([]);
    console.log("DEVICES OVERVIEW HERE>>>>>>>>>>", props.device);
    console.log("GET-A-BRANCH data here>>>>>>>>>>", props.branch);
    console.log("BRANCH data TOP here>>>>>>>>>>", props.branch.fetchedBranch);

    useEffect(() => {
        const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
        const endDate = moment().format('DD-MM-YYYY HH:MM');

        // const client_id =searchParams.get("client_id") || props.auth.userData.client_id;
        const branch_id =searchParams.get("branch_id") || props.auth.userData.branch_id;

        // props.getBranches(branch_id, startDate, endDate);
        // props.getBranchesTop(branch_id, startDate, endDate)
        props.getABranch(branch_id, startDate, endDate);
        props.getDevicesOverview(branch_id, startDate, endDate)
        props.getUsersOverview(branch_id, startDate, endDate)
        // const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
        // const endDate = moment().format('DD-MM-YYYY HH:MM');
        // props.getBranches(client_id, startDate, endDate);
        // const client_id =searchParams.get("client_id") || props.auth.userData.client_id;
        // const branch_id =searchParams.get("branch_id") || props.auth.userData.client_id.branch_id
        // console.log('This is client-id value', client_id);
        
    //     if (match && match.url) {
    //         setCurrentUrl(match.url);
    //     }
    // }, [match, setCurrentUrl]);

    // useEffect(() => {
    //     adminHttpServices.getAll('branchusersview').then((returnedData) => {
    //         setAdminBranchUsersViewData(returnedData);
    //     });
    //     adminHttpServices.getAll('branchdevicesview').then((returnedData) => {
    //         setAdminBranchDevicesViewData(returnedData);
    //     });
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

                    <h3 className='table-header__heading'>Richmond Gate</h3>

                    <button
                        type='button'
                        className='table-header__right-button h-hidden-medium-down'
                    >
                        <ExcelIcon />
                        <span>Download in Excel</span>
                    </button>
                </div>
                <Spin spinning={props.branch?.fetchBranchLoading}>
                <div className="view_branch_top">
                    <Row>
                        <Col md={8}>
                            <div>
                                <p className='view_branch-text'>Total Energy: <span>{props.branch?.fetchedBranch[0]?.total_energy.toFixed(2)}</span></p>
                                <p className='view_branch-text'>Baseline Score: <span>{props.branch?.fetchedBranch[0]?.baseline.toFixed(2)}</span></p>
                                <p className='view_branch-text'>Cost of Energy: <span> {props.branch?.fetchedBranch[0]?.energy_cost.toFixed(2)}</span></p>
                            </div>
                        </Col>
                        <Col md={8}>
                            <div>
                                <p className='view_branch-text'>Generator Efficiency: <span> {props.branch?.fetchedBranch[0]?.generator_efficiency.toFixed(2)}</span></p>
                                <p className='view_branch-text'>Fuel Efficiency: <span> {props.branch?.fetchedBranch[0]?.fuel_efficiency.toFixed(2)}</span></p>
                                <p className='view_branch-text'>PAPR: <span>{props.branch?.fetchedBranch[0]?.papr.toFixed(2)}</span></p>
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
                      loading= {props.device?.fetchDeviceOverviewLoading}
                      listOfDevicesData={props.device?.fetchedDeviceOverview} />
                </div>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Users</h3>
                    </div>
                    {/* <AdminBranchUsersViewTable listOfBranchesData={adminBranchUsersViewData} /> */}
                    <AdminBranchUsersViewTable
                      loading= {props.user?.fetchUserOverviewLoading}
                      listOfBranchUsersViewData={props.user?.fetchedUserOverview} />
                </div>
            </article>

        </>
    );
}

const mapDispatchToProps = {
    getABranch,
    getBranches,
    getBranchesTop,
    getDevicesOverview,
    getUsersOverview
  }
  
  const mapStateToProps = (state) => ({
    branch: state.branch,
    branches: state.branches,
    auth: state.auth,
    device: state.device,
    user: state.user
  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranch)