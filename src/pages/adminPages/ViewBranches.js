import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addABranch, getBranches, getBranchesTop } from '../../redux/actions/branches/branches.action';
import moment from 'moment';


import BreadCrumb from '../../components/BreadCrumb';
import AdminBranchesTable from '../../components/tables/adminTables/AdminBranchesTable';


import ExcelIcon from '../../components/icons/ExcelIcon';
import { useSearchParams } from 'react-router-dom';
import { Spin } from 'antd';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Manage', id: 2 },
  { url: '#', name: 'View Branches', id: 3 },
];

function ViewBranches(props) {
  const [adminBranchesData, setAdminBranchesData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const topLoading = props.branches?.fetchViewBranchesTopLoading
  // const approximate = setNum(Number(newValue.toFixed(2)))
  
  console.log('THIS IS THE BRANCHES-DETAIL HERE========>>>>>>', props.branches);

  // const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const query = new URLSearchParams(window.location.search);
  //   const from = query.get('client_id') || props.auth.userData.client_id;
  //   props.getBranches(from)
  // }, [])

  useEffect(() => {
    const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
    const endDate = moment().format('DD-MM-YYYY HH:MM');
    // const endDate = [moment().startOf('month').startOf('day'), moment()]
    // const query = new URLSearchParams(window.location.search);
    // const from = query.get('cadmin/branches/01-08-2022%2000:00/01-08-2022%2000:00') || props.auth.userData.client_id;
    // console.log(query);
    
    const client_id =searchParams.get("client_id") || props.auth.userData.client_id;
    console.log('This is client-id value', client_id);
    console.log(startDate, endDate)
    
    props.getBranches(client_id, startDate, endDate);
    props.getBranchesTop(client_id, startDate, endDate)
    console.log("this is the USERDATA values===>>>>>>>>>>",props.auth.userData);
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

          <h3 className='table-header__heading'>Branches</h3>

          <button
            type='button'
            className='table-header__right-button h-hidden-medium-down'
          >
            <ExcelIcon />
            <span>Download in Excel</span>
          </button>
        </div>
        <Spin spinning={props.branches?.fetchViewBranchesTopLoading} >
        <div className='branches-total_costs'>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>Total KWh</p>
            <p className='branches-total_costs-text'>{props.branches?.fetchedViewBranchesTop.total_kwh?.toFixed(2)
}</p>
          </div>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>Total Cost</p>
            <p className='branches-total_costs-text'>{props.branches?.fetchedViewBranchesTop.total_cost?.toFixed(2)
}</p>
          </div>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>Baseline Average</p>
            <p className='branches-total_costs-text'>{props.branches?.fetchedViewBranchesTop.baseline_avg?.toFixed(2)
}</p>
          </div>
          <div className='branches-total_costs-card'>
            <p className='branches-total_costs-title'>CO2</p>
            <p className='branches-total_costs-text'>{props.branches?.fetchedViewBranchesTop.co2_total?.toFixed(2)}</p>
          </div>
        </div>
        </Spin>

        {/* <div className='h-overflow-auto'>
          <AdminBranchesTable listOfBranchesData={adminBranchesData} />
        </div> */}
        <div className='h-overflow-auto'>
          <AdminBranchesTable loading={props.branches.fetchViewBranchesLoading} 
          listOfBranchesData={props.branches?.fetchedViewBranches} />
        </div>
      </article>
    </>
  );
}

// const mapStateToProps = {
//   ViewBranches: state.ViewBranches
// }
const mapDispatchToProps = {
  getBranches,
  getBranchesTop
}

const mapStateToProps = (state) => ({
  branches: state.branches,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranches);
