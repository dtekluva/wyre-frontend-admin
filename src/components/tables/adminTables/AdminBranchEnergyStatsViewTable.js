import { Table, Dropdown } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';

const AdminBranchEnergyStatsViewTable = (props) => {

    const data = props.listOfBranchEnergyStatsViewData;
    const loading = props.loading;

    const columns = [
        {
            title: 'Device Name',
            dataIndex: 'device_name',
            key: 'device_name',
            sorter: (a, b) => a.device_name.localeCompare(b.device_name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Total (kWh)',
            dataIndex: 'total_kwh',
            key: 'total_kwh',
            sorter: (a, b) => a.total_kwh.localeCompare(b.total_kwh),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Min Energy (kVA)',
            dataIndex: 'min_kva',
            key: 'min_kva',
            sorter: (a, b) => a.min_kva - b.min_kva,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Max Energy (kVA)',
            dataIndex: 'max_kva',
            key: 'max_kva',
            sorter: (a, b) => a.max_kva - b.max_kva,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Avg Energy (kVA)',
            dataIndex: 'avg_kva',
            key: 'avg_kva',
            sorter: (a, b) => a.avg_kva - b.avg_kva,
            sortDirections: ['descend', 'ascend'],
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

export default AdminBranchEnergyStatsViewTable;
