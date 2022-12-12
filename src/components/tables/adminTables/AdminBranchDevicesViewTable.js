import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class AdminBranchDevicesViewTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
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
                dataIndex: 'active',
                key: 'active',
                sorter: (a, b) => a.active - b.active,
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
                    onClick={() => console.log("RECORDS HERE..................",record)}
                    // onClick={() => window.location.href = `/view-branches?client_id=${record.client_id}`}
                  >
                    Edit
                  </button>
                ),
              },
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
}

export default AdminBranchDevicesViewTable;
