import React, { useState } from 'react';
import { Table, Dropdown, Switch, Modal} from 'antd';
import {  EditOutlined, DownOutlined } from '@ant-design/icons';

const AdminBranchDevicesViewTable = (props) => {
    const [switchModal, setSwitchModal] = useState(false)
    const data = props.listOfDevicesData;
    const loading = props.loading;
    const setVisibleDevice = props.setVisibleDevice;
    const setDeviceData = props.setDeviceData;
    const userRoletextData = props.userRoletextData
    const setDeviceSwitch = props.setDeviceSwitch
    const setCheckedStatus = props.setCheckedStatus
    const itemData = (record) => {
        return [
          {
            key: '1',
            label: (
              <>
                {userRoletextData === 'SUPERADMIN' ? 
                  [
                    <EditOutlined />,
                    <a target="_blank" onClick={(e) => {
                       e.preventDefault();
                       setVisibleDevice(true);
                       setDeviceData(record);
                     }} rel="noopener noreferrer">
                     Edit Device
                    </a>
                  ] : ''
                }
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
    
        },
    
    
      });

      const isActive = () => ({
        key: 'Status',
        title: 'Status',
        width: '10%',
        dataIndex: 'status',
        render: (_, record) => {
          return (
            <Switch  
                   onClick={() => {
                     setDeviceSwitch(true)
                     setDeviceData(record)
                   }}
                   onChange={(checked) => {
                     setCheckedStatus(checked)
                   }}
                  checked={record.is_active}
               />
          )
    
        },
    
    
      });


    const columns = [
        {
            title: 'Device Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Device Type',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a.type.localeCompare(b.type),
            sortDirections: ['descend', 'ascend'],
            render: (type) => (
              <p>
                  {props.deviceType.find((listOfDevice) => {
                    return listOfDevice.id === type
                  }).choice_name} 
              </p>

          )
        },
        {
            title: 'Device Identity',
            dataIndex: 'device_id',
            key: 'device_id',
            sorter: (a, b) => a.device_id.localeCompare(b.device_id),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            sorter: (a, b) => a.branch - b.branch,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Generator Size',
            dataIndex: 'gen_size',
            key: 'gen_size',
            sorter: (a, b) => a.gen_size - b.gen_size,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Fuel Type',
            dataIndex: 'fuel_type',
            key: 'fuel_type',
            sorter: (a, b) => a.fuel_type - b.fuel_type,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
            sorter: (a, b) => a.is_active - b.is_active,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Start of Operating Hours',
            dataIndex: 'operating_hours_start',
            key: 'operating_hours_start',
            sorter: (a, b) => a.operating_hours_start - b.operating_hours_start,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'End of Operating Hours',
            dataIndex: 'operating_hours_end',
            key: 'operating_hours_end',
            sorter: (a, b) => a.operating_hours_end - b.operating_hours_end,
            sortDirections: ['descend', 'ascend'],
        },
        (userRoletextData === 'SUPERADMIN' ? optionsColumn() : {}),
        (userRoletextData === 'SUPERADMIN' ? isActive() : {})
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

export default AdminBranchDevicesViewTable;
