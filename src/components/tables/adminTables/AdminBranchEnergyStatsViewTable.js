import { Table } from 'antd';

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
            title: 'Total (KWH)',
            dataIndex: 'total_kwh',
            key: 'total_kwh',
            sorter: (a, b) => a.total_kwh.localeCompare(b.total_kwh),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Blended Cost',
            dataIndex: 'blended_cost',
            key: 'blended_cost',
            sorter: (a, b) => a.blended_cost.localeCompare(b.blended_cost),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Min Energy (KVA)',
            dataIndex: 'min_kva',
            key: 'min_kva',
            sorter: (a, b) => a.min_kva - b.min_kva,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Max Energy (KVA)',
            dataIndex: 'max_kva',
            key: 'max_kva',
            sorter: (a, b) => a.max_kva - b.max_kva,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Avg Energy (KVA)',
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
