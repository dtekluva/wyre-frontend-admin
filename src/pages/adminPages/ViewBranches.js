
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getBranches, getBranchesTop } from '../../redux/actions/branches/branches.action';
import moment from 'moment';


import BreadCrumb from '../../components/BreadCrumb';
import AdminBranchesTable from '../../components/tables/adminTables/AdminBranchesTable';


import ExcelIcon from '../../components/icons/ExcelIcon';
import { useSearchParams } from 'react-router-dom';
import { Modal, Spin } from 'antd';
import UpdateBranchForm from './modal/UpdateBranchForm';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Manage', id: 2 },
  { url: '#', name: 'View Branches', id: 3 },
];

function ViewBranches(props) {
  const [clientId, setClientId] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleBranch, setVisibleBranch] = useState(false)
  const [branchData, setBranchData] = useState({})
  const [dateChange, setDateChange] = useState(false);

  const headers = useSelector((state) => state.headers);
  

  useEffect(() => {
    // const startDate = moment().startOf('month').startOf('day').format('DD-MM-YYYY HH:MM');
    // const endDate = moment().format('DD-MM-YYYY HH:MM');

    const defaultDataValue =  moment(headers.selectedDate, 'DD-MM-YYYY');
    const startDate = defaultDataValue.startOf('month').format('DD-MM-YYYY HH:MM');
    const endDate = defaultDataValue.endOf('month').format('DD-MM-YYYY HH:MM');

    const client_id = searchParams.get("client_id") || props.auth.userData.client_id;
    setClientId(client_id);

    if(dateChange !== headers.selectedDate){
      setDateChange(headers.selectedDate);
      props.getBranches(client_id, startDate, endDate);
      props.getBranchesTop(client_id, startDate, endDate)
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

          <h3 className='table-header__heading'>Branches</h3>

          {/* <button
            type='button'
            className='table-header__right-button h-hidden-medium-down'
          >
            <ExcelIcon />
            <span>Download in Excel</span>
          </button> */}
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
 
        <div className='h-overflow-auto'>
          <AdminBranchesTable loading={props.branches.fetchViewBranchesLoading}
             clientId={clientId}
             listOfBranchesData={props.branches?.fetchedViewBranches}
             setVisibleBranch={setVisibleBranch}
             setBranchData= {setBranchData}
          />
          <Modal
            open={visibleBranch}
            onOk={() => setVisibleBranch(false)}
            onCancel={() => setVisibleBranch(false)} 
            width={1000}
            footer={null}
          >
            <UpdateBranchForm  
               setModal={setVisibleBranch}
               branchData= {branchData}
            />
          </Modal>
        </div>
      </article>
    </>
  );
}

const mapDispatchToProps = {
  getBranches,
  getBranchesTop
}

const mapStateToProps = (state) => ({
  branches: state.branches,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewBranches);
