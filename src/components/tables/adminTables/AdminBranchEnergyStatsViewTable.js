import { Table, Dropdown } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';

const AdminBranchEnergyStatsViewTable = (props) => {

    const data = props.listOfBranchEnergyStatsViewData;
    const loading = props.loading;
    const setTariffModal = props.setTariffModal
    const deviceType = props.deviceType
    const setDeviceData = props.setDeviceData
    const userRoletextData = props.userRoletextData

    const itemData = (record) => {
        return [
            {
                key: '1',
                label: (
                    <>
                        [
                                <EditOutlined />,
                            <a target="_blank" onClick={(e) => {
                                e.preventDefault();
                                setTariffModal(true);
                                // setUserData(record);
                                console.log("Energy-Stats record>>>>>", record);
                            }} rel="noopener noreferrer">
                                Add Tariff
                            </a> 
                            ]
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
        // {
        //     title: 'Blended Cost',
        //     dataIndex: 'blended_cost',
        //     key: 'blended_cost',
        //     sorter: (a, b) => a.blended_cost.localeCompare(b.blended_cost),
        //     sortDirections: ['descend', 'ascend'],
        // },
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

export default AdminBranchEnergyStatsViewTable;
