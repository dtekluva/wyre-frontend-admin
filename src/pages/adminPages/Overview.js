import React, { useEffect, useState } from 'react';
import moment from 'moment';


import AdminOverviewTable from '../../components/tables/adminTables/AdminOverviewTable';
import UpdateClientForm from './UpdateClientForm';


import BreadCrumb from '../../components/BreadCrumb';
import { connect, useSelector } from 'react-redux';
import { getClientsOverview } from '../../redux/actions/clients/client.action';
import { Modal } from 'antd';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Admin Overview', id: 2 },
];



function Overview(props) {
  
  const [visibleClient, setvisibleClient] = useState(false)
  const [switchClient, setSwitchClient] = useState(false)
  const [dateChange, setDateChange] = useState(false);
  const [clientData, setClientData] = useState({})

  const headers = useSelector((state) => state.headers);


  useEffect(() => {
    
    const defaultDataValue =  moment(headers.selectedDate, 'DD-MM-YYYY');
    const startDate = defaultDataValue.startOf('month').format('DD-MM-YYYY HH:MM');
    const endDate = defaultDataValue.endOf('month').format('DD-MM-YYYY HH:MM');

    // const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
    // const endDate = moment().format('DD-MM-YYYY HH:MM');

    // if(!props.client?.fetchedClientOverview){
    //   props.getClientsOverview(startDate, endDate);
    // }
    if(dateChange !== headers.selectedDate){
      setDateChange(headers.selectedDate);
      props.getClientsOverview(startDate, endDate);
    }
    
  }, [headers.selectedDate]);

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <article className='table-with-header-container h-no-mt'>
        <div className='table-header h-border-bottom'>
          <div className='h-hidden-medium-down'>
            {/* <button type='button' className='table-header__left-button'>
              PDF
            </button> */}
            {/* <button type='button' className='table-header__left-button'>
              CSV
            </button> */}
          </div>

          <h3 className='table-header__heading'>Admin Overview</h3>

          {/* <button
            type='button'
            className='table-header__right-button h-hidden-medium-down'
          >
            <ExcelIcon />
            <span>Download in Excel</span>
          </button> */}
        </div>

        <div className='h-overflow-auto'>
          <AdminOverviewTable 
            loading={props.client.fetchClientOverviewLoading} 
            overviewListData={props.client?.fetchedClientOverview}
            setvisibleClient={setvisibleClient}
            setClientData={setClientData}
            setSwitchClient={setSwitchClient}
          />
          <Modal
            open={visibleClient}
            onOk={() => setvisibleClient(false)}
            onCancel={() => setvisibleClient(false)} 
            width={1000}
            footer={null}
          >
            <UpdateClientForm  
               setModal={setvisibleClient}
               clientData={clientData}
            />
          </Modal>
          <Modal
            open={switchClient}
            onOk={''}
            onCancel={() => setSwitchClient(false)}
          >
            <h1>Are You Sure You Want to Disable This Client</h1>
            {switchClient}
          </Modal>
        </div>
      </article>
    </>
  );
}

const mapDispatchToProps = {
  getClientsOverview
};

const mapStateToProps = (state) => ({
  client: state.client,
});


export default connect(mapStateToProps, mapDispatchToProps)(Overview);