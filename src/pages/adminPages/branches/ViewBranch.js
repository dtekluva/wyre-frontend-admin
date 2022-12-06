import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'antd';

import BreadCrumb from '../../../components/BreadCrumb';
import ExcelIcon from '../../../components/icons/ExcelIcon';

import AdminBranchUsersViewTable from '../../../components/tables/adminTables/AdminBranchUsersViewTable';
import AdminBranchDevicesViewTable from '../../../components/tables/adminTables/AdminBranchDevicesViewTable';

import { connect } from 'react-redux';
// import { getBranch } from '../../../redux/actions/branch/branch.action';
import { getDevices } from '../../../redux/actions/devices/device.action';

import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

const breadCrumbRoutes = [
    { url: '/', name: 'Home', id: 1 },
    { url: '#', name: 'Manage', id: 2 },
    { url: '#', name: 'View Organisation', id: 3 },
];

function ViewBranch() {
    // const { setCurrentUrl } = useContext(CompleteDataContext);
    // const [searchParams, setSearchParams] = useSearchParams();
    const [adminBranchUsersViewData, setAdminBranchUsersViewData] = useState([]);
    const [adminBranchDevicesViewData, setAdminBranchDevicesViewData] = useState([]);

    useEffect(() => {
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
                <div className="view_branch_top">
                    <Row>
                        <Col md={8}>
                            <div>
                                <p className='view_branch-text'>Total Energy: <span> 200.01KWh</span></p>
                                <p className='view_branch-text'>Baseline Score: <span> 200.01KWh</span></p>
                                <p className='view_branch-text'>Cost of Energy: <span> 200.01KWh</span></p>
                            </div>
                        </Col>
                        <Col md={8}>
                            <div>
                                <p className='view_branch-text'>Generator Efficiency: <span> 200.01KWh</span></p>
                                <p className='view_branch-text'>Fuel Efficiency: <span> 200.01KWh</span></p>
                                <p className='view_branch-text'>PAPR: <span> 200.01KWh</span></p>
                            </div>
                        </Col>
                    </Row>


                </div>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Devices</h3>
                    </div>
                    <AdminBranchDevicesViewTable listOfBranchesData={adminBranchDevicesViewData} />
                    {/* <AdminBranchDevicesViewTable 
                      loading= {props.devices?.fetchDeviceLoading}
                      listOfBranchesData={props.devices?.fetchedDevice} /> */}
                </div>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Users</h3>
                    </div>
                    <AdminBranchUsersViewTable
                      loading= {''}
                     listOfBranchesData={adminBranchUsersViewData} />
                </div>
            </article>

        </>
    );
}

const mapDispatchToProps = {
    // getBranch,
    getDevices
  }
  
  const mapStateToProps = (state) => ({
    // branch: state.branch,
    branches: state.branches,
    auth: state.auth,
    devices: state.devices
  });

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranch)