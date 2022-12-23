import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class AdminOverviewTable extends React.Component {
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
    const data = this.props.overviewListData;
    const loading = this.props.loading;
    const setvisibleClient = this.props.setvisibleClient
    const setClientData = this.props.setClientData

    const columns = [
      {
        title: 'Company Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Total Energy (kWh)',
        dataIndex: 'total_energy',
        key: 'total_energy',
        ...this.getColumnSearchProps('total_energy'),
        sorter: (a, b) => a.total_energy - b.total_energy,
        sortDirections: ['descend', 'ascend'],
      },
      // {
      //   title: 'Maximum Demand (kW)',
      //   dataIndex: 'max_demand',
      //   key: 'max_demand',
      //   ...this.getColumnSearchProps('max_demand'),
      //   sorter: (a, b) => a.max_demand - b.max_demand,
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Minimum Demand (kW)',
      //   dataIndex: 'min_demand',
      //   key: 'min_demand',
      //   ...this.getColumnSearchProps('min_demand'),
      //   sorter: (a, b) => a.min_demand - b.min_demand,
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Average Demand (kW)',
      //   dataIndex: 'avg_demand',
      //   key: 'avg_demand',
      //   ...this.getColumnSearchProps('avg_demand'),
      //   sorter: (a, b) => a.avg_demand - b.avg_demand,
      //   sortDirections: ['descend', 'ascend'],
      // },
      // {
      //   title: 'Score (%)',
      //   dataIndex: 'score',
      //   key: 'score',
      //   ...this.getColumnSearchProps('score'),
      //   sorter: (a, b) => a.score - b.score,
      //   sortDirections: ['descend', 'ascend'],
      // },
      {
        title: 'Utility (kW)',
        dataIndex: 'utility',
        key: 'utility',
        ...this.getColumnSearchProps('utility'),
        // sorter: (a, b) => a.max_demand - b.max_demand,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Diesel (kW)',
        dataIndex: 'diesel',
        key: 'diesel',
        ...this.getColumnSearchProps('dieseldiesel'),
        // sorter: (a, b) => a.max_demand - b.max_demand,
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
            // onClick={() => console.log(record)}
            onClick={() => window.location.href = `/view-branches?client_id=${record.client_id}`}
          >
            View
          </button>
        ),
      },
      {
        title: 'Update Clients',
        key: 'key',
        dataIndex: 'key',
        render: (_, record) => (
          <button
            type='button'
            className='table-row-button branch-users-view-button'
            // onClick={() => window.location.href = `/view-branches?client_id=${record.client_id}`}
            onClick={() => {
              setvisibleClient(true)
              setClientData(record)
            }}
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
          size='large'
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={true}
          footer={() => ``}
        />
      </>
    );
  }
}

export default AdminOverviewTable;
