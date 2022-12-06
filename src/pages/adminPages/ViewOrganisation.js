import React, { useEffect } from 'react';


import BreadCrumb from '../../components/BreadCrumb';
import AdminClientsTable from '../../components/tables/adminTables/AdminClientsTable';


import ExcelIcon from '../../components/icons/ExcelIcon';
import { getClients } from '../../redux/actions/clients/client.action';
import { connect } from 'react-redux';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Manage', id: 2 },
  { url: '#', name: 'View Organisation', id: 3 },
];

function ViewOrganisation(props) {

  useEffect(() => {
    if(!props.client?.fetchedClient){
      props.getClients();
    }

  }, []);

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
            <button type='button' className='table-header__left-button'>
              CSV
            </button>
          </div>

          <h3 className='table-header__heading'>Clients</h3>

          <button
            type='button'
            className='table-header__right-button h-hidden-medium-down'
          >
            <ExcelIcon />
            <span>Download in Excel</span>
          </button>
        </div>

        <div className='h-overflow-auto'>
          <AdminClientsTable listOfClientsData={props.client?.fetchedClient} />
        </div>
      </article>
    </>
  );
}

const mapDispatchToProps = {
  getClients
};

const mapStateToProps = (state) => ({
  client: state.client,
});


export default connect(mapStateToProps, mapDispatchToProps)(ViewOrganisation);





// end of script