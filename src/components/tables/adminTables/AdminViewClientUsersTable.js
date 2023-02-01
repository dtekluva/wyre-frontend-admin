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
    
        }
    
    
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
            title: 'Phone Number',
            dataIndex: 'phone_number',
            key: 'phone_number',
            sorter: (a, b) => a.phone_number.localeCompare(b.phone_number),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email - b.email,
            sortDirections: ['descend', 'ascend'],
        },
        
        optionsColumn(),
        // isActive()
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
