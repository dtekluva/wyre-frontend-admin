import { Table, Dropdown, Popconfirm, notification } from 'antd';
import { DownOutlined, EditOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { deleteTariff } from '../../../redux/actions/tariffs/tariffs.action';
import { connect } from 'react-redux';
import { getAResellerBranchEnergyStats } from '../../../redux/actions/branches/branches.action';
import { Icon } from '@iconify/react';
import { numberFormatter } from '../../../helpers/GeneralHelper';


const AdminBranchEnergyStatsViewTable = (props) => {

    const data = props.listOfResellerBranchEnergyStatsViewData;
    const loading = props.loading;
    const setTariffModal = props.setTariffModal
    const setEditTariffModal = props.setEditTariffModal
    const resellerData = props.resellerData
    const setResellerData = props.setResellerData

    const tariffId = resellerData.tariff_id

    const handleDelete = async (tariffId) => {
        const request = await props.deleteTariff(tariffId)

        if (request.fulfilled) {
            notification.info({
                message: 'Deleted',
                description: request.message,
            });
        }
    };

    const itemData = (record) => {
        return [
            {
                key: '1',
                label: (
                    <>
                        <AppstoreAddOutlined />,
                        <a target="_blank" onClick={(e) => {
                            e.preventDefault();
                            setTariffModal(true);
                            setResellerData(record);
                        }} rel="noopener noreferrer">
                            Add Tariff
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
                            setEditTariffModal(true);
                            setResellerData(record);
                        }} rel="noopener noreferrer">
                            Edit Tariff
                        </a>
                    </>

                ),
            },
            {
                key: '3',
                label: (<> {
                    <>
                        <Icon icon="ant-design:delete-outlined" />
                        <Popconfirm title="Sure to delete this tariff?" onConfirm={() => handleDelete(tariffId)}>
                            <a>Delete Tariff</a>
                        </Popconfirm>
                    </>
                }
                </>

                ),
            }
        ];
    }

    const optionsColumn = () => ({
        key: 'set_tariff',
        title: 'Set Tarrif',
        width: '10%',
        dataIndex: 'set_tariff',
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
            title: 'Tariff',
            dataIndex: 'tariff',
            key: 'tariff',
            sorter: (a, b) => a.tariff.localeCompare(b.tariff),
            sortDirections: ['descend', 'ascend'],
            render: (tariff, record) => {
                return numberFormatter(tariff)
            }
        },
        {
            title: 'Total (kWh)',
            dataIndex: 'total_kwh',
            key: 'total_kwh',
            sorter: (a, b) => a.total_kwh.localeCompare(b.total_kwh),
            sortDirections: ['descend', 'ascend'],
            render: (total_kwh, record) => {
                return numberFormatter(total_kwh)
            }
        },
        {
            title: 'Min Energy (kVA)',
            dataIndex: 'min_kva',
            key: 'min_kva',
            sorter: (a, b) => a.min_kva - b.min_kva,
            sortDirections: ['descend', 'ascend'],
            render: (min_kva, record) => {
                return numberFormatter(min_kva)
            }
        },
        {
            title: 'Max Energy (kVA)',
            dataIndex: 'max_kva',
            key: 'max_kva',
            sorter: (a, b) => a.max_kva - b.max_kva,
            sortDirections: ['descend', 'ascend'],
            render: (max_kva, record) => {
                return numberFormatter(max_kva)
            }
        },
        {
            title: 'Avg Energy (kVA)',
            dataIndex: 'avg_kva',
            key: 'avg_kva',
            sorter: (a, b) => a.avg_kva - b.avg_kva,
            sortDirections: ['descend', 'ascend'],
            render: (avg_kva, record) => {
                return numberFormatter(avg_kva)
            }
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

const mapDispatchToProps = {
    deleteTariff,
    getAResellerBranchEnergyStats
}

export default connect(null, mapDispatchToProps)(AdminBranchEnergyStatsViewTable);
