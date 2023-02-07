import React, { useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const AdminDevicesTable = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('')
  };

  const data = props.listOfDevicesData;

  const columns = [
    {
      title: 'Devices Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      ...getColumnSearchProps('branch'),
      sorter: (a, b) => a.branch.localeCompare(b.branch),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      ...getColumnSearchProps('code'),
      sorter: (a, b) => a.code.localeCompare(b.code),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Added',
      dataIndex: 'added',
      key: 'added',
      ...getColumnSearchProps('added'),
      sorter: (a, b) => a.added.localeCompare(b.added),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Consumption',
      dataIndex: 'consumption',
      key: 'consumption',
      ...getColumnSearchProps('consumption'),
      sorter: (a, b) => a.consumption - b.consumption,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'key',
      dataIndex: 'key',
      render: (_, record) => (
        <button
          type='button'
          className='table-row-button'
          onClick={() => console.log(record)}
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
        rowKey={(record) => record.id}
        pagination={false}
        footer={() => ``}
      />
    </>
  );
}

export default AdminDevicesTable;
