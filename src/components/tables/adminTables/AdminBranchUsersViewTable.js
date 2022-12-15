import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
// import listOfBranchUsersViewData from '../../../services/BranchUsersView-SampleData.json'

class AdminBranchUsersViewTable extends React.Component {
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
        const data = this.props.listOfBranchUsersViewData;
        const loading = this.props.loading;
        const openUserModal = this.props.setModal;
        const showUserModal = this.props.showUserModal;
        const setUserData = this.props.setUserData;

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
                title: 'Branch',
                dataIndex: 'branch',
                key: 'branch',
                sorter: (a, b) => a.branch - b.branch,
                sortDirections: ['descend', 'ascend'],
                render: (_, record) => (
                    <p>
                        {this.props.branchName}
                    </p>
                    
                )
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
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (_, record) => (
                    <button
                      type='button'
                      className='table-row-button branch-users-view-button'
                    //   onClick={() => console.log("RECORDS HERE..................",record)}
                      onClick={() => {
                        showUserModal(true)
                        setUserData(record)
                      }}
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

export default AdminBranchUsersViewTable;
