import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getViewBranches } from '../../redux/actions/viewBranches/viewBranches.action';


import BreadCrumb from '../../components/BreadCrumb';
import AdminBranchesTable from '../../components/tables/adminTables/AdminBranchesTable';


import ExcelIcon from '../../components/icons/ExcelIcon';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Manage', id: 2 },
  { url: '#', name: 'View Branches', id: 3 },
];

function ViewBranches(props) {
  const [adminBranchesData, setAdminBranchesData] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const from = query.get('client_id') || props.auth.userData.client_id;
  }, [])

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

          <h3 className='table-header__heading'>Branches</h3>

          <button
            type='button'
            className='table-header__right-button h-hidden-medium-down'
          >
            <ExcelIcon />
            <span>Download in Excel</span>
          </button>
        </div>
        <div className='branches-total_costs'>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>Total KWh</p>
            <p className='branches-total_costs-text'>122,000</p>
          </div>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>Total Cost</p>
            <p className='branches-total_costs-text'>122,000</p>
          </div>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>Baseline Average</p>
            <p className='branches-total_costs-text'>22,000KwH</p>
          </div>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>CO2</p>
            <p className='branches-total_costs-text'>22,000KwH</p>
          </div>
        </div>

        <div className='h-overflow-auto'>
          <AdminBranchesTable listOfBranchesData={adminBranchesData} />
        </div>
      </article>
    </>
  );
}

// const mapStateToProps = {
//   ViewBranches: state.ViewBranches
// }
const mapDispatchToProps = {
  getViewBranches
}

const mapStateToProps = (state) => ({
  branches: state.branches,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranches);
