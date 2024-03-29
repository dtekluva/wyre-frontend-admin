import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Modal, notification } from 'antd';

import BreadCrumb from '../../../components/BreadCrumb';

import AdminBranchUsersViewTable from '../../../components/tables/adminTables/AdminBranchUsersViewTable';
import AdminBranchDevicesViewTable from '../../../components/tables/adminTables/AdminBranchDevicesViewTable';
import AdminBranchEnergyStatsViewTable from '../../../components/tables/adminTables/AdminBranchEnergyStatsViewTable';

import { connect, useSelector } from 'react-redux';

import { disableDevice, getDevicesOverview, getDeviceTypes } from '../../../redux/actions/devices/device.action';
import { disableUser, getUsersOverview, removeUser, updateUser } from '../../../redux/actions/users/user.action';
import { getABranch, getABranchEnergyStats } from '../../../redux/actions/branches/branches.action';

import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

import UpdateUserForm from '../modal/UpdateUserForm';
import UpdateDeviceForm from '../modal/UpdateDeviceForm';



function ViewBranch(props) {

    const [searchParams] = useSearchParams();
    const [visibleUser, setVisibleUser] = useState(false);
    const [visibleDevice, setVisibleDevice] = useState(false);
    const [userData, setUserData] = useState({});
    const [deviceData, setDeviceData] = useState({});
    const [deviceSwitch, setDeviceSwitch] = useState(false);
    const [userSwitch, setUserSwitch] = useState(false);
    const [chechedStatus, setCheckedStatus] = useState(null);
    const [dateChange, setDateChange] = useState(false);

    const branch_id_ = searchParams.get("branch_id") || props.auth.deviceData.branch_id;
    const breadCrumbRoutes = [
        { url: '/', name: 'Home', id: 1 },
        { url: '#', name: 'View Branch', id: 2 },
    ];

    const headers = useSelector((state) => state.headers);

    const handleOkDevice = async () => {
        const bodyParams = {
            is_active: chechedStatus
        }
        const branch_id = searchParams.get("branch_id") || props.auth.deviceData.branch_id;
        const device_id = deviceData.id;
        const request = await props.disableDevice(device_id, bodyParams);
        if (request.fulfilled) {
            setDeviceSwitch(false);
            notification.info({
                message: 'successful',
                description: request.message,
            });
            return props.getDevicesOverview(branch_id);
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });
    }

    const handleOkUser = async () => {
        const bodyParams = {
            branch: searchParams.get("branch_id")
        };
        const branch_id = searchParams.get("branch_id");
        const userId = userData.id;
        const request = await props.removeUser(userId, bodyParams);
        if (request.fulfilled) {
            setUserSwitch(false);
            notification.info({
                message: 'successful',
                description: request.message,
            });
            return props.getUsersOverview(branch_id);
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });
    }

    const userRoletextData = props.auth.userData.role_text;

    useEffect(() => {
        // const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
        // const endDate = moment().format('DD-MM-YYYY HH:MM');

        const defaultDataValue =  moment(headers.selectedDate, 'DD-MM-YYYY');
        const startDate = defaultDataValue.startOf('month').format('DD-MM-YYYY HH:mm');
        const endDate = defaultDataValue.endOf('month').format('DD-MM-YYYY HH:mm');

        const branch_id = searchParams.get("branch_id") || props.auth.deviceData.branch_id;

        if (dateChange !== headers.selectedDate) {
            setDateChange(headers.selectedDate);
            props.getABranch(branch_id, startDate, endDate);
        }

        if (!props.devices.fetchedDeviceType) {
            props.getDeviceTypes(branch_id);
        }
        props.getDevicesOverview(branch_id);
        props.getUsersOverview(branch_id);
        props.getABranchEnergyStats(branch_id, startDate, endDate);

    }, [headers.selectedDate]);

    return (
        <>
            <div className='breadcrumb-and-print-buttons'>
                <BreadCrumb routesArray={breadCrumbRoutes} />
            </div>

            <article className='table-with-header-container h-no-mt'>
                <div className='table-header h-border-bottom'>
                    {/* <div className='h-hidden-medium-down'>
                        <button type='button' className='table-header__left-button'>
                            CSV
                        </button>
                    </div> */}

                    <h3 className='table-header__heading'>{props.branches?.fetchedBranch[0]?.name}</h3>

                    {/* <button
                        type='button'
                        className='table-header__right-button h-hidden-medium-down'
                    >
                        <ExcelIcon />
                        <span>Download in Excel</span>
                    </button> */}
                </div>
                <Spin spinning={props.branches?.fetchBranchLoading}>
                    <div className="view_branch_top">
                        <Row>
                            <Col md={8}>
                                <div>
                                    <p className='view_branch-text'>Total Energy: <span>{props.branches?.fetchedBranch[0]?.total_energy.toFixed(2)}</span></p>
                                    {/* <p className='view_branch-text'>Baseline Score: <span>{props.branches?.fetchedBranch[0]?.baseline.toFixed(2)}</span></p> */}
                                    <p className='view_branch-text'>Cost of Energy: <span> {props.branches?.fetchedBranch[0]?.energy_cost.toFixed(2)}</span></p>
                                    {/* <p className='view_branch-text'>Generator Efficiency: <span> {props.branches?.fetchedBranch[0]?.generator_efficiency.toFixed(2)}</span></p> */}
                                </div>
                            </Col>
                            <Col md={8}>
                                <div>
                                    <p className='view_branch-text'>Fuel Efficiency: <span> {props.branches?.fetchedBranch[0]?.fuel_efficiency.toFixed(2)}</span></p>
                                    <p className='view_branch-text'>PAPR: <span>{props.branches?.fetchedBranch[0]?.papr?.toFixed(2)}</span></p>
                                </div>
                            </Col>
                        </Row>


                    </div>
                </Spin>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Devices</h3>
                    </div>
                    <AdminBranchDevicesViewTable
                        loading={props.devices?.fetchDeviceOverviewLoading}
                        listOfDevicesData={props.devices?.fetchedDeviceOverview}
                        deviceType={props.devices?.fetchedDeviceType}
                        setVisibleDevice={setVisibleDevice}
                        setDeviceData={setDeviceData}
                        setDeviceSwitch={setDeviceSwitch}
                        setCheckedStatus={setCheckedStatus}
                        userRoletextData={userRoletextData}
                    />
                    <Modal open={visibleDevice}
                        onOk={() => setVisibleDevice(false)}
                        onCancel={() => setVisibleDevice(false)} width={1000} footer={null} >
                        <UpdateDeviceForm
                            setModal={setVisibleDevice}
                            deviceData={deviceData}
                        />
                    </Modal>

                    <Modal
                        open={deviceSwitch}
                        onOk={handleOkDevice}
                        onCancel={() => setDeviceSwitch(false)}
                    >
                        <h1>Are Sure You Want To {deviceSwitch ? 'Enable' : 'Disable'} this Device?</h1>
                        {deviceSwitch}
                    </Modal>
                </div>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Users</h3>
                    </div>

                    <AdminBranchUsersViewTable
                        loading={props.user?.fetchUserOverviewLoading}
                        branchName={props.branches?.fetchedBranch[0]?.name}
                        listOfBranchUsersViewData={props.user?.fetchedUserOverview}
                        showUserModal={setVisibleUser}
                        setUserData={setUserData}
                        setUserSwitch={setUserSwitch}
                        userRoletextData={userRoletextData}
                    />
                    <Modal open={visibleUser}
                        onOk={() => setVisibleUser(false)}
                        onCancel={() => setVisibleUser(false)} width={1000} footer={null} >
                        <UpdateUserForm
                            setModal={setVisibleUser}
                            userData={userData}
                        />
                    </Modal>
                    <Modal
                        open={userSwitch}
                        onOk={handleOkUser}
                        onCancel={() => setUserSwitch(false)}
                    >
                        <h1>Are You Sure You Want To {userSwitch ? 'Enable' : 'Disable'} this User?</h1>
                        {userSwitch}
                    </Modal>
                </div>
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Energy Stats</h3>
                    </div>

                    <AdminBranchEnergyStatsViewTable
                        loading={props.branches?.fetchBranchEnergyStatsLoading}
                        listOfBranchEnergyStatsViewData={props.branches?.fetchedBranchEnergyStats}
                    />
                    
                    
                </div>
            </article>

        </>
    );
}

const mapDispatchToProps = {
    getABranch,
    getABranchEnergyStats,
    getDevicesOverview,
    getDeviceTypes,
    disableDevice,
    getUsersOverview,
    removeUser,
    // disableUser,
    updateUser,
}

const mapStateToProps = (state) => ({
    branches: state.branches,
    auth: state.auth,
    devices: state.devices,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranch)