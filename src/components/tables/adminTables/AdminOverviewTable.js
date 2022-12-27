import React, { useState } from 'react';
import { Table, Input, Button, Space, Dropdown, Menu } from 'antd';
import Highlighter from 'react-highlight-words';

import {
  SearchOutlined, InfoCircleOutlined,
  EditOutlined, DownOutlined
} from '@ant-design/icons';

export const aElemStyle = { color: 'rgba(0, 0, 0, 0.65)' };


const AdminOverviewTable = (props) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const setvisibleClient = props.setvisibleClient
  const setClientData = props.setClientData

  const getColumnSearchProps = (dataIndex) => ({
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
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
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
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const itemData = (record) => {
    return [
      {
        key: '1',
        label: (<>
          <InfoCircleOutlined /> <a rel="noopener noreferrer" 
          href={`/view-branches?client_id=${record.client_id}`} >
            View Client
          </a>
        </>

        ),
      },
      {
        key: '2',
        label: (
          <>
            <EditOutlined />
            <a target="_blank" onClick={(e) => {
              e.preventDefault();
                setvisibleClient(true)
                setClientData(record)
              // setVisibleBranch(true);
              // setBranchData(record);
            }} rel="noopener noreferrer">
              Edit Client
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
          // placement="topLeft"
          menu={{
            items
          }}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            More
            {' '}
            <DownOutlined />
          </a>
          {/* <Button>topRight</Button> */}
        </Dropdown>
      )

    }


  });


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('')
  };

  const data = props.overviewListData;
  const loading = props.loading;

  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Total Energy (kWh)',
      dataIndex: 'total_energy',
      key: 'total_energy',
      ...getColumnSearchProps('total_energy'),
      sorter: (a, b) => a.total_energy - b.total_energy,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Utility (kW)',
      dataIndex: 'utility',
      key: 'utility',
      ...getColumnSearchProps('utility'),
      // sorter: (a, b) => a.max_demand - b.max_demand,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Diesel (kW)',
      dataIndex: 'diesel',
      key: 'diesel',
      ...getColumnSearchProps('dieseldiesel'),
      // sorter: (a, b) => a.max_demand - b.max_demand,
      sortDirections: ['descend', 'ascend'],
    },
    optionsColumn()
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

export default AdminOverviewTable;
