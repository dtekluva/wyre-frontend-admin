import React from 'react';
<<<<<<< Updated upstream
import { Table, Dropdown} from 'antd';
import {  EditOutlined, DownOutlined } from '@ant-design/icons';
=======
import { Table, Input, Button, Space, Switch } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
>>>>>>> Stashed changes

const AdminBranchDevicesViewTable = (props) => {

    const data = props.listOfDevicesData;
    const loading = props.loading;
    const setVisibleDevice = props.setVisibleDevice;
    const setDeviceData = props.setDeviceData;
    const itemData = (record) => {
        return [
          {
            key: '1',
            label: (
              <>
                <EditOutlined />
                <a target="_blank" onClick={(e) => {
                  e.preventDefault();
                  setVisibleDevice(true);
                  setDeviceData(record);
                }} rel="noopener noreferrer">
                  Edit Branch
                </a>
              </>
    
            ),
<<<<<<< Updated upstream
          },
=======
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        // const data = this.props.listOfBranchDevicesViewData;
        const data = this.props.listOfDevicesData;
        const loading = this.props.loading;
        const setVisibleDevice = this.props.setVisibleDevice;
        const setDeviceData = this.props.setDeviceData;
        const onChange = (checked= true) => {
            console.log(`switch to ${checked}`);
          };
        // console.log(setDeviceData);

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
            {
                title: 'Action',
                key: 'key',
                dataIndex: 'key',
                render: (_, record) => (
                  <button
                    type='button'
                    className='table-row-button branch-users-view-button'
                    // onClick={() => console.log("RECORDS HERE..................",record)}
                    onClick={() => {
                        setVisibleDevice(true)
                        setDeviceData(record)
                    }
                    }
                    // onClick={() => window.location.href = `/view-branches?client_id=${record.client_id}`}
                  >
                    Edit
                  </button>
                ),
              },
              {
                title: 'Status',
                key: 'key',
                dataIndex: 'key',
                render: (_, record) => (
                  <button
                    type='button'
                    className='table-row-button branch-users-view-button'
                    onClick={() => console.log("RECORDS HERE..................",record)}
                  >
                    <Switch defaultChecked />
                  </button>
                ),
              },
>>>>>>> Stashed changes
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
        optionsColumn()
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
