import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Modal, Switch, notification, message } from 'antd';

import BreadCrumb from '../../../components/BreadCrumb';
import ExcelIcon from '../../../components/icons/ExcelIcon';

import AdminViewClientUsersTable from '../../../components/tables/adminTables/AdminViewClientUsersTable';

import { connect } from 'react-redux';

import { getUsersOverview, removeUser, updateUser } from '../../../redux/actions/users/user.action';
import { getClientUsersList } from '../../../redux/actions/users/user.action';
import { getABranch } from '../../../redux/actions/branches/branches.action';
import { getClients } from '../../../redux/actions/clients/client.action';

import moment from 'moment';
import { useSearchParams } from 'react-router-dom';

import UpdateUserForm from '../modal/UpdateUserForm';

const breadCrumbRoutes = [
    { url: '/', name: 'Home', id: 1 },
    { url: '#', name: 'Manage', id: 2 },
    { url: '#', name: 'View Client Users', id: 3 },
];

function ViewClientUsers(props) {

    const [searchParams] = useSearchParams();
    const [visibleUser, setVisibleUser] = useState(false);
    const [userData, setUserData] = useState({});
    const [userSwitch, setUserSwitch] = useState(false)
    const handleOkUser = async () => {
        const bodyParams = {
            branch: searchParams.get("branch_id")
        };
        const branch_id = searchParams.get("branch_id")
        const userId = userData.id;
        const request = await props.removeUser(userId, bodyParams);
        if (request.fulfilled) {
            setUserSwitch(false);
            notification.info({
                message: 'successful',
                description: request.message,
            });
            return props.getUsersOverview(branch_id)
        }
        return notification.error({
            message: 'failed',
            description: request.message,
        });
    }

    useEffect(() => {
        // const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
        // const endDate = moment().format('DD-MM-YYYY HH:MM');
        const client_id =  props.auth.userData.client_id;

        // props.getABranch(branch_id, startDate, endDate);
        // props.getDevicesOverview(branch_id)
        // props.getUsersOverview(branch_id);
        // props.getUsersOverview(branch_id);
        props.getClientUsersList(client_id);

    }, []);

    return (
        <>
            <div className='breadcrumb-and-print-buttons'>
                <BreadCrumb routesArray={breadCrumbRoutes} />
            </div>

            <article className='table-with-header-container h-no-mt'>
                <div className='table-header h-border-bottom'>
                    <div className='h-hidden-medium-down'>
                        {/* <button type='button' className='table-header__left-button'>
                            CSV
                        </button> */}
                    </div>

                    {/* <h3 className='table-header__heading'>{props.branches?.fetchedBranch[0]?.name}</h3> */}
                    <h3 className='table-header__heading'></h3>

                    {/* <button
                        type='button'
                        className='table-header__right-button h-hidden-medium-down'
                    >
                        <ExcelIcon />
                        <span>Download in Excel</span>
                    </button> */}
                </div>                
                <div className='h-overflow-auto'>
                    <div className='text-center'>
                        <h3 className='table-header__heading'>Users</h3>
                    </div>

                    <AdminViewClientUsersTable
                        loading={props.user?.fetchClientUserLoading}
                        // branchName={props.branches?.fetchedBranch[0]?.name}
                        listOfClientUsersData={props.user?.fetchedClientUser}

                        showUserModal={setVisibleUser}
                        setUserData={setUserData}
                        setUserSwitch={setUserSwitch}
                    />
                    <Modal open={visibleUser}
                        onOk={() => setVisibleUser(false)}
                        onCancel={() => setVisibleUser(false)} width={1000} footer={null} 
                    >
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
                        <h1>Are You Sure You Want To {userSwitch ? 'Disable' : 'Enable'} this User?</h1>
                        {userSwitch}
                    </Modal>
                </div>
            </article>

        </>
    );
}

const mapDispatchToProps = {
    // getABranch,
    getClientUsersList,
    getClients,
    // getUsersOverview,
    removeUser,
    updateUser,
}

const mapStateToProps = (state) => ({
    // branches: state.branches,
    auth: state.auth,
    user: state.user,
    client: state.client
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewClientUsers)