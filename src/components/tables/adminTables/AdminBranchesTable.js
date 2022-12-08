import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class AdminBranchesTable extends React.Component {
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
    const data = this.props.listOfBranchesData;
    const loading = this.props.loading;

    const columns = [
      {
        title: 'Branch Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Organisation',
        dataIndex: 'organisation',
        key: 'organisation',
        ...this.getColumnSearchProps('organisation'),
        sorter: (a, b) => a.organisation.localeCompare(b.organisation),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Total Energy [kwh]',
        dataIndex: 'total_energy',
        key: 'total_energy',
        ...this.getColumnSearchProps('total_energy'),
        sorter: (a, b) => a.total_energy - b.total_energy,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Baseline Score',
        dataIndex: 'baseline',
        key: 'baseline',
        ...this.getColumnSearchProps('baseline'),
        sorter: (a, b) => a.baseline - b.baseline,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Cost Of Energy',
        dataIndex: 'energy_cost',
        key: 'energy_cost',
        ...this.getColumnSearchProps('energy_cost'),
        sorter: (a, b) => a.energy_cost - b.energy_cost,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'PAPR',
        dataIndex: 'papr',
        key: 'papr',
        ...this.getColumnSearchProps('papr'),
        sorter: (a, b) => a.papr - b.papr,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Generator Efficiency',
        dataIndex: 'generator_efficiency',
        key: 'generator_efficiency',
        ...this.getColumnSearchProps('generator_efficiency'),
        sorter: (a, b) => a.generator_efficiency - b.generator_efficiency,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Fuel Efficiency',
        dataIndex: 'fuel_efficiency',
        key: 'fuel_efficiency',
        ...this.getColumnSearchProps('fuel_efficiency'),
        sorter: (a, b) => a.fuel_efficiency - b.fuel_efficiency,
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
            onClick={() => window.location.href = `/view-branch?branch_id=${record.branch_id}`}
          >
            View
          </button>
        ),
      },
    ];

    return (
      <>
        <Table
          className='table-striped-rows'
          size='large'
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={false}
          footer={() => ``}
        />
      </>
    );
  }
}

export default AdminBranchesTable;
