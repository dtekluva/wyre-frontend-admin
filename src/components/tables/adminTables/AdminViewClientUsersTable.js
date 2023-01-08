import React, { useState } from 'react';
import { Table, Dropdown, Switch } from 'antd';

import { DownOutlined, EditOutlined } from '@ant-design/icons';

const AdminViewClientUsersTable = (props) => {

    const data = props.listOfClientUsersData; 
    const loading = props.loading;
    const showUserModal = props.showUserModal;
    const setUserData = props.setUserData;
    const setUserSwitch = props.setUserSwitch;
    const setUserCheckedStatus = props.setUserCheckedStatus;

    const itemData = (record) => {
        return [
            {
                key: '1',
                label: (
                    <>
                        <EditOutlined />
                        <a target="_blank" onClick={(e) => {
                            e.preventDefault();
                            showUserModal(true);
                            setUserData(record);
                        }} rel="noopener noreferrer">
                            Edit User
                        </a>
                    </>

                ),
            },
        ];
    }

    const optionsColumn = () => ({
        key: 'options',
        title: 'Options',
        width: '10%',
        dataIndex: 'options',
        render: (_, record) => {
            const items = itemData(record);
            return (
                <Dropdown
                    trigger={['click']}
                    getPopupContainer={(trigger) => trigger.parentElement}
                    placement="bottom"
                    menu={{
                        items
                    }}
                >
                    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        More
                        {' '}
                        <DownOutlined />
                    </a>
                </Dropdown>
            )

        }


    });

    const isActive = () => ({
        key: 'Status',
        title: 'Status',
        width: '10%',
        dataIndex: 'status',
        render: (_, record) => {
          return (
            <Switch defaultChecked onClick={() => {
                setUserSwitch(true)
                setUserData(record)
            }} />
          )
    
        },
    
    
    });

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'first_name',
            sorter: (a, b) => a.first_name.localeCompare(b.first_name),
            sortDirections: ['descend', 'ascend'],
            render: (_, record) => (
                <p>
                    {`${record.first_name}  ${record.last_name}`}
                </p>

            )
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email Address',
            dataIndex: 'email_address',
            key: 'email_address',
            sorter: (a, b) => a.email_address - b.email_address,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            key: 'last_login',
            sorter: (a, b) => a.last_login - b.last_login,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Date Added',
            dataIndex: 'date_joined',
            key: 'date_joined',
            sorter: (a, b) => a.date_joined - b.date_joined,
            sortDirections: ['descend', 'ascend'],
        },
        optionsColumn(),
        isActive()
    ];

    return (
        <>
            <Table
                className='table-striped-rows'
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey={(record) => record.id}
                pagination={false}
                footer={() => ``}
            />
        </>
    );
}

export default AdminViewClientUsersTable;
