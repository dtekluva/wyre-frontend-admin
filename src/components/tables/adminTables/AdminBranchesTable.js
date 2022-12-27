import React, { useState } from 'react';
import { Table, Input, Button, Space, Dropdown } from 'antd';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined, InfoCircleOutlined,
  EditOutlined, DownOutlined
} from '@ant-design/icons';


export const aElemStyle = { color: 'rgba(0, 0, 0, 0.65)' };


const AdminBranchesTable = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const data = props.listOfBranchesData;
  const loading = props.loading;
  const setVisibleBranch = props.setVisibleBranch
  const setBranchData = props.setBranchData

  const itemData = (record) => {
    return [
      {
        key: '1',
        label: (<>
          <InfoCircleOutlined /> <a rel="noopener noreferrer" 
          href={`/view-branch?branch_id=${record.branch_id}&client_id=${props.clientId}`} >
            View Branch
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
              setVisibleBranch(true);
              setBranchData(record);
            }} rel="noopener noreferrer">
              Edit Branch
            </a>
          </>

        ),
      },
    ];
  }

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


  const columns = [
    {
      title: 'Branch Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Organisation',
      dataIndex: 'organisation',
      key: 'organisation',
      ...getColumnSearchProps('organisation'),
      sorter: (a, b) => a.organisation.localeCompare(b.organisation),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Total Energy [kwh]',
      dataIndex: 'total_energy',
      key: 'total_energy',
      ...getColumnSearchProps('total_energy'),
      sorter: (a, b) => a.total_energy - b.total_energy,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Baseline Score',
      dataIndex: 'baseline',
      key: 'baseline',
      ...getColumnSearchProps('baseline'),
      sorter: (a, b) => a.baseline - b.baseline,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Cost Of Energy',
      dataIndex: 'energy_cost',
      key: 'energy_cost',
      ...getColumnSearchProps('energy_cost'),
      sorter: (a, b) => a.energy_cost - b.energy_cost,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'PAPR',
      dataIndex: 'papr',
      key: 'papr',
      ...getColumnSearchProps('papr'),
      sorter: (a, b) => a.papr - b.papr,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Generator Efficiency',
      dataIndex: 'generator_efficiency',
      key: 'generator_efficiency',
      ...getColumnSearchProps('generator_efficiency'),
      sorter: (a, b) => a.generator_efficiency - b.generator_efficiency,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Fuel Efficiency',
      dataIndex: 'fuel_efficiency',
      key: 'fuel_efficiency',
      ...getColumnSearchProps('fuel_efficiency'),
      sorter: (a, b) => a.fuel_efficiency - b.fuel_efficiency,
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
        pagination={false}
        footer={() => ``}
      />
    </>
  );
}

export default AdminBranchesTable;
